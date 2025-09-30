import * as React from "react";
import type { SVGProps } from "react";
const SvgTrendingFlat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#trending_flat_svg__a)">
      <path fill="#323232" d="m22 12-4-4v3H3v2h15v3z" />
    </g>
    <defs>
      <clipPath id="trending_flat_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTrendingFlat;
