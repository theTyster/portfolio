import react from "react";
import PropTypes from "prop-types";

//CSS
import "../assets/css/attention-getter-image.scss";

// NOTE: Using this component encourages the use of the center-children-by-flex
// mixin in order to style the sideText containers to a desirable width of the
// image. This should be done in the parent components stylesheet.
// 
// To select it, nest this selector in AttentionGetterImage's parent.
// Example:
// div.attention-getter {
//   @include center-children-by-flex(
//     $childClassPrefix: <SET THIS>
//   ) 
// }

//Props
AttentionGetterImage.proptypes = {
  imgClass: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  sideText: PropTypes.element.isRequired,
  sideText_ClassPrefix: PropTypes.string.isRequired,
}

function AttentionGetterImage({imgClass, imgSrc, imgAlt, sideText, sideText_classPrefix}){
  return (
    <div className="attention-getter">
      <img className={imgClass} src={imgSrc} alt={imgAlt} />
      <div className="sideText-container">
        <div className={`${sideText_classPrefix}-centering-box`}></div>
        <div className={`${sideText_classPrefix}-item`}>
          {sideText}
        </div>
        <div className={`${sideText_classPrefix}-centering-box`}></div>
      </div>
    </div>
  )
}

export default AttentionGetterImage;
