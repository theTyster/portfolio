import {React, useState} from "react";
import PropTypes from "prop-types";

//SVG
import SvgExitButton from "@img/exit-button-svg.jsx";

//CSS
import "./error-msg-modal.scss";


const ErrorMessageModal = ({
  msg,
  imgSrc,
  imgAlt,
  buttonLink,
  buttonText,
})=>{

  //Props
  ErrorMessageModal.propTypes= {
    msg: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    buttonLink: PropTypes.string,
    buttonText: PropTypes.string,
  }

  const [isClosed, setClosed] = useState(false);
  const handleClick = () => setClosed(true);

  return !isClosed? (
    <div className="error-msg">
      <div>
        <SvgExitButton 
          onClick={handleClick}
          className="error-message-exit"
        />
      </div>
      <h3>Whoops!</h3>
      {(()=>{
        if(imgSrc) return <img src={imgSrc} alt={imgAlt} />
      })()}
      <p>{msg}</p>
      {(()=>{
        if(buttonLink) return <a href={buttonLink} target="_blank" ><button>{buttonText}</button></a>
      })()}
    </div>
  )
  :
  undefined;
}


export default ErrorMessageModal;
