import React, { useEffect, useState, useRef } from "react";
import { Col } from "react-bootstrap";
import {
  FaArrowDown,
  FaChevronDown,
  FaPlusCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import TextDropDownSelect from "../../../components/inputComponent/TextDropDownSelect";
import {
  deleteFeeHeadDiv,
  setDefaultFeeHead,
  updateFeeHeadDiv,
} from "../../../slices/settings/miscellaneousSettingSlice";
import Select from "react-select";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
function FeeHeadDiv(props: any) {
  const handleInputChange = (e: any) => {
    props.onChange(props.index, e.target.name, e.target.value);
  };

  return (
    <>
      <Col md={6} className="setting-field-col">
        <label>Fee Head {props.index !== 0 ? props.index : ""}</label>

        <Select
          options={props.feeHeadOptions}
          placeholder="Select Fee Head"
          styles={customStyles}
          value={props.feeHeadOptions.find(
            (opt: any) => opt.id === props.item.fee_head_id,
          )}
          onChange={(e: any) => {
            props.onChange(props.index, "fee_head_id", e.id);
            props.onChange(props.index, "amount", e.value);
            props.onChange(props.index, "remarks", e.remarks);
          }}
        />
      </Col>

      <Col md={6} className="setting-field-col">
        <label>Fee Amount {props.index !== 0 ? props.index : ""}</label>

        <div className="d-flex align-items-center gap-2">
          <input
            className="form-input"
            type="number"
            name="amount"
            value={props.item.amount}
            onChange={handleInputChange}
            required
          />

          {props.index !== 0 && (
            <div
              className="circle-btn delete"
              onClick={() => props.delete(props.index)}
            >
              <FaTimesCircle color="#e78484" />
            </div>
          )}

          {props.array.length - 1 === props.index && (
            <div onClick={props.add} style={{ cursor: "pointer" }}>
              <FaPlusCircle color="#0ea377" />
            </div>
          )}
        </div>
      </Col>
    </>
  );
}

export default FeeHeadDiv;
