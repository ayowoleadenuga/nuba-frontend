import React, { SVGProps } from "react";

const Hamburger = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 15H17.5V13.3332H2.5V15ZM2.5 10.8332H17.5V9.1668H2.5V10.8332ZM2.5 5V6.6668H17.5V5H2.5Z"
        fill={props.fill || "white"}
      />
    </svg>
  );
};

export default Hamburger;
