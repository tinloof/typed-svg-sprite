import * as React from "react";
import type { SVGProps } from "react";
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#home_svg__a)">
      <path fill="#323232" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </g>
    <defs>
      <clipPath id="home_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgHome;
