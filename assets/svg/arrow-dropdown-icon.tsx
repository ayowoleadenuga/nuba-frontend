import React, { SVGProps } from "react";

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width={props.width || "20"}
      height={props.height || "21"}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 14.5C9.41668 14.5 8.83335 14.275 8.39168 13.8334L2.95835 8.40003C2.71668 8.15837 2.71668 7.75837 2.95835 7.5167C3.20002 7.27503 3.60002 7.27503 3.84168 7.5167L9.27502 12.95C9.67502 13.35 10.325 13.35 10.725 12.95L16.1583 7.5167C16.4 7.27503 16.8 7.27503 17.0417 7.5167C17.2833 7.75837 17.2833 8.15837 17.0417 8.40003L11.6083 13.8334C11.1667 14.275 10.5833 14.5 10 14.5Z"
        fill={props.fill || "#292D32"}
      />
    </svg>
  );
};
