import PropTypes from "prop-types";

//CSS
import "./attention-getter-image.scss";

// NOTE: Using this component encourages the use of the center-children-by-flex
// mixin in order to style the sideText containers to a desirable width of the
// image. This should be done in the parent components stylesheet.
//
// To select it, nest this selector in AttentionGetterImage's parent.
// Example:
// div.attention-getter {
//   @include center-children-by-flex(
//     $childClassPrefix: <SET THIS>,
//		 $itemWidth: <SET THIS>
//   )
// }

function AttentionGetterImage({
  imgClass,
  imgSrc,
  imgAlt,
  imgLink,
  sideText_classPrefix,
  sideText,
}) {
  //Props
  AttentionGetterImage.propTypes = {
    imgClass: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    imgLink: PropTypes.string,
    sideText_classPrefix: PropTypes.string.isRequired,
    sideText: PropTypes.element.isRequired,
  };

  return (
    <div className="attention-getter">
      {imgLink ? (
        <a href={imgLink} target="_blank" rel="noreferrer noopener">
          <img className={imgClass} src={imgSrc} alt={imgAlt} />
        </a>
      ) : (
        <img className={imgClass} src={imgSrc} alt={imgAlt} />
      )}
        <div className='sideText-container'>
          {sideText}
        </div>
    </div>
  );
}

export default AttentionGetterImage;
