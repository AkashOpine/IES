import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../config/apiConfig";
import { ACADEMIC_YEAR, ADD_TRANSPORT_FUEL } from "../../../config/BaseUrl";
import {
  tryFetchDriverListData,
  tryFetchTransportListData,
} from "../../../slices/transport/transportSlice";
import FuelDetailsContainer from "./FuelDetailsContainer";

function AddFuelModal(props: any) {
  const dispatch = useDispatch();
  const [classOptions, setClassOptions] = useState([]);
  const [formData, setFormData] = useState({
    academic_year: "",
    date: "",
    driver_id: "",
    driver_name: "",
    agency_name: "",
    fuel_qty: "",
    amount: "",
    meter_reading: "",
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
      bodyFormData.append("fuel_qty", formData.fuel_qty);
      bodyFormData.append("amount", formData.amount);
      bodyFormData.append("meter_reading", formData.meter_reading);

      let resp: any = await apiPost(ADD_TRANSPORT_FUEL, bodyFormData);
      console.log("fuel datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        toast.success("Fuel Details Added Succefully");
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
      driver_id: "",
      driver_name: "",
      agency_name: "",
      fuel_qty: "",
      amount: "",
      meter_reading: "",
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
            <span>Add Fuel Details</span>
            <button type="button" onClick={clearDatas}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div>
              <FuelDetailsContainer
                academicYear={classOptions}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-view"
              // onClick={(e) => handleSubmit(e)}
            >
              <span>Add Fuel</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddFuelModal;
