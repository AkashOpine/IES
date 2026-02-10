import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_TRANSPORT_REPAIR,
  REPAIR_BY_ID,
} from "../../../config/BaseUrl";
import { tryFetchDriverListData } from "../../../slices/transport/transportSlice";

function EditRepairModal(props: any) {
  const dispatch = useDispatch();

  const driverList: any = useSelector((state: any) => state.transport);

  const academicYearOptions = props.classOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const driverListOptions = driverList.driverListData?.map((items: any) => {
    return {
      label: items.driver_name,
      value: items.id,
    };
  });

  useEffect(() => {
    dispatch(tryFetchDriverListData());
  }, []);

  return (
    <Modal
      size="lg"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form>
        <Modal.Header className="transportModalHeader">
          <span>Edit Repair</span>
          <button type="button" onClick={() => props.setOpen(false)}></button>
        </Modal.Header>
        <Modal.Body className="transportFormModal">
          <div>
            <Row className="modalformBody">
              <Col md={12} className="form-inputs">
                <Row className="form-inputs-row">
                  <Col md={6}>
                    <label htmlFor="">Academic year</label>
                    <Select
                      options={academicYearOptions}
                      placeholder="Academic Year"
                      styles={customStyles}
                      onChange={(e) => props.handleChangeYear(e)}
                      name="academic_year"
                      defaultValue={academicYearOptions.filter(
                        (item: any) =>
                          item.value == props.editValues.academic_year
                      )}
                      //   defaultValue={editValues.academic_year}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      name="date"
                      value={props.editValues.date}
                      onChange={(e) => props.handle(e)}
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={editValues.academic_year}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row ">
                  <Col md={6}>
                    <label htmlFor="">Driver</label>
                    <Select
                      options={driverListOptions}
                      placeholder="Select Driver"
                      styles={customStyles}
                      name="driver_name"
                      defaultValue={driverListOptions.filter(
                        (item: any) =>
                          item.label == props.editValues?.driver_name
                      )}
                      onChange={(e) => props.handleChangeDriver(e)}
                      required
                      //   defaultValue={props.editValues.academic_year}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Agency Name</label>
                    <input
                      type="text"
                      className="form-input"
                      name="agency_name"
                      placeholder="Agency name"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.agency_name}
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={props.editValues.academic_year}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row ">
                  <Col md={6}>
                    <label htmlFor="">Service Type</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Service Type"
                      name="service_type"
                      value={props.editValues.service_type}
                      onChange={(e) => props.handle(e)}
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={props.editValues.academic_year}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Amount</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Amount"
                      name="amount"
                      value={props.editValues.amount}
                      onChange={(e) =>
                        props.seteditValues({
                          ...props.editValues,
                          amount: e.target.value,
                          total_amount:
                            parseInt(e.target.value) +
                            parseInt(props.editValues.tax),
                        })
                      }
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={props.editValues.academic_year}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row ">
                  <Col md={6}>
                    <label htmlFor="">Tax</label>
                    <input
                      type="number"
                      name="tax"
                      value={props.editValues.tax}
                      className="form-input"
                      placeholder="Tax"
                      onChange={(e) =>
                        props.seteditValues({
                          ...props.editValues,
                          tax: e.target.value,
                          total_amount:
                            parseInt(e.target.value) +
                            parseInt(props.editValues.amount),
                        })
                      }
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={props.editValues.academic_year}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Total Amount</label>
                    <input
                      type="number"
                      className="form-input"
                      name="total_amount"
                      value={props.editValues.total_amount}
                      placeholder="Total Amount"
                      // onChange={(e) => props.handle(e)}
                      // required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={props.editValues.academic_year}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row ">
                  <Col md={12}>
                    <label htmlFor="">Description</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Enter description"
                      name="description"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.description}
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-view"
            type="button"
            onClick={(e) => props.handleEdit(e, props.id)}
          >
            <span>Update</span>
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditRepairModal;
