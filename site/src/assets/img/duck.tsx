//import PropTypes from "prop-types";

const SvgDuck = ({props}) => {

//  //Props Validation
//  SvgDuck.propTypes = {
//    props:PropTypes.object.isRequired,
//    top: PropTypes.string,
//    bottom: PropTypes.string,
//    left: PropTypes.string,
//    right: PropTypes.string,
//  }

  return (
    <svg
      id="duck-canvas"
      width="553"
      height="610"
      viewBox="0 0 553 610"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        top:props.top, 
        bottom:props.bottom, 
        left:props.left,
        right:props.right
      }}
    >
      <defs>
        <linearGradient
          id="Yellow"
          gradientTransform="matrix(-25772 13978 25701 53006 -48422991 47831951)"
        >
          <stop stopColor="#ffd42a" offset={0} />
        </linearGradient>
        <linearGradient
          id="Burnt_Orange"
          gradientTransform="matrix(-7477.4 0 0 7475.7 -2295832 -3795671)"
        >
          <stop stopColor="#a40" offset={0} />
        </linearGradient>
        <linearGradient
          id="Burnt_Yellow"
          gradientTransform="matrix(-118.2 62.415 67.028 135.63 -10097 -10105)"
        >
          <stop stopColor="#d4aa00" offset={0} />
        </linearGradient>
        <linearGradient
          id="linearGradient864"
          gradientTransform="matrix(391.88 0 0 337.83 -34271 -20109)"
        >
          <stop stopColor="#d45500" offset={0} />
        </linearGradient>
        <linearGradient
          id="linearGradient1429"
          x1={48.152}
          x2={90.648}
          y1={124.18}
          y2={124.18}
          gradientUnits="userSpaceOnUse"
          xlinkHref="#Burnt_Yellow"
        />
        <linearGradient
          id="linearGradient860-3"
          x1={94.444}
          x2={117.5}
          y1={75.191}
          y2={75.191}
          gradientTransform="matrix(3.6008 -.0027282 .0027282 3.6007 -90.87 -76.39)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#Burnt_Orange"
        />
        <linearGradient
          id="linearGradient1012-6"
          x1={80.708}
          x2={89.691}
          y1={82.079}
          y2={82.079}
          gradientTransform="matrix(3.6008 0 0 3.6007 -52.089 -101.93)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#Yellow"
        />
        <linearGradient
          id="linearGradient1018-7"
          x1={80.855}
          x2={89.646}
          y1={106.87}
          y2={106.87}
          gradientTransform="matrix(3.6008 0 0 3.6007 -52.089 -101.93)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#Yellow"
        />
      </defs>
      <rect
        id="duck-backdrop"
        x={-8.2397e-7}
        y={-0.0000018311}
        width={553}
        height={610}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="duck-svg">
        <g id="l_leg">
          <g id="l_flipper">
            <path
              d="m209.72 496.7c-2.5078 14.846-5.0156 29.691-7.5235 44.537 13.465 17.884 26.93 35.769 40.394 53.654-13.378-2.3614-28.858-3.299-39.893 6.1392-4.9118 3.5819-8.3214 10.981-13.246 3.2526-10.343-8.4944-23.99-11.221-37.07-10.645-10.932 0.92318 1.1528-8.1549 3.4218-12.487 10.676-13.857 21.901-27.47 32.233-41.48l7.7835-46.417c4.6335 1.1475 9.267 2.295 13.901 3.4425z"
              fill="url(#linearGradient864)"
              stroke="url(#linearGradient864)"
              strokeLinejoin="round"
            />
            <g fill="none" stroke="url(#Burnt_Orange)" strokeLinecap="round">
              <path d="m165.41 583.87 16.339-20.305" strokeWidth={1.5} />
              <path d="m194.53 594.5-1.4948-30.649" strokeWidth={1.5} />
              <path d="m221.59 585.86-12.882-21.641" strokeWidth={1.5} />
            </g>
          </g>
          <ellipse
            id="l_knee"
            cx={206.33}
            cy={461.23}
            rx={40.25}
            ry={43.601}
            fill="url(#Yellow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="r_leg">
          <g id="r_flipper">
            <path
              d="m340.36 498.71c2.5078 14.846 5.0156 29.691 7.5235 44.537-13.465 17.884-26.93 35.769-40.394 53.654 13.378-2.3614 28.858-3.299 39.893 6.1392 4.9118 3.5819 8.3214 10.981 13.246 3.2526 10.343-8.4944 23.99-11.221 37.07-10.645 10.932 0.92318-1.1528-8.1549-3.4218-12.487-10.676-13.857-21.901-27.47-32.233-41.48l-7.7835-46.417c-4.6335 1.1475-9.267 2.295-13.901 3.4425z"
              fill="url(#linearGradient864)"
              stroke="url(#linearGradient864)"
              strokeLinejoin="round"
            />
            <g fill="none" stroke="url(#Burnt_Orange)" strokeLinecap="round">
              <path d="m384.67 585.88-16.339-20.305" strokeWidth={1.5} />
              <path d="m355.55 596.5 1.4948-30.649" strokeWidth={1.5} />
              <path d="m328.49 587.86 12.882-21.641" strokeWidth={1.5} />
            </g>
          </g>
          <ellipse
            id="r_knee"
            transform="scale(-1,1)"
            cx={-342.66}
            cy={458.99}
            rx={40.25}
            ry={43.601}
            fill="url(#Yellow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="body" fill="url(#Yellow)">
          <ellipse
            cx={272.16}
            cy={336.57}
            rx={158.89}
            ry={149.28}
            fillRule="evenodd"
            strokeWidth={2.018}
          />
          <g id="r_wing">
            <ellipse
              transform="matrix(-.96642 .25698 .24647 .96915 0 0)"
              cx={-314.81}
              cy={412.94}
              rx={52.759}
              ry={100.12}
              strokeWidth={4.131}
              style={{
                paintOrder: "stroke fill markers",
              }}
            />
            <path
              d="m371.71 226.9a100.12 52.754 75.971 0 0-22.332 61.422 100.12 52.754 75.971 0 0 21.452 85.371"
              stroke="url(#Burnt_Yellow)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={6.1964}
              style={{
                paintOrder: "normal",
              }}
            />
          </g>
          <g id="l_wing">
            <ellipse
              transform="matrix(.97483 .22296 -.21236 .97719 0 0)"
              cx={205.84}
              cy={286.86}
              rx={52.759}
              ry={100.12}
              strokeWidth={4.131}
              style={{
                paintOrder: "stroke fill markers",
              }}
            />
            <path
              d="m170.79 232.66a52.754 100.12 12.021 0 1 24.471 60.602 52.754 100.12 12.021 0 1-18.447 86.071"
              stroke="url(#Burnt_Yellow)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={6.1964}
              style={{
                paintOrder: "normal",
              }}
            />
          </g>
        </g>
        <g id="head">
          <ellipse
            id="skull"
            transform="matrix(3.4162 -1.1382 1.0927 3.4309 -112.35 -122.96)"
            cx={79.561}
            cy={107.11}
            rx={32.508}
            ry={28.532}
            fill="#ffd42a"
            fillRule="evenodd"
          />
          <path
            id="head_shadow"
            transform="matrix(3.4237 -1.1153 1.1153 3.4236 -112.35 -122.96)"
            d="m67.237 131.99a32.436 27.955 0 0 1-16.712-12.734"
            fill="none"
            stroke="url(#linearGradient1429)"
            strokeLinecap="round"
            strokeWidth={1.5}
          />
          <path
            id="hair"
            d="m223.83 54.259c-16.405 3.2508-14.15-17.063-4.6639-23.536 15.454-10.545 35.483 0.68438 42.112 16.115 7.4938 17.444 0.51257 37.8-14.108 49.168"
            fill="none"
            stroke="url(#Burnt_Yellow)"
            strokeLinecap="round"
            strokeWidth={6.196}
          />
          <g id="face">
            <g id="l_eyesocket" fillRule="evenodd">
              <g id="l_eye">
                <ellipse
                  id="l_eyeball"
                  transform="matrix(.95082 -.30973 .30975 .95082 0 0)"
                  cx={155.44}
                  cy={237.37}
                  rx={15.253}
                  ry={25.723}
                  fill="#2b2200"
                />
                <ellipse
                  id="l_pupil"
                  transform="rotate(-.043411)"
                  cx={225.17}
                  cy={173.01}
                  rx={10.524}
                  ry={10.524}
                  fill="#f2f2f2"
                  style={{
                    paintOrder: "normal",
                  }}
                />
              </g>
              <rect
                id="lt_eyelid"
                transform="matrix(.94721 -.32062 .40742 .91324 0 0)"
                x={118.97}
                y={169.9}
                width={32.348}
                height={44.516}
                fill="url(#Yellow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                id="lb_eyelid"
                transform="matrix(.94721 -.32062 .40742 .91324 0 0)"
                x={113.57}
                y={266.2}
                width={31.654}
                height={28.839}
                fill="url(#Yellow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g id="mouth">
              <path
                id="beak"
                d="m283.37 166.86a17.034 21.503 71.959 0 0-15.44 21.384 15.05 49.302 71.957 0 0-22.652 21.692 15.05 49.302 71.957 0 0 51.538-0.96057 15.05 49.302 71.957 0 0 42.215-29.58 15.05 49.302 71.957 0 0-30.321-4.3166 17.034 21.503 71.959 0 0-25.23-8.2549 17.034 21.503 71.959 0 0-0.1116 0.0363z"
                fill="#f60"
                fillRule="evenodd"
              />
              <path
                id="closed_lips"
                d="m245.28 209.94s29.072 2.7398 50.347-4.3662c21.276-7.1059 43.406-26.174 43.406-26.174"
                fill="none"
                stroke="url(#linearGradient860-3)"
              />
              <ellipse
                id="r_nostril"
                transform="matrix(-1 .00075766 .00075769 1 0 0)"
                cx={-299.73}
                cy={181.33}
                rx={2.7387}
                ry={3.5518}
                fill="url(#Burnt_Orange)"
                fillRule="evenodd"
                style={{
                  paintOrder: "normal",
                }}
              />
              <ellipse
                id="l_nostril"
                transform="matrix(-1 .00075766 .00075769 1 0 0)"
                cx={-276.83}
                cy={188.28}
                rx={2.7387}
                ry={3.5518}
                fill="url(#Burnt_Orange)"
                fillRule="evenodd"
                style={{
                  paintOrder: "normal",
                }}
              />
            </g>
            <g id="r_eyesocket" fillRule="evenodd">
              <g id="r_eye">
                <ellipse
                  id="r_eyeball"
                  transform="matrix(.95082 -.30973 .30975 .95082 0 0)"
                  cx={279.36}
                  cy={238.5}
                  rx={15.253}
                  ry={25.723}
                  fill="#2b2200"
                />
                <ellipse
                  id="r_pupil"
                  transform="rotate(-.043411)"
                  cx={343.37}
                  cy={135.79}
                  rx={10.524}
                  ry={10.524}
                  fill="#f2f2f2"
                  style={{
                    paintOrder: "normal",
                  }}
                />
              </g>
              <rect
                id="rt_eyelid"
                transform="matrix(.94721 -.32062 .40742 .91324 0 0)"
                x={238.52}
                y={171.35}
                width={32.348}
                height={44.516}
                fill="url(#linearGradient1012-6)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                id="rb_eyelid"
                transform="matrix(.94721 -.32062 .40742 .91324 0 0)"
                x={239.05}
                y={268.47}
                width={31.654}
                height={28.839}
                fill="url(#linearGradient1018-7)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
export default SvgDuck;

