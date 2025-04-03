import React, { SVGProps } from "react";

const MinusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="14"
      height="4"
      viewBox="0 0 14 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.4375 1.99492C0.4375 1.20273 1.08438 0.560547 1.87187 0.560547H12.1141C12.9062 0.560547 13.5484 1.20742 13.5484 1.99492C13.5484 2.78711 12.9016 3.4293 12.1141 3.4293H1.87187C1.08438 3.4293 0.4375 2.78242 0.4375 1.99492Z"
        fill={props.fill || "#FAFAFA"}
      />
    </svg>
  );
};

export default MinusIcon;
