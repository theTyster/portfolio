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
        id="a"
        x1={96.978} 
        x2={101.12} 
        y1={125.04} 
        y2={129.18} 
        gradientUnits="userSpaceOnUse">
      <stop offset={0}/>
      <stop stopOpacity={0} offset={1}/>
      </linearGradient>
    </defs>

    <g transform="translate(-90.364 -122.57)">
      <path 
        d="m96.978 122.57a6.6145 6.6145 0 0 0-6.6145 6.6145 6.6145 6.6145 0 0 0 6.6145 6.6145 6.6145 6.6145 0 0 0 6.6145-6.6145h-2.4727a4.1419 4.1419 0 0 1-4.1418 4.1418 4.1419 4.1419 0 0 1-4.1418-4.1418 4.1419 4.1419 0 0 1 4.1418-4.1418v-2.4727z" 
        opacity={.998}
        fill="url(#a)"
      />
    </g>
  </svg>
  )
};
export default SvgLoadingCircle;

