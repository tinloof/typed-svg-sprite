import * as React from "react";
import type { SVGProps } from "react";
const SvgHourglassFull = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#hourglass_full_svg__a)">
      <path
        fill="#323232"
        d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2z"
      />
    </g>
    <defs>
      <clipPath id="hourglass_full_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgHourglassFull;
