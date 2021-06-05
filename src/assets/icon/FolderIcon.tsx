import React from "react";

const FolderIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={`${props.width}px`}
      height={`${props.height}px`}
    >
      <path
        fill="#dbb065"
        d="M1.5 26.5L1.5 3.5 9.793 3.5 12.793 6.5 28.5 6.5 28.5 26.5z"
      />
      <path
        fill="#967a44"
        d="M9.586,4l2.707,2.707L12.586,7H13h15v19H2V4H9.586 M10,3H1v24h28V6H13L10,3L10,3z"
      />
      <g>
        <path
          fill="#f5ce85"
          d="M1.5 26.5L1.5 8.5 10.151 8.5 13.151 6.5 28.5 6.5 28.5 26.5z"
        />
        <path
          fill="#967a44"
          d="M28,7v19H2V9h8h0.303l0.252-0.168L13.303,7H28 M29,6H13l-3,2H1v19h28V6L29,6z"
        />
      </g>
    </svg>
  );
};

export default FolderIcon;
