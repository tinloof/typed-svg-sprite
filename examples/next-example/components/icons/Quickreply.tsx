import * as React from "react";
import type { SVGProps } from "react";
const SvgQuickreply = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g fill="#323232" clipPath="url(#quickreply_svg__a)">
      <path d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9v-8h7z" />
      <path d="M22.5 16h-2.2l1.7-4h-5v6h2v5z" />
    </g>
    <defs>
      <clipPath id="quickreply_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgQuickreply;
