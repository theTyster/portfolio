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


const FrontPage = () => {

  //REFS
  const blink_tl = useRef(); 
  const flyAway_tl = useRef();
  const hopNWalk_tl = useRef();


  // ANIMATIONS 
  useEffect(() =>{ // fires on every render. (No dependencies).
    const ctx = gsap.context(() => { // allows scoping selectors and animation cleanup. best practice.

      const Dur = .1;

      //Blink Animation
      blink_tl.current = gsap.timeline({paused: true});
      blink_tl.current
        .to("#lt_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"+=30", x:"+=8.5"},.5)
        .to("#rt_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"+=30", x:"+=12.7"},.5)
        .to("#lb_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"-=22", x:"-=10"},.5)
        .to("#rb_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"-=22", x:"-=12"},.5)

      flyAway_tl.current = gsap.timeline({paused:true});
      flyAway_tl.current
        .to("#head", {duration:.5, ease:"back", rotate:13, transformOrigin: "50% 50%"})
        .add(() => {!(blink_tl.current.isActive()) && blink_tl.current.play(0)}) // && Evaluates whatever returns false.
        .to("#body", {duration:Dur, yoyo:true, repeat:1, y:"+=35"},"<")
        .to("#head", {duration:Dur, yoyo:true, repeat:1, y:"+=90"},"<")
        .to("#l_knee, #r_knee", {duration:Dur, y:"-=10"},"<")
        .to("#l_leg, #r_leg", {duration:Dur, y:"-=30"},"<") //poise for jump
        .to("#r_wing", {duration:.05, yoyo:true, repeat:61, rotate:-50, transformOrigin:"50% 15%"},">") //flappy
        .to("#l_wing", {duration:.05, yoyo:true, repeat:61, rotate:50, transformOrigin:"50% 15%"},"<")
        .to("#storyPage", {duration:3, left:"0"},"<") // slide out
        .to("#duck-canvas", {duration:2, ease:"power4", top:"70px"},"<")
        .to("#duck-canvas", {duration:.5, ease:"linear", top:"100px"},"<2")
        .add(() => window.scrollTo({top:0, behavior:"smooth"}),"<")
        .to("#content", {duration:0, overflow:"hidden"},"<")
        .to("#l_knee, #r_knee", {duration:.5, y:"+=10"},"<")
        .to("#l_leg, #r_leg", {duration:.5, y:"+=30"},"<") //poise for jump

      hopNWalk_tl.current = gsap.timeline({paused: true});
      hopNWalk_tl.current
        .to("#head", {duration:Dur, rotate:13, transformOrigin: "50% 50%"},"<")
        .to("#body, #head", {duration:Dur, yoyo:true, repeat:1, y:"+=25"},"<")
        .to("#l_knee, #r_knee", {duration:Dur, yoyo:true, repeat:1, y:"-=5"},"<") //poise for jump
        .to("#r_wing", {duration:.05, yoyo:true, repeat:5, rotate:-50, transformOrigin:"50% 15%"},">") //wings flapping and jumping
        .to("#l_wing", {duration:.05, yoyo:true, repeat:5, rotate:50, transformOrigin:"50% 15%"},"<")  
        .to("#duck-canvas", {duration:Dur, ease:"none", y:"-=40", x:"-=20"},"<")
        .to("#duck-canvas", {duration:Dur/3, ease:"none", x:"-=10"},">")
        .to("#duck-canvas", {duration:Dur, ease:"none", y:"+=40", x:"-=20"},"<")
        .to("#r_leg", {duration:Dur, transformOrigin:"50% 10%", x:"+=24", rotate:-10, delay:1},">") // move back first step
        .to("#l_leg", {duration:Dur, transformOrigin:"50% 10%", x:"-=12", rotate:5},"<")
        .to("#duck-canvas", {duration:Dur, ease:"none", x:"+=20"},"<") 
        .to("#r_wing", {duration:Dur, scale:.95},"<")
        .to("#l_wing", {duration:Dur, scale:1.05},"<")
        .to("#face", {duration:Dur, x:"+=7"},"<")
        .to("#duck-canvas", {x:"0", duration:Dur},">") // move back second step
        .to("#r_leg", {duration:Dur, transformOrigin:"50% 10%", x:"-=24", rotate:0},"<")
        .to("#l_leg", {duration:Dur, transformOrigin:"50% 10%", x:"+=12", rotate:0},"<")
        .to("#face", {duration:Dur, x:"-=7"},">") // return to resting position
        .to("#r_wing", {duration:Dur, scale:1},"<")
        .to("#l_wing", {duration:Dur, scale:1},"<")
        .to("#head", {duration:.4, ease:"power3", rotate:-3, transformOrigin:"50% 50%", delay:1.3})

    });


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
        hopNWalk_tl.current.restart(0);
      }
      document.querySelector("#duck-svg").addEventListener("click", duckClickHandler);


    return () => {
      const duckCanv = document.querySelector("#duck-svg");
      ctx.revert();
      duckCanv.removeEventListener("click", duckClickHandler)
    }
  }, [])


  //START BUTTON HANDLER
  const turnStoryPage = () => {
    document.querySelector("#start-button").disabled = true; // keep double-clickers safe.
    flyAway_tl.current.play(0);

    setTimeout(() => {
      //window.open("/page1.html", "_self");
    }, flyAway_tl.current.totalDuration() * 1000);

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
              <button id="start-button" onClick={ turnStoryPage }>
                Start the Story!
              </button>
            <div id="storyPage"></div>
            <div id="duck-container">
              <SvgDuck />
            </div>
					</article>
				</main>
				<footer>
          <Credit />
				</footer>
			</div>
			<div id="flexCenter"></div>
		</div>
    </>
  )
}

// RENDERS
const frontPage = ReactDOM.createRoot(document.getElementById("front-page"));
frontPage.render(<FrontPage />)
