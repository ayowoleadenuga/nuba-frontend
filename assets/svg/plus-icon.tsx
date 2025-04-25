import React, { SVGProps } from "react";

const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width={props.width || "16"}
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.4375 7.99492C1.4375 7.20273 2.08437 6.56055 2.87187 6.56055H13.1141C13.9062 6.56055 14.5484 7.20742 14.5484 7.99492C14.5484 8.78711 13.9016 9.4293 13.1141 9.4293H2.87187C2.08437 9.4293 1.4375 8.78242 1.4375 7.99492Z"
        fill={props.fill || "#FAFAFA"}
      />
      <path
        d="M7.99517 14.5625C7.20298 14.5625 6.56079 13.9156 6.56079 13.1281L6.56079 2.88594C6.56079 2.09375 7.20767 1.45156 7.99517 1.45156C8.78735 1.45156 9.42954 2.09844 9.42954 2.88594V13.1281C9.42954 13.9156 8.78267 14.5625 7.99517 14.5625Z"
        fill={props.fill || "#FAFAFA"}
      />
    </svg>
  );
};

export default PlusIcon;
