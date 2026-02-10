import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { apiPost } from "../../../config/apiConfig";
import { ACADEMIC_YEAR, ADD_TRANSPORT_REPAIR } from "../../../config/BaseUrl";
import {
  tryFetchDriverListData,
  tryFetchTransportListData,
} from "../../../slices/transport/transportSlice";
import RepairDetailsContainer from "./RepairDetailsContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddRepairModal(props: any) {
  const dispatch = useDispatch();
  const [classOptions, setClassOptions] = useState([]);
  const [formData, setFormData] = useState({
    academic_year: "",
    date: "",
    vehicle_id: "",
    driver_id: "",
    driver_name: "",
    agency_name: "",
    service_type: "",
    amount: "0",
    tax: "0",
    total_amount: "0",
    description: "",
  });
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
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
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", formData.academic_year);
      bodyFormData.append("date", formData.date);
      bodyFormData.append("vehicle_id", props.vehicleId);
      bodyFormData.append("driver_id", formData.driver_id);
      bodyFormData.append("driver_name", formData.driver_name);
      bodyFormData.append("agency_name", formData.agency_name);
      bodyFormData.append("service_type", formData.service_type);
      bodyFormData.append("amount", formData.amount);
      bodyFormData.append("tax", formData.tax);
      bodyFormData.append("total_amount", formData.total_amount);
      bodyFormData.append("description", formData.description);

      let resp: any = await apiPost(ADD_TRANSPORT_REPAIR, bodyFormData);
      console.log("fuel datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        toast.success("Maintanence Details Added Succefully!!");
        dispatch(tryFetchTransportListData());
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
  useEffect(() => {
    setFormData({ ...formData, academic_year: "2023-2024" });
    getAcademicYear();
    dispatch(tryFetchDriverListData());
  }, []);

  const clearDatas = () => {
    setFormData({
      academic_year: "",
      date: "",
      vehicle_id: "",
      driver_id: "",
      driver_name: "",
      agency_name: "",
      service_type: "",
      amount: "0",
      tax: "0",
      total_amount: "0",
      description: "",
    });
    props.setOpen(false);
  };
  return (
    <>
      <ToastContainer />
      <Modal
        size="lg"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header className="transportModalHeader">
            <span>Add Repair Details</span>
            <button type="button" onClick={clearDatas}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div>
              <RepairDetailsContainer
                academicYear={classOptions}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn-view">
              <span>Add Repair</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddRepairModal;
