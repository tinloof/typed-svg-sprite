import * as React from "react";
import type { SVGProps } from "react";
const SvgLeaderboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#leaderboard_svg__a)">
      <path
        fill="#323232"
        d="M7.5 21H2V9h5.5zm7.25-18h-5.5v18h5.5zM22 11h-5.5v10H22z"
      />
    </g>
    <defs>
      <clipPath id="leaderboard_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLeaderboard;
