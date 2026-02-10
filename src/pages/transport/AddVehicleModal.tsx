import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { FaFileContract, FaTruckMoving } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../config/apiConfig";
import { ADD_VEHICLE } from "../../config/BaseUrl";
import {
  clearDocumentDetails,
  setDefaultDocument,
  tryFetchTransportListData,
} from "../../slices/transport/transportSlice";
import DocumentInfo from "./DocumentInfo";
import VehicleInfo from "./VehicleInfo";

function AddVehicleModal(props: any) {
  const transportData: any = useSelector((state: any) => state.transport);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [selectedFile, setSelectedFile]: any = React.useState(null);
  const [formData, setFormData] = useState({
    vehicleNo: "",
    description: "",
    fuelType: "",
    vehicleType: "",
    category: "",
    registerNumber: "",
    typeOfUse: "",
    ownership: "",
  });
  const FormTitles = [
    {
      icon: <FaTruckMoving size={20} />,
      title: "Vehicle Details",
    },
    {
      icon: <FaFileContract size={20} />,
      title: "Documents",
    },
  ];
  const formDisplay: any = () => {
    if (page === 0) {
      return (
        <VehicleInfo
          formData={formData}
          setFormData={setFormData}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
      );
    } else {
      return <DocumentInfo />;
    }
  };
  const handleNext = (e: any) => {
    e.preventDefault();
    if (page !== FormTitles.length - 1) {
      setPage((currPage) => currPage + 1);
    }
    if (page === FormTitles.length - 1) {
      handleSubmit(e);
    }
  };
  const handlePrev = () => {
    setPage((currPage) => currPage - 1);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", "2022-2023");
      bodyFormData.append("vehicle_type_id", formData.vehicleType);
      bodyFormData.append("vehicle_reg_no", formData.registerNumber);
      bodyFormData.append("vehicle_no", formData.vehicleNo);
      bodyFormData.append("description", formData.description);
      bodyFormData.append("vehicle_photo", selectedFile);
      bodyFormData.append("type", "");
      bodyFormData.append("vehicle_category", formData.category);
      bodyFormData.append("fuel_type", formData.fuelType);
      bodyFormData.append("type_of_use", formData.typeOfUse);
      bodyFormData.append("ownership", formData.ownership);
      bodyFormData.append("documents", transportData.addTransportDocuments);
      // var body = {
      //   Authorization: token,
      //   academic_year: "2022-2023",
      //   vehicle_type_id: formData.vehicleType,
      //   vehicle_reg_no: formData.registerNumber,
      //   vehicle_no: formData.vehicleNo,
      //   description: formData.description,
      //   vehicle_photo: selectedFile,
      //   type: "",
      //   vehicle_category: formData.category,
      //   fuel_type: formData.fuelType,
      //   type_of_use: formData.typeOfUse,
      //   ownership: formData.ownership,
      //   documents: transportData.addTransportDocuments,
      // };
      // console.log("bodyFormData ", body);
      let resp: any = await apiPost(ADD_VEHICLE, bodyFormData);
      console.log("vehicle data is ", resp);
      if (resp.response.data.status == 200) {
        clearDatas();
        dispatch(tryFetchTransportListData());
        toast.success("Vehicle Details Added Succefully");
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
  function clearDatas() {
    setFormData({
      vehicleNo: "",
      description: "",
      fuelType: "",
      vehicleType: "",
      category: "",
      registerNumber: "",
      typeOfUse: "",
      ownership: "",
    });
    dispatch(clearDocumentDetails());
    setPage(0);
    props.setOpen(false);
  }

  return (
    <>
      <ToastContainer />

      <Modal
        size="lg"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={handleNext}>
          <Modal.Header className="transportModalHeader">
            <span>Add vehicle details</span>
            <button type="button" onClick={() => clearDatas()}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div className="formTracker">
              {FormTitles.map((items, index) => {
                return (
                  <div
                    key={index - 1}
                    className={
                      page === index
                        ? "transportModalFormPage active"
                        : "transportModalFormPage"
                    }
                  >
                    {items.icon}
                    <span>{items.title}</span>
                  </div>
                );
              })}
            </div>
            <hr className="hr" />
            <div>{formDisplay()}</div>
          </Modal.Body>
          <Modal.Footer>
            {page !== 0 ? (
              <span
                className="button-70 updateBtn"
                onClick={() => handlePrev()}
              >
                <span>Previous</span>
              </span>
            ) : (
              ""
            )}
            <button
              className="button-70 cancelBtn"
              // role="submit"
              // onClick={handleNext}
            >
              <span>{page === FormTitles.length - 1 ? "Finish" : "Next"}</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddVehicleModal;
