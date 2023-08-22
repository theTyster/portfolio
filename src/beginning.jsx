//DEV Libraries
import {useLayoutEffect, useRef} from 'react';
import gsap from "gsap";

//Components
import SvgDuck from "./assets/duck.jsx";


const Beginning = ()=>{
  const placement_tl = useRef();

  //ANIMATIONS
  useLayoutEffect(()=>{
    const ctx = gsap.context(()=>{
      const dur = 1;
      placement_tl.current = gsap.timeline();
      placement_tl.current
        .from("p", {opacity:0, y:"+=10"})
        .from("footer", {y:"+=200px"},"<")
        .from("main", {height:"100vh"},"<")
        .to("#duck-canvas", {duration:dur, scale:.6, top:"-190", left:"300"})
      
    })


    return () => {
      ctx.revert();
    }
  }, [])

  return(
    <>
      <p>Hi</p>
      <SvgDuck props={{
        top:"10vh",
        bottom:"auto",
        left:"0",
        right:"auto"
      }}/>
    </>
  )
}

export default Beginning;
