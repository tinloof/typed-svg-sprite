import * as React from "react";
import type { SVGProps } from "react";
const SvgShop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#shop_svg__a)">
      <path
        fill="#323232"
        d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6zm-6-2h4v2h-4zM9 18V9l7.5 4z"
      />
    </g>
    <defs>
      <clipPath id="shop_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgShop;
