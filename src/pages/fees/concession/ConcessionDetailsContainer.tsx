import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";
import { useSelector } from "react-redux";
import Select, { OptionsOrGroups } from "react-select";

function DriverDetailsContainer({
  formData,
  setFormData,
  classList,
  divisionList,
  concessionTypeList,
}: any) {
  const studentList = useSelector((state: any) => {
    console.log("search result", state.classWiseList);
    return state.classWiseList;
  });
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

  const classListOptions = classList?.map((items: any) => {
    return {
      label: items.class_name,
      value: items.id,
    };
  });
  const divisionListOptions = divisionList?.map((items: any) => {
    return {
      label: items.name,
      value: items.id,
    };
  });
  const concessionTypeListOptions = concessionTypeList?.map((items: any) => {
    return {
      label: items.name,
      value: items.id,
    };
  });
  const classWiseStudentListOptions = studentList.classList?.map(
    (items: any) => {
      return {
        label: items.student_name,
        value: items.id,
      };
    }
  );

  return (
    <Row className="modalformBody">
      <Col md={12} className="form-inputs">
        <Row className="form-inputs-row">
          <Col md={6}>
            <label htmlFor="">Class</label>
            <Select
              options={classListOptions}
              placeholder="Select Class"
              styles={customStyles}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  class: e?.value,
                  division: "",
                  student: "",
                });
              }}
              value={classListOptions.find(
                (option: any) => option.value === formData.class
              )}
              required
              //   defaultValue={formData.academic_year}
            />
          </Col>
          <Col md={6}>
            <label htmlFor="">Division</label>
            <Select
              options={divisionListOptions}
              placeholder="Select division"
              styles={customStyles}
              onChange={(e: any) => {
                setFormData({ ...formData, division: e.value, student: "" });
              }}
              value={divisionListOptions.find(
                (option: any) => option.value === formData.division
              )}
              required
              // defaultValue={academicYearOptions.filter(
              //   (item: any) => item.value === "2022-2023"
              // )}
              //   defaultValue={formData.academic_year}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row ">
          <Col md={6}>
            <label htmlFor="">Student</label>
            <Select
              options={classWiseStudentListOptions}
              placeholder="Select Student"
              styles={customStyles}
              value={classWiseStudentListOptions.find(
                (option: any) => option.value === formData.student
              )}
              onChange={(e: any) => {
                setFormData({ ...formData, student: e.value });
              }}
              required
              //   defaultValue={formData.academic_year}
            />
          </Col>
          <Col md={6}>
            <label htmlFor="">Scholarship</label>
            <Select
              options={concessionTypeListOptions}
              placeholder="Select Scholarship"
              styles={customStyles}
              onChange={(e: any) => {
                setFormData({ ...formData, concession_type: e.label });
              }}
              required
              //   defaultValue={formData.academic_year}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DriverDetailsContainer;
