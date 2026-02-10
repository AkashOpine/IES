import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";
import Select, { OptionsOrGroups } from "react-select";

function DriverDetailsContainer({
  formData,
  setFormData,
  setSelectedFile,
  selectedFile,
  academicYear,
}: any) {
  const customStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: "16px",
        fontWeight: "400",
      };
    },
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      fontSize: "14px",
      background: "white",
      borderRadius: "6px",
      //   minHeight: 0,
      //   height: "2em",
      borderColor: "#f3f6f9",

      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#" : "#",
      },
    }),
    menu: (base: any) => ({
      ...base,

      borderRadius: 0,

      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      fontSize: "13px",
      padding: 0,
    }),
    option: (base: any) => ({
      ...base,
      width: "100%",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#3699FF",
      "&:hover": {
        color: "#3699FF",
      },
    }),
  };
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const academicYearOptions = academicYear?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  return (
    <Row className="modalformBody">
      <Col md={12} className="form-inputs">
        <Row className="form-inputs-row">
          <Col md={6}>
            <Select
              options={academicYearOptions}
              placeholder="Academic Year"
              styles={customStyles}
              onChange={(e) => {
                setFormData({ ...formData, academic_year: e?.value });
              }}
              defaultValue={academicYearOptions.filter(
                (item: any) => item.value === "2023-2024"
              )}
              //   defaultValue={formData.academic_year}
            />
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Driver name"
              value={formData.driver_name}
              required
              onChange={(e) => {
                setFormData({ ...formData, driver_name: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Assistant name"
              value={formData.driver_assistant_name}
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  driver_assistant_name: e.target.value,
                });
              }}
            />
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Description"
              value={formData.description}
              required
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Address"
              required
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
              }}
              value={formData.address}
            />
          </Col>
          <Col md={6}>
            <input
              type="number"
              className="form-input"
              placeholder="Phone"
              required
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
              }}
              value={formData.phone}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="number"
              className="form-input"
              placeholder="Mobile"
              required
              onChange={(e) => {
                setFormData({ ...formData, mobile: e.target.value });
              }}
              value={formData.mobile}
            />
          </Col>
          <Col md={6}>
            <input
              type="date"
              className="form-input"
              placeholder="Date of birth"
              required
              onChange={(e) => {
                setFormData({ ...formData, dob: e.target.value });
              }}
              value={formData.dob}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Blood Group"
              required
              onChange={(e) => {
                setFormData({ ...formData, blood_group: e.target.value });
              }}
              value={formData.blood_group}
            />
          </Col>
          <Col md={6}>
            <input
              type="number"
              className="form-input"
              placeholder="Experience (Years)"
              onChange={(e) => {
                setFormData({ ...formData, experience: e.target.value });
              }}
              value={formData.experience}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Licence No"
              required
              onChange={(e) => {
                setFormData({ ...formData, liscence_no: e.target.value });
              }}
              value={formData.liscence_no}
            />
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Emergency contact name"
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  emergency_contact_name: e.target.value,
                });
              }}
              value={formData.emergency_contact_name}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Emergency contact relationship"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  emergency_contact_relationship: e.target.value,
                });
              }}
              value={formData.emergency_contact_relationship}
            />
          </Col>
          <Col md={6}>
            <input
              type="number"
              className="form-input"
              placeholder="Emergency contact phone"
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  emergency_contact_phone: e.target.value,
                });
              }}
              value={formData.emergency_contact_phone}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col md={6}>
            <input
              type="file"
              className="form-input-file"
              onChange={handleFileSelect}
              required
              style={{
                color: selectedFile === null ? "transparent" : "",
                textAlign: "left",
              }}
            />
          </Col>
        </Row> */}
      </Col>
    </Row>
  );
}

export default DriverDetailsContainer;
