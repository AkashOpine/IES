import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaPaperclip, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultDocument,
  deleteDocuments,
  updateDocumentDetails,
} from "../../slices/transport/transportSlice";

function DocumentComponent(props: any) {
  const transportData: any = useSelector((state: any) => state.transport);
  const fileInputRef: any = useRef(null);

  const [image, setImage]: any = useState("");

  const dispatch = useDispatch();
  const handleAddRow = () => {
    props.add();
    dispatch(setDefaultDocument());
  };
  const handleDeleteRow = () => {
    props.delete(props.index);
    dispatch(deleteDocuments(props.index));
  };

  const handleChange = (e: any) => {
    if (e.target.name === "vfile") {
      var data = {
        name: e.target.name,
        value: e.target.files[0],
        index: props.index,
      };
      dispatch(updateDocumentDetails(data));
    } else {
      var data = {
        name: e.target.name,
        value: e.target.value,
        index: props.index,
      };
      dispatch(updateDocumentDetails(data));
    }
  };
  useEffect(() => {
    if (transportData.addTransportDocuments[props.index]?.["vfile"]) {
      fileInputRef.current.defaultValue =
        transportData.addTransportDocuments[props.index]?.["vfile"];
    }
  }, [transportData.addTransportDocuments[props.index]?.["vfile"]]);
  return (
    <Row key={props.index} className="mb-3">
      <Col md={10}>
        <Row>
          <Col md={4}>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Document name"
              onChange={handleChange}
              value={transportData.addTransportDocuments[props.index]?.["name"]}
            />
          </Col>
          <Col md={4}>
            <input
              type="date"
              className="form-input"
              name="expiry"
              placeholder="Expiry Date"
              onChange={handleChange}
              value={
                transportData.addTransportDocuments[props.index]?.["expiry"]
              }
            />
          </Col>
          <Col md={4} className="file-input-container">
            <input
              type="file"
              ref={fileInputRef}
              className="form-input-file"
              name="vfile"
              onChange={handleChange}
              // value={
              //   transportData.addTransportDocuments[props.index]?.["vfile"]
              // }
            />
            <span>
              <FaPaperclip />
            </span>
          </Col>
        </Row>
      </Col>
      <Col md={2}>
        <Row>
          {props.array.length - 1 === props.index ? (
            <Col md={6}>
              <div className="circle-btn add" onClick={handleAddRow}>
                <FaPlus />
              </div>
            </Col>
          ) : (
            ""
          )}
          <Col md={6}>
            <div className="circle-btn delete" onClick={handleDeleteRow}>
              <FaTrashAlt />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DocumentComponent;
