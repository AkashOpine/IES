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
  const [showAmountDD, setShowAmountDD]: any = useState(false);

  const feeHeadData: any = useSelector(
    (state: any) => state.miscellaneousSetting
  );
  const dispatch: any = useDispatch();

  const handleAddRow = () => {
    props.add();
    dispatch(setDefaultFeeHead());
  };
  const handleDeleteRow = () => {
    props.delete(props.index);
    dispatch(deleteFeeHeadDiv(props.index));
  };
  const handleChange = (e: any) => {
    var data = {
      name: e.target.name,
      value: e.target.value,
      index: props.index,
    };
    dispatch(updateFeeHeadDiv(data));
  };
  const handleDropDownChange = (value: any) => {
    var data = {
      name: "amount",
      value: value,
      index: props.index,
    };
    dispatch(updateFeeHeadDiv(data));
  };
  const feeHeadOptions: any = feeHeadData.miscellaneousSettingList?.map(
    (items: any) => {
      return {
        value: items.fee_amount,
        label: items.fee_head_name,
        id: items.id,
      };
    }
  );
  return (
    <>
      <Col
        md={6}
        className="setting-field-col"
        //
      >
        <label>Fee Head {props.index !== 0 ? props.index : ""}</label>
        <Select
          options={feeHeadOptions}
          placeholder="Select Fee Head"
          styles={customStyles}
          onChange={(e: any) => {
            var data1 = {
              name: "fee_head_id",
              value: e.id,
              index: props.index,
            };
            var data2 = {
              name: "amount",
              value: e.value,
              index: props.index,
            };
            dispatch(updateFeeHeadDiv(data1));
            dispatch(updateFeeHeadDiv(data2));
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
            onChange={handleChange}
            value={feeHeadData.addFeeHead[props.index]?.["amount"]}
            required
          />
          {/* <TextDropDownSelect
            name={"amount"}
            type={"number"}
            className={"form-input"}
            autoComplete={"off"}
            required={true}
            placeHolder={`Enter fee amount ${
              props.index !== 0 ? props.index : ""
            }`}
            handleValueChange={(e: any) => handleChange(e)}
            value={feeHeadData.addFeeHead[props.index]?.["amount"]}
            dropDownListValues={feeHeadData.miscellaneousSettingList?.map(
              (items: any) => items.fee_amount
            )}
            handleDropDownChange={(e: any) => handleDropDownChange(e)}
          />*/}
          {props.index !== 0 ? (
            <div className="circle-btn delete" onClick={handleDeleteRow}>
              <FaTimesCircle color="#e78484" />
            </div>
          ) : (
            ""
          )}
          {props.array.length - 1 === props.index ? (
            <div onClick={handleAddRow} style={{ cursor: "pointer" }}>
              <FaPlusCircle color="#0ea377" />
            </div>
          ) : (
            ""
          )}
        </div>
      </Col>
    </>
  );
}

export default FeeHeadDiv;
