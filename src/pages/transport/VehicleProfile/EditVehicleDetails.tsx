import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { apiPost } from "../../../config/apiConfig";
import {
  FUEL_TYPE_LIST,
  VEHICLE_CATEGORY_LIST,
  VEHICLE_PROFILE_EDIT,
  VEHICLE_TYPE_LIST,
  VEHICLE_USAGE_TYPE_LIST,
} from "../../../config/BaseUrl";
import { tryFetchVehicleProfileData } from "../../../slices/transport/transportSlice";
function EditVehicleDetails({ isModalOpen, setIsModalOpen }: any) {
  const datas = useSelector((state: any) => state.transport.vehicleProfileData);
  const dispatch = useDispatch();
  const [editValues, setEditValues]: any = useState({
    vehicle_no: "",
    description: "",
    fuel_type: "",
    vehicle_type_id: "",
    vehicle_category: "",
    vehicle_reg_no: "",
    type_of_use: "",
    ownership: "",
  });
  const [vehicleFuelType, setVehicleFuelType] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [vehicleCategory, setVehicleCategory] = useState([]);
  const [vehicleUsageType, setVehicleUsageType] = useState([]);
  async function getVehicleType() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(VEHICLE_TYPE_LIST, bodyFormData);
      console.log("vehicle type is ", resp);
      if (resp.response.data.status == 200) {
        setVehicleType(resp.response.data.data);
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
  async function getFuelType() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(FUEL_TYPE_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setVehicleFuelType(resp.response.data.data);
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
  async function getVehicleCategoryType() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(VEHICLE_CATEGORY_LIST, bodyFormData);
      console.log("vehicle category is ", resp);
      if (resp.response.data.status == 200) {
        setVehicleCategory(resp.response.data.data);
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
  async function getVehicleUsageType() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(VEHICLE_USAGE_TYPE_LIST, bodyFormData);
      console.log("usage type is ", resp);
      if (resp.response.data.status == 200) {
        setVehicleUsageType(resp.response.data.data);
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
    setIsModalOpen(false);
  };
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", "2022-2023");
      bodyFormData.append("vehicle_type_id", editValues?.vehicle_type_id);
      bodyFormData.append("vehicle_reg_no", editValues?.vehicle_reg_no);
      bodyFormData.append("vehicle_no", editValues?.vehicle_no);
      bodyFormData.append("description", editValues?.description);
      //   bodyFormData.append("vehicle_photo", "");
      //   bodyFormData.append("type", "");
      bodyFormData.append("vehicle_category", editValues?.vehicle_category);
      bodyFormData.append("fuel_type", editValues?.fuel_type);
      bodyFormData.append("type_of_use", editValues?.type_of_use);
      bodyFormData.append("ownership", editValues?.ownership);
      bodyFormData.append("edit_vehicle", datas.id);
      //   bodyFormData.append("documents", transportData.addTransportDocuments);
      let resp: any = await apiPost(VEHICLE_PROFILE_EDIT, bodyFormData);

      if (resp.response.data.status == 200) {
        clearDatas();
        dispatch(tryFetchVehicleProfileData(datas.id));
        toast.success("Vehicle details updated succefully");
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
    console.log("datas vehuicle", datas);

    setEditValues(datas);
  }, [isModalOpen === true, datas]);
  useEffect(() => {
    getFuelType();
    getVehicleType();
    getVehicleCategoryType();
    getVehicleUsageType();
  }, [datas]);
  const fuelTypeOptions = vehicleFuelType?.map((items: any) => {
    return {
      label: items.vehicle_fuel_type,
      value: items.id,
    };
  });
  const vehicleTypeOptions = vehicleType?.map((items: any) => {
    return {
      label: items.vehicle_type,
      value: items.id,
    };
  });
  const vehicleCategoryOptions = vehicleCategory?.map((items: any) => {
    return {
      label: items.vehicle_category,
      value: items.id,
    };
  });
  const vehicleUsageTypeOptions = vehicleUsageType?.map((items: any) => {
    return {
      label: items.vehicle_usage_type,
      value: items.id,
    };
  });

  return (
    <>
      <ToastContainer />

      <Modal
        size="lg"
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header className="transportModalHeader">
            <span>Edit vehicle details</span>
            <button type="button" onClick={clearDatas}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div>
              <Row className="modalformBody">
                <Col md={12} className="form-inputs">
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Vehicle Number</label>
                      <input
                        type="text"
                        name="vehicle_no"
                        className="form-input"
                        placeholder="Vehicle Number"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            vehicle_no: e.target.value,
                          });
                        }}
                        value={editValues?.vehicle_no}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Description</label>
                      <input
                        type="text"
                        name="description"
                        className="form-input"
                        placeholder="Description"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            description: e.target.value,
                          });
                        }}
                        value={editValues?.description}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Fuel Type</label>
                      <Select
                        options={fuelTypeOptions}
                        placeholder="Fuel Type"
                        styles={customStyles}
                        name="fuel_type"
                        onChange={(e: any) => {
                          setEditValues({
                            ...editValues,
                            fuel_type: e.value,
                          });
                        }}
                        defaultValue={fuelTypeOptions.filter(
                          (item: any) => item.value === editValues?.fuel_type
                        )}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Vehicle Type</label>
                      <Select
                        options={vehicleTypeOptions}
                        placeholder="Vehicle Type"
                        styles={customStyles}
                        name="vehicle_type_id"
                        onChange={(e: any) => {
                          setEditValues({
                            ...editValues,
                            vehicle_type_id: e.value,
                          });
                        }}
                        defaultValue={vehicleTypeOptions?.filter(
                          (item: any) =>
                            item.value === editValues?.vehicle_type_id
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Category</label>
                      <Select
                        options={vehicleCategoryOptions}
                        placeholder="Category"
                        styles={customStyles}
                        name="vehicle_category"
                        onChange={(e: any) => {
                          setEditValues({
                            ...editValues,
                            vehicle_category: e.value,
                          });
                        }}
                        defaultValue={vehicleCategoryOptions?.filter(
                          (item: any) =>
                            item.value === editValues?.vehicle_category
                        )}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Register Number</label>
                      <input
                        type="text"
                        name="vehicle_reg_no"
                        className="form-input"
                        placeholder="Register Number"
                        onChange={(e: any) => {
                          setEditValues({
                            ...editValues,
                            vehicle_reg_no: e.target.value,
                          });
                        }}
                        value={editValues?.vehicle_reg_no}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Type of use</label>
                      <Select
                        options={vehicleUsageTypeOptions}
                        placeholder="Type of use"
                        styles={customStyles}
                        name="type_of_use"
                        onChange={(e: any) => {
                          setEditValues({
                            ...editValues,
                            type_of_use: e.value,
                          });
                        }}
                        defaultValue={vehicleUsageTypeOptions?.filter(
                          (item: any) => item.value === editValues?.type_of_use
                        )}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Ownership</label>
                      <input
                        type="text"
                        name="ownership"
                        className="form-input"
                        placeholder="Ownership"
                        onChange={(e: any) => {
                          setEditValues({
                            ...editValues,
                            ownership: e.target.value,
                          });
                        }}
                        value={editValues?.ownership}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <span
              className="button-70 updateBtn"
              onClick={() => setIsModalOpen(false)}
            >
              <span>Cancel</span>
            </span>

            <button className="button-70 cancelBtn">
              <span>Update</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditVehicleDetails;
