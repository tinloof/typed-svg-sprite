import * as React from "react";
import type { SVGProps } from "react";
const SvgAccountBalance = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g fill="#323232" clipPath="url(#account_balance_svg__a)">
      <path d="M7 10H4v7h3zM13.5 10h-3v7h3zM22 19H2v3h20zM20 10h-3v7h3zM12 1 2 6v2h20V6z" />
    </g>
    <defs>
      <clipPath id="account_balance_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAccountBalance;
