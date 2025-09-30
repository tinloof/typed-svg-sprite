import * as React from "react";
import type { SVGProps } from "react";
const SvgDoneOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#done_outline_svg__a)">
      <path
        fill="#323232"
        d="m19.77 5.03 1.4 1.4L8.43 19.17l-5.6-5.6 1.4-1.4 4.2 4.2zm0-2.83L8.43 13.54l-4.2-4.2L0 13.57 8.43 22 24 6.43z"
      />
    </g>
    <defs>
      <clipPath id="done_outline_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgDoneOutline;
