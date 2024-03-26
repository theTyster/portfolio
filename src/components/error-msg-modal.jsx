import {useState} from "react";

//SVG
import SvgExitButton from "../assets/img/exit-button-svg.jsx";

//CSS
import "../assets/css/error-msg-modal.scss";


const ErrorMessageModal = ({msg, imgSrc, imgAlt, buttonLink, buttonText})=>{

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
