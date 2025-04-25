import React, { SVGProps } from "react";

const PaymentIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_140_350)">
        <path
          d="M2.5 12.5C2.5 10.4289 4.17893 8.75 6.25 8.75H23.75C25.8211 8.75 27.5 10.4289 27.5 12.5V23.75C27.5 25.8211 25.8211 27.5 23.75 27.5H6.25C4.17893 27.5 2.5 25.8211 2.5 23.75V12.5Z"
          fill="black"
        />
        <rect
          x="6.25"
          y="12.5"
          width="17.5"
          height="11.25"
          rx="2.5"
          fill="white"
        />
        <path
          d="M25 7.5H5V5H25V7.5ZM22.5 0H7.5V2.5H22.5V0ZM27.5 12.5V22.5C27.5 23.163 27.2366 23.7989 26.7678 24.2678C26.2989 24.7366 25.663 25 25 25H5C4.33757 24.998 3.70283 24.734 3.23442 24.2656C2.76601 23.7972 2.50198 23.1624 2.5 22.5V12.5C2.50198 11.8376 2.76601 11.2028 3.23442 10.7344C3.70283 10.266 4.33757 10.002 5 10H25C25.6624 10.002 26.2972 10.266 26.7656 10.7344C27.234 11.2028 27.498 11.8376 27.5 12.5ZM17.4088 18.8025L20.3125 16.32L16.4888 16L15 12.5L13.5112 16L9.6875 16.32L12.5912 18.8025L11.7163 22.5L15 20.535L18.2837 22.5L17.4088 18.8025Z"
          fill={props.fill || "white"}
        />
      </g>
      <defs>
        <clipPath id="clip0_140_350">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PaymentIcon;
