import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
  desc?: string;
  descId?: string;
}
const SvgNpm = ({
  title,
  titleId,
  desc,
  descId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 804 480"
    aria-labelledby={titleId}
    aria-describedby={descId}
    {...props}
  >
    {desc ? <desc id={descId}>{desc}</desc> : null}
    {title ? <title id={titleId}>{title}</title> : null}
    <rect width={804} height={480} fill="#b02a2a" rx={20} />
    <path
      fill="#FFF"
      d="M263 377.5h95V330h95V140H263zm95-190h47.5v95H358zM491 140v190h95V187.5h47.5V330H681V187.5h47.5V330H776V140zM35 330h95V187.5h47.5V330H225V140H35z"
    />
  </svg>
);
export default SvgNpm;

