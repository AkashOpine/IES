import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Modal, Row, Toast } from "react-bootstrap";
import { FaDownload, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  ADD_PRE_REGISTRATION,
  UPDATE_PRE_REGISTRATION,
} from "../../config/BaseUrl";
import Select from "react-select";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import { tryFetchPreBookingTableData } from "../../slices/receipt/receiptSlice";
import ReceiptModal from "./RecieptModal";
import moment from "moment";

function PreBooking(props: any) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const history = useNavigate();
  // const currentYear = localStorage.getItem("year");
  const currentYear = "2026-2027";

  const [yearOptions, setYearOptions] = useState([]);
  const [admNo, setAdmNo] = useState("");
  const [classList, setClassList] = useState([]);
  const [isRecieptModal, setIsRecieptModal] = useState(false);
  const [respYear, setRespYear] = useState("");
  const [ClassInvalid, setClassInvalid] = useState(false);
  const [MOPInvaild, setMOPInvalid] = useState(false);

  const [values, setValues] = useState({
    academic_year: currentYear,
    name: "",
    class: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
    dob: "",
    parentName: "",
    mobile: "",
    payment_mode: "",
    gender: "",
  });

  useEffect(() => {
    if (props.isEdit === true) {
      setValues({
        academic_year: props.rowData.academic_year || currentYear,
        name: props.rowData.first_name,
        class: props.rowData.class_id || "",
        date: props.rowData.date_of_registration,
        dob: props.rowData.dob,
        parentName: props.rowData.parent_name,
        mobile: props.rowData.contact_no,
        payment_mode: props.rowData.payment_mode?.toLowerCase() || "",
        gender: props.rowData.gender,
      });
    } else {
      setValues({
        academic_year: currentYear,
        name: "",
        class: "",
        date: moment(new Date()).format("YYYY-MM-DD"),
        dob: "",
        parentName: "",
        mobile: "",
        payment_mode: "",
        gender: "",
      });
    }
  }, [props]);

  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
        setYearOptions(resp.response.data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setClassList(resp.response.data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  const academicYearOptions = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const classOptions = classList?.map((items: any) => {
    return {
      label: items.class_name,
      value: items.id,
    };
  });
  const paymentOptions = [
    { value: "card", label: "Card" },
    { value: "cash", label: "Cash" },
    { value: "bank", label: "Bank" },
    { value: "online", label: "Online" },
  ];
  const gender = [
    { value: "0", label: "Male" },
    { value: "1", label: "Female" },
  ];
  useEffect(() => {
    getAcademicYear();
    getClassList();
  }, []);

  const handleCancel = () => {
    setValues({
      academic_year: currentYear,
      name: "",
      class: "",
      date: moment(new Date()).format("YYYY-MM-DD"),
      dob: "",
      parentName: "",
      mobile: "",
      payment_mode: "",
      gender: "",
    });
    setClassInvalid(false);
    setMOPInvalid(false);
    props.setOpen(false);
    props.setIsEdit(false);
  };
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (values.class === "") {
      setClassInvalid(true);
    } else {
      setClassInvalid(false);
    }
    if (values.payment_mode === "") {
      setMOPInvalid(true);
    } else {
      setMOPInvalid(false);
    }
    if (values.class !== "" && values.payment_mode !== "") {
      console.log("prebooking initiated");
      try {
        var token = localStorage.getItem("token") as string;
        var bodyFormData = new FormData();
        {
          props.isEdit &&
            bodyFormData.append("application_id", props.rowData.id);
        }
        bodyFormData.append("Authorization", token);
        bodyFormData.append("academic_year", values.academic_year || "");
        bodyFormData.append("student_name", values.name);
        bodyFormData.append("class", values.class);
        bodyFormData.append("date", values.date);
        bodyFormData.append("dob", values.dob);
        bodyFormData.append("parent_name", values.parentName);
        bodyFormData.append("contact_no", values.mobile);
        bodyFormData.append("payment_mode", values.payment_mode);
         bodyFormData.append("gender", values.gender);
        let resp: any;
        if (props.isEdit) {
          resp = await apiPost(UPDATE_PRE_REGISTRATION, bodyFormData);
        } else {
          resp = await apiPost(ADD_PRE_REGISTRATION, bodyFormData);
        }

        console.log("prebooking is ", resp);
        if (
          resp.response.data.status === 200 &&
          resp.response.data.data.show_recipet === 1
        ) {
          //   setShow(false);
          // toast.success("Pre-registration Successfull");
          // history("/pre-registration-List");
          setIsRecieptModal(true);
          setRespYear(resp.response.data.data.academic_year);
          props.setOpen(false);
          props.setIsEdit(false);
          setAdmNo(resp.response.data.data.application_no);
          dispatch(tryFetchPreBookingTableData());
          setValues({
            academic_year: currentYear,
            name: "",
            class: "",
            date: moment(new Date()).format("YYYY-MM-DD"),
            dob: "",
            parentName: "",
            mobile: "",
            payment_mode: "",
            gender: "",
          });
        } else {
          props.setOpen(false);
          props.setIsEdit(false);
          console.log("22", "assak");

          setAdmNo(resp.response.data.data);
          dispatch(tryFetchPreBookingTableData());
          setValues({
            academic_year: currentYear,
            name: "",
            class: "",
            date: moment(new Date()).format("YYYY-MM-DD"),
            dob: "",
            parentName: "",
            mobile: "",
            payment_mode: "",
            gender: "",
          });
          toast.success("Student Registered Successfully");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    }
  }
  return (
    <>
      <Modal
        size="xl"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form action="" onSubmit={handleSubmit}>
          <Modal.Header className="transportModalHeader">
            <span>Add Student Details </span>
            <button type="button" onClick={handleCancel}></button>
          </Modal.Header>
          <Modal.Body>
            <div className="setting-container">
              <Row>
                <Col md={6} className="setting-field-col">
                  <label>Academic Year</label>
                  <Select
                    options={academicYearOptions}
                    placeholder="Academic Year"
                    styles={customStyles}
                    required
                    value={academicYearOptions.find(
                      (item) => item.value === values.academic_year
                    )}
                    onChange={(e: any) => {
                      setValues({ ...values, academic_year: e.value });
                    }}
                  />
                </Col>
                <Col md={6} className="setting-field-col">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-input"
                    required
                    onChange={(e: any) => {
                      setValues({ ...values, name: e.target.value });
                    }}
                    value={values.name}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="setting-field-col">
                  <label>Class of Admission</label>
                  <Select
                    options={classOptions}
                    placeholder="Select Class"
                    styles={customStyles}
                    onChange={(e: any) => {
                      setValues({ ...values, class: e.value });
                      setClassInvalid(false);
                    }}
                    value={classOptions.find(
                      (item) => item.value === values.class
                    )}
                    filterOption={(option) => option.label !== "All"}
                  />

                  {ClassInvalid ? (
                    <div className="validation">Please select a class</div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md={6} className="setting-field-col">
                  <label>Date</label>
                  <input
                    type="date"
                    placeholder="Enter Date"
                    className="form-input"
                    required
                    onChange={(e: any) => {
                      setValues({ ...values, date: e.target.value });
                    }}
                    value={values.date}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="setting-field-col">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    placeholder="Enter DOB"
                    className="form-input"
                    // required
                    onChange={(e: any) => {
                      setValues({ ...values, dob: e.target.value });
                    }}
                    value={values.dob}
                  />
                </Col>
                <Col md={6} className="setting-field-col">
                  <label> Parent's Name</label>
                  <input
                    type="text"
                    placeholder="Enter Parent's name"
                    className="form-input"
                    // required
                    onChange={(e: any) => {
                      setValues({ ...values, parentName: e.target.value });
                    }}
                    value={values.parentName}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="setting-field-col">
                  <label> Mobile Number</label>
                  <input
                    type="Number"
                    placeholder="Enter Mobile Number"
                    className="form-input"
                    // required
                    onChange={(e: any) => {
                      setValues({ ...values, mobile: e.target.value });
                    }}
                    value={values.mobile}
                  />
                </Col>
                <Col md={6} className="setting-field-col">
                  <label>Mode of Payment</label>
                  <Select
                    options={paymentOptions}
                    placeholder="Select payment mode"
                    styles={customStyles}
                    onChange={(e: any) => {
                      setValues({ ...values, payment_mode: e.value });
                      setMOPInvalid(false);
                    }}
                    value={paymentOptions.find(
                      (item) => item.value === values.payment_mode
                    )}

                    // defaultValue={classOptions.filter(
                    //   (item: any) => item.label === "All"
                    // )}
                    // filterOption={(option) => option.label !== "All"}
                  />{" "}
                  {MOPInvaild ? (
                    <div className="validation">
                      Please select a payment mode
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>

              <Row>
                <Col md={6} className="setting-field-col">
                  <label>Gender</label>
                  <Select
                    options={gender}
                    placeholder="Select Gender"
                    styles={customStyles}
                    onChange={(e: any) => {
                      setValues({ ...values, gender: e.value });
                    }}
                    value={gender.find((item) => item.value === values.gender)}

                    // defaultValue={classOptions.filter(
                    //   (item: any) => item.label === "All"
                    // )}
                    // filterOption={(option) => option.label !== "All"}
                  />{" "}
                </Col>
              </Row>

              <Row>
                <Col md={12} className="d-flex justify-content-center gap-3">
                  <Button type="submit" className="button-70">
                    {props.isEdit ? "Edit" : "Submit"}
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Close
                  </Button>
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </form>
      </Modal>
      <ReceiptModal
        modalOpen={isRecieptModal}
        setOpen={setIsRecieptModal}
        year={respYear}
        admNo={admNo}
        type="registration"
      />
    </>
  );
}

export default PreBooking;
