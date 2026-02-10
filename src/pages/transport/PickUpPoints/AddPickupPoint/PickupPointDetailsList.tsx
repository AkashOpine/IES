import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import {
  FaArrowDown,
  FaChevronDown,
  FaPlusCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  deletePickupPoint,
  setDefaultPickupPoint,
  updatePickupPoint,
} from "../../../../slices/transport/transportSlice";

function PickupPointDetailsList(props: any) {
  const pickupPointDetails: any = useSelector((state: any) => state.transport);
  const dispatch: any = useDispatch();

  const handleAddRow = () => {
    props.add();
    dispatch(setDefaultPickupPoint());
  };
  const handleDeleteRow = () => {
    props.delete(props.index);
    dispatch(deletePickupPoint(props.index));
  };
  const handleChange = (e: any) => {
    var data = {
      name: e.target.name,
      value: e.target.value,
      index: props.index,
    };
    dispatch(updatePickupPoint(data));
    console.log("redux", pickupPointDetails);
  };

  return (
    <>
      <Row className="form-inputs-row ">
        <Col md={3}>
          <label htmlFor="">Pickup Point</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter Pickup Point"
            name="pick_up_point"
            onChange={(e) => handleChange(e)}
            required
            // defaultValue={academicYearOptions.filter(
            //   (item: any) => item.value === "2022-2023"
            // )}
            //   defaultValue={formData.academic_year}
          />
        </Col>
        <Col md={3}>
          <label htmlFor="">Pickup Fee</label>
          <input
            type="number"
            name="pick_up_fee"
            className="form-input"
            placeholder="Enter Pickup Fee"
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>
        <Col md={3}>
          <label htmlFor="">Pickup Time</label>
          <input
            type="time"
            className="form-input"
            name="pick_up_time"
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>{" "}
        <Col md={3}>
          <label htmlFor="">Drop Time</label>
          <input
            type="time"
            className="form-input"
            name="drop_off_time"
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>
      </Row>
      <Row className="form-inputs-row ">
        <Col md={12}>
          <label htmlFor="">Description</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-input"
              placeholder="Description"
              name="description"
              onChange={(e) => handleChange(e)}
              // onChange={(e: any) => {
              //   setFormData({ ...formData, description: e.value });
              // }}
              // required
            />
            {props.index !== 0 ? (
              <div className="circle-btn delete" onClick={handleDeleteRow}>
                <FaTimesCircle color="#e78484" />
              </div>
            ) : (
              ""
            )}
            {props.pickupPointDivData.length - 1 === props.index ? (
              <div onClick={() => handleAddRow()} style={{ cursor: "pointer" }}>
                <FaPlusCircle color="#0ea377" />
              </div>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default PickupPointDetailsList;
