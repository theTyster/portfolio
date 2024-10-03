import {themeColors} from "../utils/utils.js"

const SvgExitButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 26.458 26.458"
    {...props}
  >
		<title>Exit Button</title>
    <g
      strokeLinecap="round"
    >
      <circle
        id="exit-button-svg-circle"
        cx={13.229}
        cy={13.229}
        r={12.259}
        fill="none"
        stroke={themeColors.lightcharcoal}
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        id="exit-button-svg-x"
        fill="none"
        stroke={themeColors.lightcharcoal}
        strokeWidth={1.5}
        d="m6.952 6.952 12.555 12.555M19.507 6.952 6.952 19.507"
      />
    </g>
  </svg>
);
export default SvgExitButton;

