import * as React from "react";
import type { SVGProps } from "react";
const SvgCardMembership = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#card_membership_svg__a)">
      <path
        fill="#323232"
        d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2m0 13H4v-2h16zm0-5H4V4h16z"
      />
    </g>
    <defs>
      <clipPath id="card_membership_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCardMembership;
