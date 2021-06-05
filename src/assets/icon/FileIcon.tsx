import React from "react";

const FileIcon = (props: any) => {
  return (
    <svg
      fill={props.color || "#000"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={`${props.width}px`}
      height={`${props.height}px`}
    >
      {" "}
      <path d="M13.172,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8.828c0-0.53-0.211-1.039-0.586-1.414l-4.828-4.828 C14.211,2.211,13.702,2,13.172,2z M18.5,9H13V3.5L18.5,9z" />
    </svg>
  );
};

export default FileIcon;
