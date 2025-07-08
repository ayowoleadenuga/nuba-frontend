import React, { SVGProps } from "react";

export const AddIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8327 9.27319H10.8327V4.27319H9.16602V9.27319H4.16602V10.9399H9.16602V15.9399H10.8327V10.9399H15.8327V9.27319Z"
        fill={props.fill || "black"}
      />
    </svg>
  );
};
