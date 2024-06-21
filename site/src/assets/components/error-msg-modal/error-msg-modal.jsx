import {React, useState} from "react";
import PropTypes from "prop-types";
import NewTabLink from "@components/safe-link/new-tab-link";

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
      <button
        className="error-message-exit"
        onClick={handleClick}
      >
        <SvgExitButton
          className="error-message-exit"
        />
      </button>
      <h3>Whoops!</h3>
      {(()=>{
        if(imgSrc) return <img src={imgSrc} alt={imgAlt} />
      })()}
      <p>{msg}</p>
      {(()=>{
        if(buttonLink) return <NewTabLink link={buttonLink}><button>{buttonText}</button></NewTabLink>
      })()}
    </div>
  )
  :
  undefined;
}


export default ErrorMessageModal;
