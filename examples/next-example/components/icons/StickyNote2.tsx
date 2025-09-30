import * as React from "react";
import type { SVGProps } from "react";
const SvgStickyNote2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#sticky_note_2_svg__a)">
      <path
        fill="#323232"
        d="M19 3H4.99C3.89 3 3 3.9 3 5l.01 14c0 1.1.89 2 1.99 2h10l6-6V5c0-1.1-.9-2-2-2M7 8h10v2H7zm5 6H7v-2h5zm2 5.5V14h5.5z"
      />
    </g>
    <defs>
      <clipPath id="sticky_note_2_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgStickyNote2;
