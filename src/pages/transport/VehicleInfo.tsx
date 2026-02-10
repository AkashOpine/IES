import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Select, { OptionsOrGroups } from "react-select";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import { apiPost } from "../../config/apiConfig";
import {
  FUEL_TYPE_LIST,
  VEHICLE_CATEGORY_LIST,
  VEHICLE_TYPE_LIST,
  VEHICLE_USAGE_TYPE_LIST,
} from "../../config/BaseUrl";
function VehicleInfo({
  formData,
  setFormData,
  selectedFile,
  setSelectedFile,
}: any) {
  const [vehicleFuelType, setVehicleFuelType] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [vehicleCategory, setVehicleCategory] = useState([]);
  const [vehicleUsageType, setVehicleUsageType] = useState([]);

  async function getFuelType() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(FUEL_TYPE_LIST, bodyFormData);
      console.log("fuel data is ", resp);
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
  useEffect(() => {
    getFuelType();
    getVehicleType();
    getVehicleCategoryType();
    getVehicleUsageType();
  }, []);
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
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <Row className="modalformBody">
      <Col md={12} className="form-inputs">
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Vehicle Number"
              value={formData.vehicleNo}
              onChange={(e) => {
                setFormData({ ...formData, vehicleNo: e.target.value });
              }}
              required
            />
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <select
              className="form-input"
              placeholder="Fuel Type"
              onChange={(e) => {
                setFormData({ ...formData, fuelType: e.target.value });
              }}
              value={formData.fuelType}
            >
              <option value="" disabled>
                Fuel Type
              </option>

              {vehicleFuelType.map((fuel: any) => (
                <option value={fuel.id}>{fuel.description}</option>
              ))}
            </select>
          </Col>
          <Col md={6}>
            <select
              className="form-input"
              placeholder="Vehicle Type"
              onChange={(e) => {
                setFormData({ ...formData, vehicleType: e.target.value });
              }}
              value={formData.vehicleType}
            >
              <option value="" disabled>
                Vehicle Type
              </option>

              {vehicleType.map((vehichle: any) => (
                <option value={vehichle.id}>{vehichle.vehicle_type}</option>
              ))}
            </select>
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <select
              className="form-input"
              placeholder="Category"
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
              value={formData.category}
            >
              <option value="" disabled>
                Vehicle category
              </option>

              {vehicleCategory.map((category: any) => (
                <option value={category.id}>{category.vehicle_category}</option>
              ))}
            </select>
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Register Number"
              onChange={(e) => {
                setFormData({ ...formData, registerNumber: e.target.value });
              }}
              value={formData.registerNumber}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <select
              className="form-input"
              placeholder="Vehicle Type"
              onChange={(e) => {
                setFormData({ ...formData, typeOfUse: e.target.value });
              }}
              value={formData.typeOfUse}
            >
              <option value="" disabled>
                Type of Usage
              </option>

              {vehicleUsageType.map((usage: any) => (
                <option value={usage.id}>{usage.vehicle_usage_type}</option>
              ))}
            </select>
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-input"
              placeholder="Ownership"
              onChange={(e) => {
                setFormData({ ...formData, ownership: e.target.value });
              }}
              value={formData.ownership}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row">
          <Col md={6}>
            <input
              type="file"
              className="form-input-file"
              onChange={handleFileSelect}
              style={{
                color: selectedFile === null ? "transparent" : "",
                textAlign: "left",
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default VehicleInfo;
