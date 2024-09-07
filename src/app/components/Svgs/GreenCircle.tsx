import * as React from "react";
import { SVGProps } from "react";

const GreenCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 130 130"
    {...props}
  >
    <path
      d="M65 0C29.16 0 0 29.16 0 65s29.16 65 65 65 65-29.16 65-65S100.84 0 65 0Zm0 127C30.81 127 3 99.19 3 65S30.81 3 65 3s62 27.81 62 62-27.81 62-62 62Z"
      fill="#046915" // Apply green color directly to the path
    />
    <path
      d="M85.37 66.05a3.549 3.549 0 0 0-5.04 0S68.57 77.82 68.57 77.82V43.57c0-1.97-1.6-3.57-3.57-3.57s-3.57 1.6-3.57 3.57v34.24L49.67 66.05c-1.41-1.38-3.67-1.37-5.05.04a3.567 3.567 0 0 0 0 5.01l17.85 17.85a3.591 3.591 0 0 0 5.06 0L85.38 71.1a3.558 3.558 0 0 0 0-5.04Z"
      fill="#046915" // Apply green color directly to the path
    />
  </svg>
);

export default GreenCircle;
