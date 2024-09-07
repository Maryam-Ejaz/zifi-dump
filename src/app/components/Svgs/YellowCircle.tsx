import * as React from "react"
import { SVGProps } from "react"
const YellowCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 130 130"
    {...props}
  >
    <path
      d="M65 130c-35.84 0-65-29.16-65-65S29.16 0 65 0s65 29.16 65 65-29.16 65-65 65ZM65 3C30.81 3 3 30.81 3 65s27.81 62 62 62 62-27.81 62-62S99.19 3 65 3Z"
      style={{
        fill: "#ff0",
      }}
    />
  </svg>
)
export default YellowCircle
