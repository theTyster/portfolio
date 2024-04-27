import {shuffle} from "../assets/utils/utils.js";
import $ from "jquery";
import axios from "axios";

const viewportWidth = Math.floor((window.innerWidth + 20)/100)

class JeopardyAPI {

	categoryIds = shuffle([2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]).splice(0, viewportWidth);

	constructor(root, query, destructure){
		this.root    = root;
		this.query   = query;
		this.destructure = destructure; // Function for destructuring data specific to the api.
	}


	static async findFastestAPI(arr) {
		const winner = await Promise.any(arr.map(api => axios.get(api.root + api.query + '2')));

		return arr.filter(api =>
			api.root + api.query + '2' === winner.config.url)[0];
	}


	async getCategory(id){
		return await axios(this.root + this.query + id)
	}


	async getGameData(){
		//The board Object is shaped like this:
		//board = {
		//	category: [[question, answer], ... *5],
		//  category: ... *6
		//}

		const board = {};
		const categories = [];
		for (let id of this.categoryIds){
			const data = await this.getCategory(id);
			const category = this.destructure(data.data);
			board[category.title] = category.clues;

			categories.push(category.title);
		}
		this.board = board;
		this.categories = categories;
	}
}

const apis = [
	new JeopardyAPI( "https://rithm-jeopardy.herokuapp.com", "/api/category?id=", data =>
		({
			title: data.title,
			clues: data.clues.map(clue => [clue.question, clue.answer])
		})),
	new JeopardyAPI( "https://jeopardy-api-08c22fd2e683.herokuapp.com", "/api/details/", data => {
		const category = data.details[[Object.keys(data.details)][0]]
		return {
			title: category.title,
			clues: category.clues.map(clue => [clue.question, clue.answer])
		}
	}),
	new JeopardyAPI( "https://jservice.io", "/api/category?id=", data =>
		({
			title: data.category.title,
			clues: data.category.clues.map(clue => [clue.question, clue.answer])
		}))
]


const newGame = () => { window.location.reload() }


// First Paint.
$("div.buttons").css("display", "none");
const $loadingMsg = $("<p>Building the game, please wait...</p>").css("text-align", "center");
$("div.buttons").before($loadingMsg);
$("img.loading").css("display", "block");

// Get a Working API and prime the game.
new Promise(res => res(JeopardyAPI.findFastestAPI(apis)))
	.then(api => {

		api.getGameData();

		$loadingMsg.detach();
		$("div.buttons").css("display", "flex");
		$("img.loading").css("display", "none");


	const loadGame = async () => {
		//RESET THE BOARD.
		$("table").off();
		$("table").css("display", "block")
		$("th").html("");
		$("td").off();
		$("td").css("background", "var(--dark-blue)");
		$("td").html("<strong>?</strong>");
		$("strong").css("display", "block");
		$("button#start-button").replaceWith("<button id='start-button'>Restart Game</button>");

		for (let i = 0; i < viewportWidth; i++) {
			$(`th.j-category${i}`).append(api.categories[i]);
			for (let ii = 0; ii < 5; ii++) {
				$(`td#j-${i}-${ii + 1}00`).append(
					`<div class="question">${api.board[api.categories[i]][ii][0]}</div>`,
				);
				$(`td#j-${i}-${ii + 1}00`).append(
					`<div class="answer"><i>${api.board[api.categories[i]][ii][1]}</i></div>`,
				);
			}
		}
		for (let i = viewportWidth; i >= viewportWidth && i < 6; i++){
			$(`td[id^='j-${i}']`).remove();
			$(`th[class^='j-category${i}']`).remove();
		}

		//HANDLERS FOR THE GAME
		//IF A BOX IS CLICKED ON, SHOW THE NEXT VALUE IN THE BOX AND CHANGE THE BACKGROUND.
		//IF A CLUE IS ON THE BOARD DON'T ALLOW OTHER BOXES TO BE CLICKED.
		const gameClickHandler = function (event) {
			function showAnswer(event) {
				if (
					event.target.className === "question" &&
					event.target.style.display === "block"
				) {
					event.target.style.display = "none";
					event.target.nextSibling.style.display = "block";
					event.target.parentElement.style.background = "var(--green)";
				} else if (
					event.target.tagName === "TD" &&
					event.target.children[0].style.display === "block"
				) {
					event.target.children[0].style.display = "none";
					event.target.children[0].nextSibling.style.display = "block";
					event.target.children[0].parentElement.style.background =
						"var(--green)";
				}

				$("td").off();
				$("table").off().on("click", gameClickHandler);
			}

			if (event.target.tagName === "STRONG") {
				event.target.style.display = "none";
				event.target.nextSibling.style.display = "block";
				event.target.parentElement.style.background = "var(--light-blue)";
				$("table").off();
				$(event.target).parent().on("click", showAnswer);
			} else if (
				event.target.tagName === "TD" &&
				event.target.children[0].style.display === "block" &&
				event.target.innerText === "?"
			) {
				event.target.children[1].style.display = "block";
				event.target.children[0].remove();
				event.target.style.background = "var(--light-blue)";
				$("table").off();
				$(event.target).on("click", showAnswer);
			}
		};

		$("table").on("click", gameClickHandler);
	};

	$("div.game").on("click", "#start-button", loadGame);
	$("div.game").on("click", "#newGame-button", newGame);
})
