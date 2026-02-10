import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { customStyles } from "../../../../components/inputComponent/SelectStyle";
import { apiPost } from "../../../../config/apiConfig";
import { ACADEMIC_YEAR, UPDATE_DRIVER } from "../../../../config/BaseUrl";
import { tryFetchDriverProfileData } from "../../../../slices/transport/transportSlice";

function EditDriverDetails({ isModalOpen, setIsModalOpen }: any) {
  const datas = useSelector((state: any) => state.transport.driverProfileData);
  const dispatch = useDispatch();
  const [academicYear, setAcademicYear] = useState([]);
  const [editValues, setEditValues]: any = useState({
    academic_year: "",
    driver_name: "",
    driver_assistant_name: "",
    description: "",
    address: "",
    phone: "",
    mobile: "",
    dob: "",
    blood_group: "",
    experience: "",
    liscence_no: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    driver_doc_path: "",
  });

  const clearDatas = () => {
    setIsModalOpen(false);
  };
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", editValues?.academic_year);
      bodyFormData.append("driver_name", editValues?.driver_name);
      bodyFormData.append(
        "driver_assistant_name",
        editValues?.driver_assistant_name
      );
      bodyFormData.append("description", editValues?.description);
      bodyFormData.append("address", editValues?.address);
      bodyFormData.append("phone", editValues?.phone);
      bodyFormData.append("mobile", editValues?.mobile);
      bodyFormData.append("dob", editValues?.dob);
      bodyFormData.append("blood_group", editValues?.blood_group);
      bodyFormData.append("experience", editValues?.experience);
      bodyFormData.append("liscence_no", editValues?.liscence_no);
      bodyFormData.append(
        "emergency_contact_name",
        editValues?.emergency_contact_name
      );
      bodyFormData.append(
        "emergency_contact_relationship",
        editValues?.emergency_contact_relationship
      );
      bodyFormData.append(
        "emergency_contact_phone",
        editValues?.emergency_contact_phone
      );
      bodyFormData.append("edit_driver", datas.id);
      //   bodyFormData.append("documents", transportData.addTransportDocuments);
      let resp: any = await apiPost(UPDATE_DRIVER, bodyFormData);

      if (resp.response.data.status == 200) {
        clearDatas();
        dispatch(tryFetchDriverProfileData(datas.id));
        toast.success("Driver Details Updated Succefully");
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
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
        setAcademicYear(resp.response.data.data);
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
  const academicYearOptions = academicYear?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  useEffect(() => {
    getAcademicYear();
  }, [datas]);
  useEffect(() => {
    console.log("datas driver", datas);

    setEditValues(datas);
  }, [isModalOpen === true, datas]);

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
            <span>Edit driver details</span>
            <button type="button" onClick={clearDatas}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div>
              <Row className="modalformBody">
                <Col md={12} className="form-inputs">
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Academic Year</label>
                      <Select
                        options={academicYearOptions}
                        placeholder="Academic Year"
                        styles={customStyles}
                        name="academic_year"
                        onChange={(e: any) => {
                          setEditValues({
                            ...editValues,
                            academic_year: e.value,
                          });
                        }}
                        defaultValue={academicYearOptions.filter(
                          (item: any) => item.value === "2022-2023"
                        )}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Driver</label>
                      <input
                        type="text"
                        name="driver_name"
                        className="form-input"
                        placeholder="Driver Name"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            driver_name: e.target.value,
                          });
                        }}
                        value={editValues?.driver_name}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Assistant Name</label>
                      <input
                        type="text"
                        name="driver_assistant_name"
                        className="form-input"
                        placeholder="Assistant Name"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            driver_assistant_name: e.target.value,
                          });
                        }}
                        value={editValues?.driver_assistant_name}
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
                      <label htmlFor="">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-input"
                        placeholder="Address"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            address: e.target.value,
                          });
                        }}
                        value={editValues?.address}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-input"
                        placeholder="Phone"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            phone: e.target.value,
                          });
                        }}
                        value={editValues?.phone}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Mobile</label>
                      <input
                        type="text"
                        name="mobile"
                        className="form-input"
                        placeholder="Mobile"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            mobile: e.target.value,
                          });
                        }}
                        value={editValues?.mobile}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">DOB</label>
                      <input
                        type="date"
                        name="dob"
                        className="form-input"
                        placeholder="DOB"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            dob: e.target.value,
                          });
                        }}
                        value={editValues?.dob}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Blood Group</label>
                      <input
                        type="text"
                        name="blood_group"
                        className="form-input"
                        placeholder="Blood Group"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            blood_group: e.target.value,
                          });
                        }}
                        value={editValues?.blood_group}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Experience</label>
                      <input
                        type="text"
                        name="experience"
                        className="form-input"
                        placeholder="Experience"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            experience: e.target.value,
                          });
                        }}
                        value={editValues?.experience}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">License N0.</label>
                      <input
                        type="text"
                        name="liscence_no"
                        className="form-input"
                        placeholder="License No."
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            liscence_no: e.target.value,
                          });
                        }}
                        value={editValues?.liscence_no}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Emergency Contact Name</label>
                      <input
                        type="text"
                        name="emergency_contact_name"
                        className="form-input"
                        placeholder="Emergency Contact Name"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            emergency_contact_name: e.target.value,
                          });
                        }}
                        value={editValues?.emergency_contact_name}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Emergency Contact Relationship</label>
                      <input
                        type="text"
                        name="emergency_contact_relationship"
                        className="form-input"
                        placeholder="Emergency Contact Relationship"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            emergency_contact_relationship: e.target.value,
                          });
                        }}
                        value={editValues?.emergency_contact_relationship}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Emergency Contact Number</label>
                      <input
                        type="text"
                        name="emergency_contact_phone"
                        className="form-input"
                        placeholder="Emergency Contact Number"
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            emergency_contact_phone: e.target.value,
                          });
                        }}
                        value={editValues?.emergency_contact_phone}
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

export default EditDriverDetails;
