//DEV LIBRARIES
import react from "react";
import {setTitle} from "../../../assets/utils.js";

//CSS
import "../../../assets/css/landing-page.scss";

//COMPONENTS
import TabMenu from "./tab-menu.jsx";
import AttetionGetterImage from "../../attention-getter-image.jsx";

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

      <TabMenu />
    </>
  )
}

export default LandingPage;
