//DEV Libraries
import {useEffect, useRef} from 'react';
import gsap from "gsap";
import PropTypes from "prop-types";

//CSS
import './css/front-page.scss';

//COMPONENTS
import SvgDuck from "./assets/duck.jsx";


const FrontPage = ({setStory}) => {

  //Props Validation
  FrontPage.propTypes = {
    setStory: PropTypes.func,
  }

  //REFS
  const blink_tl = useRef(); 
  const flyAway_tl = useRef();
  const hopNWalk_tl = useRef();


  // ANIMATIONS 
  useEffect(() =>{ // keeps animations from firing after every render. (No dependancies).
    //useLayoutEffect is preferred with animations to avoid flickering in .from() type animations that run before the dom paints.
    //useEffect was chosen in this case because none of the animations are set to fire until well after the dom is painted.
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
        .to("#l_knee, #r_knee", {duration:Dur, y:"-=10"},"<")
        .to("#l_leg, #r_leg", {duration:Dur, y:"-=30"},"<") //poise for jump
        .to("#body", {duration:Dur, yoyo:true, repeat:1, y:"+=35"},"<")
        .to("#head", {duration:Dur, yoyo:true, repeat:1, y:"+=90"},"<")
        .to("#r_wing", {duration:.05, yoyo:true, repeat:61, rotate:-50, transformOrigin:"50% 15%"},">") //flappy
        .to("#l_wing", {duration:.05, yoyo:true, repeat:61, rotate:50, transformOrigin:"50% 15%"},"<")
        .to("#storyPage", {duration:3, left:"0", width:"100%"},"<") // slide out
        .to("#content", {duration:0, overflow:"hidden"},"<")
        .to("#duck-canvas", {duration:2, ease:"power4", top:"7vh"},"<")
        .add(() => window.scrollTo({top:0, behavior:"smooth"}),"<")
        .to("#duck-canvas", {duration:.5, ease:"linear", top:"10vh"},"<+2")
        .to("#l_knee, #r_knee", {duration:.5, y:"+=10"},"<")
        .to("#l_leg, #r_leg", {duration:.5, y:"+=30"},"<") 
        .to("#head", {duration:.4, ease:"power3", rotate:0, transformOrigin:"50% 50%", delay:.5})

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
        .to("#head", {duration:.4, ease:"power3", rotate:0, transformOrigin:"50% 50%", delay:1.3})

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


    // DUCK CLICK HANDLER
    const duckClickHandler = () => {
      hopNWalk_tl.current.restart(0);
    }
    document.querySelector("#duck-svg").addEventListener("click", duckClickHandler); 
    // this event listener is removed when the svg is unmounted and re-rendered without it during state change.


    return () => {
      ctx.revert();
    }
  }, [])


  //START BUTTON HANDLER
  const turnStoryPage = () => {
    document.querySelector("#start-button").removeEventListener("click", turnStoryPage)
    flyAway_tl.current.play(0);
    setTimeout(() => {
      setStory("beginning")
    }, flyAway_tl.current.totalDuration() * 1000 + 1000);
  }


  return(
    <>
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
      <div id="storyPage"></div>
      <div id="duck-container">
        <SvgDuck props={{
          top:"auto",
          bottom:"auto",
          left:"0",
          right:"auto"
        }}/>
      </div>
        <button id="start-button" onClick={ turnStoryPage }>
          Start the Story!
        </button>
    </>
  );
}

export default FrontPage;
