import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import Select from "react-select";
import {
  ADMISSION_NUMBER,
  APPROVE_PRE_REGISTRATION,
  DIVISION_LIST,
} from "../../config/BaseUrl";
import { apiPost } from "../../config/apiConfig";
import axios from "axios";
import ReceiptModal from "./RecieptModal";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import { tryFetchPreBookingTableData } from "../../slices/receipt/receiptSlice";
import { useDispatch } from "react-redux";

function ApproveModal(props: any) {
  const dispatch = useDispatch();
  const [admissionNumber, setAdmissionNumber] = useState(0);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [isScholarship, setIsScholarship] = useState(0);
  const [divisionList, setDivisionList] = useState([]);
  const [isRecieptModal, setIsRecieptModal] = useState(false);
  const [admNo, setAdmNo] = useState("");
  const [respYear, setRespYear] = useState("");

  // Validation state
  const [errorMessage, setErrorMessage] = useState({
    admissionNumber: "",
    selectedDivision: "",
    paymentMode: "",
  });

  const divisionOptions: any = divisionList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });

  const paymentOptions = [
    { value: "Card", label: "Card" },
    { value: "Cash", label: "Cash" },
    { value: "Bank", label: "Bank" },
    { value: "Online", label: "Online" },
    { value: "Adv.Fee", label: "Adv.Fee" },
  ];

  async function handleSave() {
    let hasError = false;
    const newErrorMessage = {
      admissionNumber: "",
      selectedDivision: "",
      paymentMode: "",
    };

    if (admissionNumber === 0) {
      newErrorMessage.admissionNumber = "Admission number is required";
      hasError = true;
    }

    if (selectedDivision === "") {
      newErrorMessage.selectedDivision = "Division is required";
      hasError = true;
    }

    if (paymentMode === "") {
      newErrorMessage.paymentMode = "Payment mode is required";
      hasError = true;
    }

    setErrorMessage(newErrorMessage);

    if (hasError) {
      return; // Stop if there are errors
    }

    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("application_no", props.rowData.application_no);
      bodyFormData.append("application_id", props.rowData.id);

      bodyFormData.append("class", props.rowData.class_id);
      bodyFormData.append("academic_year", props.rowData.academic_year);
      bodyFormData.append("adm_no", admissionNumber.toString());
      bodyFormData.append("div", selectedDivision);
      bodyFormData.append("payment_mode", paymentMode);
      bodyFormData.append("scholarship", isScholarship.toString());

      let resp: any = await apiPost(APPROVE_PRE_REGISTRATION, bodyFormData);
      console.log("data is ", bodyFormData);
      if (resp.response.data.status === 200) {
        setAdmNo(resp.response.data.data?.application_no);
        setRespYear(resp.response.data.data?.academic_year);
        props.setOpen(false);

        setIsRecieptModal(true);
        setAdmissionNumber(0);
        setSelectedDivision("");
        setPaymentMode("");
        dispatch(tryFetchPreBookingTableData());
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

  async function getDivisionList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(DIVISION_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setDivisionList(resp.response.data.data);
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
  async function getAdmNo() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", props.rowData.academic_year);
      // bodyFormData.append("academic_year", "2025-2026");
      let resp: any = await apiPost(ADMISSION_NUMBER, bodyFormData);
      console.log("data is admno ", resp);
      if (resp.response.data.status === 200) {
        let num = resp.response.data.data.old_admission_no;
        setAdmissionNumber(num);
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

  const handleCancel = () => {
    props.setOpen();
    setAdmissionNumber(0);
    setSelectedDivision("");
    setPaymentMode("");
    setErrorMessage({
      admissionNumber: "",
      selectedDivision: "",
      paymentMode: "",
    });
  };

  useEffect(() => {
    getDivisionList();
    getAdmNo();
    console.log("prop approve data", props);
  }, [props]);

  return (
    <>
      <Modal
        show={props.modalOpen}
        size="lg"
        className="transportModal"
        centered
      >
        <Modal.Header className="transportModalHeader">
          <Modal.Title className="d-flex align-items-center">
            <FaUser style={{ margin: "0 1rem" }} /> Student Details -{" "}
            {props.rowData.first_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem 4rem" }}>
          <Form>
            <Form.Group className="col-md-6" style={{ marginBottom: "1rem" }}>
              <Form.Label>Admission Number </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Admission Number"
                value={admissionNumber}
                required
                onChange={(e) => setAdmissionNumber(parseInt(e.target.value))}
              />
              {errorMessage.admissionNumber && (
                <div className="validation">{errorMessage.admissionNumber}</div>
              )}
            </Form.Group>

            <Col
              md={6}
              className="setting-field-col"
              style={{ marginBottom: "1rem" }}
            >
              <label>Division</label>
              <Select
                options={divisionOptions}
                value={divisionOptions.filter(
                  (item: any) => item.value === selectedDivision,
                )}
                styles={customStyles}
                required
                onChange={(e) => setSelectedDivision(e.value)}
                placeholder="Select Division"
              />
              {errorMessage.selectedDivision && (
                <div className="validation">
                  {errorMessage.selectedDivision}
                </div>
              )}
            </Col>

            <Col
              md={6}
              className="setting-field-col"
              style={{ marginBottom: "1rem" }}
            >
              <label>Mode of Payment</label>
              <Select
                options={paymentOptions}
                placeholder="Select mode of Payment"
                styles={customStyles}
                onChange={(e: any) => setPaymentMode(e.value)}
              />
              {errorMessage.paymentMode && (
                <div className="validation">{errorMessage.paymentMode}</div>
              )}
            </Col>

            <Col>
              <input
                type="checkbox"
                checked={isScholarship === 1}
                onChange={(e) => setIsScholarship(e.target.checked ? 1 : 0)}
              />
              &nbsp;&nbsp;
              <label>Scholarship</label>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ReceiptModal
        modalOpen={isRecieptModal}
        setOpen={setIsRecieptModal}
        admNo={admNo}
        year={respYear}
        type="admission"
      />
    </>
  );
}

export default ApproveModal;
