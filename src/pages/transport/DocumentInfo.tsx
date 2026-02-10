import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaFileArchive, FaPaperclip, FaPlus, FaTrashAlt } from "react-icons/fa";

import DocumentComponent from "./DocumentComponent";

function DocumentInfo() {
  const [inputitemDiv, setInputitemDiv] = useState([<DocumentComponent />]);
  const onAddBtnClick = () => {
    setInputitemDiv([...inputitemDiv, <DocumentComponent />]);
  };
  const removeDiv = (index: number) => {
    console.log("eeeee", index);
    var array = [...inputitemDiv];
    if (index !== -1) {
      array.splice(index, 1);
      setInputitemDiv(array);
    }
  };

  return (
    <div className="formBodyDocument">
      {inputitemDiv.map((items, key) => {
        return (
          <DocumentComponent
            array={inputitemDiv}
            delete={removeDiv}
            index={key}
            add={onAddBtnClick}
            // formSuccess={success?.status === "Success"}
            // formActivity={activity}
          />
        );
      })}
    </div>
  );
}

export default DocumentInfo;
