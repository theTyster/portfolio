import * as React from "react";
import PropTypes from "prop-types";

const SvgLoadingCircle = (props) => {

  //Props Validation
  SvgLoadingCircle.propTypes = {
    className: PropTypes.string,
  }

  return(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    viewBox="0 0 13.229 13.229"
    {...props}
  >
    <defs>
      <linearGradient
        id="loading-circle_svg__a"
        x1={368.98}
        x2={449.66}
        y1={457.98}
        y2={513.11}
        gradientTransform="matrix(.0559 0 0 .05787 75.152 99.253)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} />
        <stop offset={1} stopOpacity={0} />
      </linearGradient>
    </defs>
    <path
      fill="url(#loading-circle_svg__a)"
      d="M94.574 122.57a6.615 6.849 0 0 0-4.008 8.062 6.615 6.849 0 0 0 7.23 5.115 6.615 6.849 0 0 0 5.797-6.797h-3.307a3.307 3.424 0 0 1-3.025 3.412 3.307 3.424 0 0 1-3.542-2.829 3.307 3.424 0 0 1 2.057-3.773z"
      opacity={0.998}
      transform="translate(-90.364 -122.57)"
    />
  </svg>
  )
};
export default SvgLoadingCircle;

