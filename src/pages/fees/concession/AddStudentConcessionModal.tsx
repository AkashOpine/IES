import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { FaFileContract, FaTruckMoving } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_DRIVER,
  ADD_STUDENT_CONCESSION,
  CLASS_LIST,
  CONCESSION_TYPE_LIST,
  DIVISION_LIST,
} from "../../../config/BaseUrl";
import { tryFetchConcessionListData } from "../../../slices/concession/concessionSlice";
import {
  clearClassList,
  tryFetchClassSearchList,
} from "../../../slices/navsearch/ClassWiseSearchSlice";
import ConcessionDetailsContainer from "./ConcessionDetailsContainer";

function AddStudentConcessionModal(props: any) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [concessionTypeList, setConcessionTypeList] = useState([]);
  const [formData, setFormData] = useState({
    class: "",
    division: "",
    student: "",
    concession_type: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("student_id", formData.student);
      bodyFormData.append("concession_type", formData.concession_type);
      let resp: any = await apiPost(ADD_STUDENT_CONCESSION, bodyFormData);
      console.log("concession  datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
      } else {
        alert("Something happened please try again");
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
  const clearDatas = () => {
    setFormData({
      class: "",
      division: "",
      student: "",
      concession_type: "",
    });
    props.setOpen(false);
    dispatch(clearClassList());
    dispatch(tryFetchConcessionListData());
  };

  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);
      console.log("class data is ", resp);
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
  async function getDivisionList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(DIVISION_LIST, bodyFormData);
      console.log("division data is ", resp);
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
  async function getConcessionTypeList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CONCESSION_TYPE_LIST, bodyFormData);
      console.log("concession data list is ", resp);
      if (resp.response.data.status == 200) {
        setConcessionTypeList(resp.response.data.data);
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

  useEffect(() => {
    getClassList();
    getDivisionList();
    getConcessionTypeList();
  }, []);
  useEffect(() => {
    if (formData.class !== "" && formData.division !== "") {
      const searchValue = {
        classSearch: formData.class,
        divisionSearch: formData.division,
        year: "",
      };
      dispatch(tryFetchClassSearchList(searchValue));
    }
  }, [formData.class, formData.division]);
  return (
    <Modal
      size="xl"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form>
        <Modal.Header className="transportModalHeader">
          <span>Add Student Concession</span>
          <button type="button" onClick={() => clearDatas()}></button>
        </Modal.Header>
        <Modal.Body className="transportFormModal">
          <div>
            <ConcessionDetailsContainer
              classList={classList}
              divisionList={divisionList}
              concessionTypeList={concessionTypeList}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-view"
            role="submit"
            onClick={(e) => handleSubmit(e)}
            disabled={
              formData.class === "" ||
              formData.division === "" ||
              formData.student === "" ||
              formData.concession_type === ""
            }
          >
            <span>Add Concession</span>
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AddStudentConcessionModal;
