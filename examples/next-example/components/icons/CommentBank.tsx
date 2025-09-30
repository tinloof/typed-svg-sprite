import * as React from "react";
import type { SVGProps } from "react";
const SvgCommentBank = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#comment_bank_svg__a)">
      <path
        fill="#323232"
        d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-1 11-2.5-1.5L14 13V5h5z"
      />
    </g>
    <defs>
      <clipPath id="comment_bank_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCommentBank;
