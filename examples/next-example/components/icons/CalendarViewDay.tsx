import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendarViewDay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#calendar_view_day_svg__a)">
      <path fill="#323232" d="M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z" />
    </g>
    <defs>
      <clipPath id="calendar_view_day_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCalendarViewDay;
