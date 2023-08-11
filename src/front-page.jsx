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


      const headTurnHop_dur = 1;
      const rightLegWalk = gsap.timeline()
      rightLegWalk
        .to("#r_leg", {duration:headTurnHop_dur, transformOrigin:"50% 10%", x:"+=7", rotate:-10},0)//, delay:.7},.4)
        .to("#r_wing", {duration:headTurnHop_dur, scale:.95},0)
        .to("#l_wing", {duration:headTurnHop_dur, scale:1.05},0)
        .to("#face", {duration:headTurnHop_dur, x:"+=7"},0)
        .to("#r_flipper", {duration:headTurnHop_dur, y:"-=9"},0)
        .to("#r_flipper", {duration:headTurnHop_dur, y:"+=9"})

      headTurnHop_tl.current = gsap.timeline({paused: true});
      headTurnHop_tl.current
        .to("#head", {duration:headTurnHop_dur, rotate:13, transformOrigin: "50% 50%"},"<")
        //.to("#body, #head", {duration:headTurnHop_dur, yoyo:true, repeat:1, y:"+=25px"},0)
        //.to("#l_knee, #r_knee", {duration:headTurnHop_dur, yoyo:true, repeat:1, y:"-=5px"},0) //poise for jump
        //.to("#duck-canvas", {duration:headTurnHop_dur, ease:"none", y:"-=40px", x:"-=20px"})
        //.to("#duck-canvas", {duration:headTurnHop_dur / 3, ease:"none", x:"-=10px"})
        //.to("#duck-canvas", {duration:headTurnHop_dur, ease:"none", y:"+=40px", x:"-=20px"}) //jumping
        .add(rightLegWalk)
        //.to("#l_leg", {duration:headTurnHop_dur, transformOrigin:"50% 10%", x:"-=7", rotate:10},headTurnHop_dur)//, delay: .7},.4)
        //.to("#r_wing", {duration:headTurnHop_dur, scale:1.05},headTurnHop_dur)
        //.to("#l_wing", {duration:headTurnHop_dur, scale:.95},headTurnHop_dur)
        //.to("#face", {duration:headTurnHop_dur, x:"-=14"},headTurnHop_dur)
        //.to("#r_leg", {duration:headTurnHop_dur, transformOrigin:"50% 10%", rotate:10})
        //.to("#l_leg", {duration:headTurnHop_dur, transformOrigin:"50% 10%", rotate:-10})
        //.to("#r_leg", {duration:headTurnHop_dur, transformOrigin:"50% 10%", rotate:0})
        //.to("#l_leg", {duration:headTurnHop_dur, transformOrigin:"50% 10%", rotate:0})
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


      const duckClickHandler = () => {
        headTurnHop_tl.current.play(0);
      }
      document.querySelector("#duck-svg").addEventListener("click", duckClickHandler);


    return () => {
      const duckCanv = document.querySelector("#duck-canvas");
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
