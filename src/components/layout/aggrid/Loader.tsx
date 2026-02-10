import React from "react";
import { FaSpinner } from "react-icons/fa";

export default (props: any) => {
  return (
    <div
      className="ag-custom-loading-cell"
      style={{ paddingLeft: "10px", lineHeight: "25px" }}
    >
      <FaSpinner /> <span> {props.loadingMessage}</span>
    </div>
  );
};
