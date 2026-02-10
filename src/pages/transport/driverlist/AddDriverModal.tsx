import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../config/apiConfig";
import { ACADEMIC_YEAR, ADD_DRIVER } from "../../../config/BaseUrl";
import { tryFetchDriverListData } from "../../../slices/transport/transportSlice";
import DriverDetailsContainer from "./DriverDetailsContainer";

function AddDriverModal(props: any) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile]: any = React.useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [formData, setFormData] = useState({
    academic_year: "",
    designation: "",
    driver_name: "",
    driver_assistant_name: "",
    description: "",
    driver_license: "",
    address: "",
    phone: "",
    mobile: "",
    liscence_no: "",
    experience: "",
    dob: "",
    blood_group: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", formData.academic_year);
      bodyFormData.append("designation", "driver");
      bodyFormData.append("driver_name", formData.driver_name);
      bodyFormData.append(
        "driver_assistant_name",
        formData.driver_assistant_name
      );
      bodyFormData.append("description", formData.description);
      bodyFormData.append("driver_license", formData.driver_license);
      bodyFormData.append("address", formData.address);
      bodyFormData.append("phone", formData.phone);
      bodyFormData.append("mobile", formData.mobile);
      bodyFormData.append("liscence_no", formData.liscence_no);
      bodyFormData.append("experience", formData.experience);
      bodyFormData.append("dob", formData.dob);
      bodyFormData.append("blood_group", formData.blood_group);
      bodyFormData.append(
        "emergency_contact_name",
        formData.emergency_contact_name
      );
      bodyFormData.append(
        "emergency_contact_relationship",
        formData.emergency_contact_relationship
      );
      bodyFormData.append(
        "emergency_contact_phone",
        formData.emergency_contact_phone
      );
      bodyFormData.append("driver_license", selectedFile);

      let resp: any = await apiPost(ADD_DRIVER, bodyFormData);
      console.log("driver datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        toast.success("Driver Details Added Succefully");
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
    setSelectedFile(null);
    setFormData({
      academic_year: "",
      designation: "",
      driver_name: "",
      driver_assistant_name: "",
      description: "",
      driver_license: "",
      address: "",
      phone: "",
      mobile: "",
      liscence_no: "",
      experience: "",
      dob: "",
      blood_group: "",
      emergency_contact_name: "",
      emergency_contact_relationship: "",
      emergency_contact_phone: "",
    });
    props.setOpen(false);
    dispatch(tryFetchDriverListData());
  };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status === 200) {
        setClassOptions(resp.response.data.data);
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
    setFormData({ ...formData, academic_year: "2022-2023" });
    getAcademicYear();
  }, []);

  return (
    <>
      {" "}
      <ToastContainer />
      <Modal
        size="lg"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header className="transportModalHeader">
            <span>Add Driver details</span>
            <button type="button" onClick={() => clearDatas()}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div>
              <DriverDetailsContainer
                academicYear={classOptions}
                formData={formData}
                setFormData={setFormData}
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-view"
              role="submit"
              // onClick={(e) => handleSubmit(e)}
            >
              <span>Add Driver</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddDriverModal;
