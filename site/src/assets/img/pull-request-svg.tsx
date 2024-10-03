import PropTypes from "prop-types";

const SvgPullRequest = (props) => {

  //PROPS
  SvgPullRequest.proptypes = {
    className: PropTypes.string,
  }

  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-100 -100 712 712"
    width="1em"
    height="1em"
    {...props}
  >
		<title>Pull-requesst Icon</title>
    <path d="M305.8 2.1C314.4 5.9 320 14.5 320 24v40h16c70.7 0 128 57.3 128 128v166.7c28.3 12.3 48 40.5 48 73.3 0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-35.3-28.7-64-64-64h-16v40c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1M104 80a24 24 0 1 0-48 0 24 24 0 1 0 48 0m8 73.3v205.4c28.3 12.3 48 40.5 48 73.3 0 44.2-35.8 80-80 80S0 476.2 0 432c0-32.8 19.7-61 48-73.3V153.3C19.7 141 0 112.8 0 80 0 35.8 35.8 0 80 0s80 35.8 80 80c0 32.8-19.7 61-48 73.3M104 432a24 24 0 1 0-48 0 24 24 0 1 0 48 0m328 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48" />
  </svg>
  );
}

export default SvgPullRequest;
