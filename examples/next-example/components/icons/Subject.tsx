import * as React from "react";
import type { SVGProps } from "react";
const SvgSubject = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#subject_svg__a)">
      <path
        fill="#323232"
        d="M14 17H4v2h10zm6-8H4v2h16zM4 15h16v-2H4zM4 5v2h16V5z"
      />
    </g>
    <defs>
      <clipPath id="subject_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSubject;
