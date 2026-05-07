'use client'

// Jeopardy game body — loaded via next/dynamic({ssr:false}) so that this
// module (and its jQuery import graph) is excluded from the Cloudflare Worker
// edge bundle. See test_jquery_never_loaded_in_edge_runtime.

import React, { useEffect } from 'react'

export default function JeopardyGame() {
  useEffect(() => {
    document.title = 'Jeopardy!'
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/my-work/jeopardy/jeopardy.css'
    document.head.appendChild(link)

    let cancelled = false
    ;(async () => {
      const [{ default: $ }, axios] = await Promise.all([
        import('jquery'),
        import('axios'),
      ])
      if (cancelled) return
      const ax: any = (axios as any).default ?? axios

      const calcViewportWidth = Math.floor((window.innerWidth + 20) / 100)
      const viewportWidth = calcViewportWidth > 6 ? 6 : calcViewportWidth

      const shuffle = <T,>(arr: T[]): T[] => {
        const a = arr.slice()
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[a[i], a[j]] = [a[j], a[i]]
        }
        return a
      }

      class JeopardyAPI {
        root: string
        query: string
        destructure: (data: any) => { title: string; clues: [string, string][] }
        categoryIds: number[]
        board?: Record<string, [string, string][]>
        categories?: string[]
        constructor(
          root: string,
          query: string,
          destructure: (data: any) => { title: string; clues: [string, string][] },
        ) {
          this.root = root
          this.query = query
          this.destructure = destructure
          this.categoryIds = shuffle([2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]).slice(
            0,
            viewportWidth,
          )
        }
        static async findFastestAPI(arr: JeopardyAPI[]) {
          const winner: any = await Promise.any(
            arr.map((api) => ax.get(api.root + api.query + '2')),
          )
          return arr.filter((api) => api.root + api.query + '2' === winner.config.url)[0]
        }
        async getCategory(id: number) {
          return await ax(this.root + this.query + id)
        }
        async getGameData() {
          const board: Record<string, [string, string][]> = {}
          const categories: string[] = []
          for (const id of this.categoryIds) {
            const data: any = await this.getCategory(id)
            const category = this.destructure(data.data)
            board[category.title] = category.clues
            categories.push(category.title)
          }
          this.board = board
          this.categories = categories
        }
      }

      const apis = [
        new JeopardyAPI('https://rithm-jeopardy.herokuapp.com', '/api/category?id=', (data) => ({
          title: data.title,
          clues: data.clues.map((c: any) => [c.question, c.answer] as [string, string]),
        })),
        new JeopardyAPI(
          'https://jeopardy-api-08c22fd2e683.herokuapp.com',
          '/api/details/',
          (data) => {
            const category = data.details[Object.keys(data.details)[0]]
            return {
              title: category.title,
              clues: category.clues.map((c: any) => [c.question, c.answer] as [string, string]),
            }
          },
        ),
        new JeopardyAPI('https://jservice.io', '/api/category?id=', (data) => ({
          title: data.category.title,
          clues: data.category.clues.map((c: any) => [c.question, c.answer] as [string, string]),
        })),
      ]

      const newGame = () => {
        window.location.reload()
      }

      $('div.buttons').css('display', 'none')
      const $loadingMsg = $('<p>Building the game, please wait...</p>').css('text-align', 'center')
      $('div.buttons').before($loadingMsg)
      $('img.loading').css('display', 'block')

      try {
        const api = await JeopardyAPI.findFastestAPI(apis)
        await api.getGameData()
        if (cancelled) return
        $loadingMsg.detach()
        $('div.buttons').css('display', 'flex')
        $('img.loading').css('display', 'none')

        const loadGame = () => {
          $('table').off()
          $('table').css('display', 'block')
          $('th').html('')
          $('td').off()
          $('td').css('background', 'var(--dark-blue)')
          $('td').html('<strong>?</strong>')
          $('strong').css('display', 'block')
          $('button#start-button').replaceWith(
            "<button id='start-button'>Restart Game</button>",
          )
          for (let i = 0; i < viewportWidth; i++) {
            $(`th.j-category${i}`).append(api.categories![i])
            for (let ii = 0; ii < 5; ii++) {
              $(`td#j-${i}-${ii + 1}00`).append(
                `<div class="question">${api.board![api.categories![i]][ii][0]}</div>`,
              )
              $(`td#j-${i}-${ii + 1}00`).append(
                `<div class="answer"><i>${api.board![api.categories![i]][ii][1]}</i></div>`,
              )
            }
          }
          for (let i = viewportWidth; i >= viewportWidth && i < 6; i++) {
            $(`td[id^='j-${i}']`).remove()
            $(`th[class^='j-category${i}']`).remove()
          }

          const gameClickHandler = function (this: any, event: any) {
            function showAnswer(event: any) {
              if (event.target.className === 'question' && event.target.style.display === 'block') {
                event.target.style.display = 'none'
                event.target.nextSibling.style.display = 'block'
                event.target.parentElement.style.background = 'var(--green)'
              } else if (
                event.target.tagName === 'TD' &&
                event.target.children[0].style.display === 'block'
              ) {
                event.target.children[0].style.display = 'none'
                event.target.children[0].nextSibling.style.display = 'block'
                event.target.children[0].parentElement.style.background = 'var(--green)'
              }
              $('td').off()
              $('table').off().on('click', gameClickHandler)
            }
            if (event.target.tagName === 'STRONG') {
              event.target.style.display = 'none'
              event.target.nextSibling.style.display = 'block'
              event.target.parentElement.style.background = 'var(--light-blue)'
              $('table').off()
              $(event.target).parent().on('click', showAnswer)
            } else if (
              event.target.tagName === 'TD' &&
              event.target.children[0].style.display === 'block' &&
              event.target.innerText === '?'
            ) {
              event.target.children[1].style.display = 'block'
              event.target.children[0].remove()
              event.target.style.background = 'var(--light-blue)'
              $('table').off()
              $(event.target).on('click', showAnswer)
            }
          }
          $('table').on('click', gameClickHandler)
        }

        $('div.game').on('click', '#start-button', loadGame)
        $('div.game').on('click', '#newGame-button', newGame)
      } catch (err) {
        console.error('Jeopardy init failed', err)
      }
    })()

    return () => {
      cancelled = true
      try {
        document.head.removeChild(link)
      } catch {}
    }
  }, [])

  const rows = [100, 200, 300, 400, 500]
  const cols = [0, 1, 2, 3, 4, 5]

  return (
    <div className="container">
      <div className="flex-items"></div>
      <div className="flex-items game">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Jeopardy_Germany_2016_logo.jpg"
          alt="Jeopardy! Logo Courtesy of Wikimedia Commons"
        />
        <div className="buttons">
          <button id="start-button">Start Game</button>
          <button id="newGame-button">New Game</button>
        </div>
        <img
          className="loading"
          src="/static/img/loading-circle.svg"
          alt="loading..."
        />
        <noscript>
          <p className="noscript">This page requires Javascript to work!</p>
        </noscript>
        <table className="board">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c} className={`j-category${c}`}></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r} className={`j-${r}`}>
                {cols.map((c) => (
                  <td key={c} id={`j-${c}-${r}`}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-items"></div>
    </div>
  )
}
