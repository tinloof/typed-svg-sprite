import * as React from "react";
import type { SVGProps } from "react";
const SvgAlarmOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#alarm_on_svg__a)">
      <path
        fill="#323232"
        d="m22 5.72-4.6-3.86-1.29 1.53 4.6 3.86zM7.88 3.39 6.6 1.86 2 5.71l1.29 1.53zM12 4a9 9 0 0 0-9 9c0 4.97 4.02 9 9 9a9 9 0 0 0 0-18m0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7m-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06z"
      />
    </g>
    <defs>
      <clipPath id="alarm_on_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAlarmOn;
