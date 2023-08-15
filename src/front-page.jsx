//DEV Libraries
import ReactDOM from 'react-dom/client';
import {useEffect, useRef} from 'react';
import gsap from "gsap";

//CSS
import './css/front-page.scss';

//COMPONENTS
import Nav from "./utils/nav.jsx";
import Credit from "./utils/credit.jsx";
import SvgDuck from "./front-page/duck.jsx";
import StoryPage from './front-page/storyPage.jsx';


const FrontPage = () => {

  //REFS
  const duckRef = useRef();
  const blink_tl = useRef(); 
  const headTurnWingfFlap_tl = useRef();
  const headTurnHop_tl = useRef();
  const preWalk = useRef()
  const walking = useRef();
  const walked = useRef();
  const moveBack = useRef();


  // ANIMATIONS 
  useEffect(() =>{ // fires on every render. (No dependencies).
    const ctx = gsap.context(() => { // allows scoping selectors and animation cleanup. best practice.


      //Blink Animation
      blink_tl.current = gsap.timeline({paused: true});
      blink_tl.current
        .to("#lt_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"+=30", x:"+=8.5"},.5)
        .to("#rt_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"+=30", x:"+=12.7"},.5)
        .to("#lb_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"-=22", x:"-=10"},.5)
        .to("#rb_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"-=22", x:"-=12"},.5)

      headTurnWingfFlap_tl.current = gsap.timeline({paused:true});
      headTurnWingfFlap_tl.current
        .to("#head", {duration:.4, ease:"back", rotate:13, transformOrigin: "50% 50%"})
        .add(() => {!(blink_tl.current.isActive()) && blink_tl.current.play(0)}) // && Evaluates whatever returns false.
        .to("#r_wing", {duration:.05, yoyo:true, repeat:31, rotate:-50, transformOrigin:"50% 15%"},1.5)
        .to("#l_wing", {duration:.05, yoyo:true, repeat:31, rotate:50, transformOrigin:"50% 15%"},1.5)
        .to("#head", {duration:.4, ease:"ease", rotate:-3, transformOrigin:"50% 50%", delay:1.3})
        .to("#storyPage", {delay:1});



      const Dur = .1;

      preWalk.current = gsap.timeline({paused: true});
      preWalk.current
        .to("#r_leg", {duration:Dur, transformOrigin:"50% 10%", x:"+=24", rotate:-10},0)
        .to("#r_wing", {duration:Dur, scale:.95},0)
        .to("#l_wing", {duration:Dur, scale:1.05},0)
        .to("#face", {duration:Dur, x:"+=7"},0)
        .to("#r_flipper", {duration:Dur, y:"-=30"},0)
        .to("#r_flipper", {duration:Dur, y:"+=30"})
        .to("#duck-canvas", {x:"0px", duration:Dur*2},Dur*2)
        .to("#r_leg", {duration:Dur *2, transformOrigin:"50% 10%", x:"-=24", rotate:0},Dur*2)

      walking.current = gsap.timeline({paused: true});
      walking.current
        .to("#l_leg", {duration:Dur, transformOrigin:"50% 10%", x:"+=7", rotate:10},0)
        .to("#l_wing", {duration:Dur, scale:.95},0)
        .to("#r_wing", {duration:Dur, scale:1.05},0)
        .to("#face", {duration:Dur, x:"-=14"},0)
        .to("#l_flipper", {duration:Dur, y:"-=30"},0)
        .to("#l_flipper", {duration:Dur, y:"+=30"})
        .to("#l_leg", {duration:Dur, transformOrigin:"50% 10%", x:"-=7", rotate:0})

        .to("#r_leg", {duration:Dur, transformOrigin:"50% 10%", x:"-=7", rotate:-10},Dur * 3)
        .to("#r_wing", {duration:Dur, scale:.95},Dur * 3)
        .to("#l_wing", {duration:Dur, scale:1.05},Dur * 3)
        .to("#face", {duration:Dur, x:"+=14"},Dur * 3)
        .to("#r_flipper", {duration:Dur, y:"-=30"},Dur * 3)
        .to("#r_flipper", {duration:Dur, y:"+=30"})
        .to("#r_leg", {duration:Dur, transformOrigin:"50% 10%", x:"+=7", rotate:0})

      walked.current = gsap.timeline({paused:true});
      walked.current
        .to("#face", {duration:Dur, x:"-=7"},0)
        .to("#r_wing", {duration:Dur, scale:1},0)
        .to("#l_wing", {duration:Dur, scale:1},0)

      headTurnHop_tl.current = gsap.timeline({paused: true});
      headTurnHop_tl.current
        .to("#head", {duration:Dur, rotate:13, transformOrigin: "50% 50%"},0)
        .to("#body, #head", {duration:Dur, yoyo:true, repeat:1, y:"+=25px"},0)
        .to("#l_knee, #r_knee", {duration:Dur, yoyo:true, repeat:1, y:"-=5px"},0) //poise for jump
        .to("#duck-canvas", {duration:Dur, ease:"none", y:"-=40px", x:"-=20px"})
        .to("#duck-canvas", {duration:Dur / 3, ease:"none", x:"-=10px"})
        .to("#duck-canvas", {duration:Dur, ease:"none", y:"+=40px", x:"-=20px"}) //jumping

      moveBack.current = gsap.timeline({paused:true});
      moveBack.current 
        .to("#duck-canvas", {x:"0px"})

    }, duckRef);


      // DUCK PERPETUALLY BLINKS
      (function blinkIntrvl() {            //max     min     min
        let waitInterval = Math.random() * (15000 - 5000) + 5000;
      new Promise((r) => 
        setTimeout(()=>{ 
          blink_tl.current.play(0);
          r();
        }, waitInterval))
          .then(() => blinkIntrvl())
      })();


      const duckClickHandler = async () => {
        await headTurnHop_tl.current.restart(0);
        await preWalk.current.restart(0);
        await walked.current.restart(0);
      }
      document.querySelector("#duck-svg").addEventListener("click", duckClickHandler);


    return () => {
      const duckCanv = document.querySelector("#duck-svg");
      ctx.revert();
      duckCanv.removeEventListener("click", duckClickHandler)
      duckCanv.setAttribute("height", "610")
    }
  }, [])


  //START BUTTON HANDLER
  const renderStoryPage = () => {
    document.querySelector("#start-button").disabled = true; // keep double-clickers safe.

    headTurnWingfFlap_tl.current.play(0);
    const storyPage = ReactDOM.createRoot(document.querySelector("#storyPage")); //Should only be called once.
    storyPage.render(<StoryPage />);

    setTimeout(() => {
      //window.open("/page1.html", "_self");
      console.log("window Opens now.");
    }, 3000);

    //TODO: remove this.
    document.querySelector("#start-button").disabled = false;
  }


  return(
    <>
		<div id="storyPageFlex">
			<div id="flexCenter"></div>
			<div id="content">
				<header>
          <Nav />
				</header>
				<main>
					<article>
            <div className="text">
              <h1>An Interactive Computer Story for Children</h1>
              <p>
                The duck story is a fun interactive story meant to help young 
                children learn how to operate a mouse and keyboard.
              </p>
              <p>
              Many of todays kids grow up being proficient with mobile devices,
              but might feel a bit lost on a desktop computer. This fun, short,
              interactive story allows your child to take their first steps in 
              learning how to use a desktop computer.
              </p>
              <p>
              A skill that will build a foundation for the rest of their life.
              </p>
            </div>
              <button id="start-button" onClick={ renderStoryPage }>
                Start the Story!
              </button>
            <div ref={duckRef} id="duck-container">
              <SvgDuck />
            </div>
					</article>
				</main>
				<footer>
          <Credit />
				</footer>
			</div>
			<div id="storyPage"></div>
		</div>
    </>
  )
}

// RENDERS
const frontPage = ReactDOM.createRoot(document.getElementById("front-page"));
frontPage.render(<FrontPage />)
