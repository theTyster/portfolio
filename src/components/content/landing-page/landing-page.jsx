//DEV LIBRARIES
import react from "react";
import {setTitle} from "../../../assets/utils.js";

//CSS
import "../../../assets/css/landing-page.scss";

//COMPONENTS
import TabMenu from "./tab-menu.jsx";
import AttetionGetterImage from "../../attention-getter-image.jsx";
import JobHistory from "./job-history.jsx";
import Hobbies from "./hobbies.jsx";
import Contributions from "./contributions.jsx";
import MyWork from "./my-work.jsx";

//SVG
import SvgCurlywave from "../../../assets/img/curlywave.jsx";

const AttentionGetterContent = () =>(
    <>
      <p><i>I like to keep things, lean, fast, simple and usable. The web was meant to make information accessible to anyone.</i></p>
      <blockquote>
      <p>
        <i>&quot;Web pages are designed for people.&quot;</i>
      </p>
       <p>-Tim Berners-Lee</p>
      </blockquote>
    </>
)

function LandingPage(){

  setTitle("Ty Davis")

  const menuItems = new Map([
    [
      {
        "job-history": 0,
        "my-work": 1,
        "contributions": 2,
        "hobbies": 3,
      },
      [
        {
    //0
        component: <JobHistory />,
        title: "Job History",
        id:"job-history"
        },
        {
    //1
        component: <MyWork />,
        title: "My Work",
        id:"my-work"
        },
        {
    //2
        component: <Contributions />,
        title: "Contributions",
        id:"contributions"
        },
        {
    //3
        component: <Hobbies />,
        title: "Hobbies",
        id:"hobbies"
        }
      ]
    ]
  ])

  return(
    <>
      <AttetionGetterImage 
        imgClass="my-headshot"
        sideText_classPrefix="headshot-text"
        imgSrc="img/me.jpg"
        imgAlt="My Face."
        sideText={<AttentionGetterContent />}
      />

      <hr />

    <TabMenu menuItems={menuItems} />

    </>
  )
}

export default LandingPage;
