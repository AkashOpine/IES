import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../../components/inputComponent/SelectStyle";

import { tryFetchDriverListData } from "../../../slices/transport/transportSlice";

function EditFuel(props: any) {
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
    console.log("editrefuelmodal", props.editValues);
  }, [props.editValues]);

  return (
    <Modal
      size="lg"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form>
        <Modal.Header className="transportModalHeader">
          <span>Edit Fuel</span>
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
                      name="academic_year"
                      onChange={(e) => props.handleChangeYear(e)}
                      defaultValue={academicYearOptions.filter(
                        (item: any) => item.value === "2022-2023"
                      )}
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      name="date"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.date}
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row ">
                  <Col md={6}>
                    <label htmlFor="">Drivers</label>
                    <Select
                      options={driverListOptions}
                      placeholder="Select Driver"
                      styles={customStyles}
                      onChange={(e) => props.handleChangeDriver(e)}
                      defaultValue={driverListOptions.filter(
                        (item: any) =>
                          item.label == props.editValues.driver_name
                      )}
                      name="driver_name"
                      required
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Agency Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Agency name"
                      onChange={(e) => props.handle(e)}
                      name="agency_name"
                      value={props.editValues.agency_name}
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row ">
                  <Col md={6}>
                    <label htmlFor="">Fuel Quantity</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Fuel qty"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.fuel_qty}
                      name="fuel_qty"
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Amount</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Amount"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.amount}
                      name="amount"
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row ">
                  <Col md={6}>
                    <label htmlFor="">Meter Reading</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Meter reading"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.meter_reading}
                      name="meter_reading"
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

export default EditFuel;
