import * as React from "react";
import type { SVGProps } from "react";
const SvgHomeFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#home_filled_svg__a)">
      <path fill="#323232" d="M12 3 4 9v12h5v-7h6v7h5V9z" />
    </g>
    <defs>
      <clipPath id="home_filled_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgHomeFilled;
