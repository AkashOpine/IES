import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../../../components/inputComponent/SelectStyle";
import { tryFetchDriverListData } from "../../../../slices/transport/transportSlice";

function EditPickupPoint(props: any) {
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
    console.log("edit pickup modal", props.editValues);
  }, [props.editValues]);

  return (
    <Modal
      size="xl"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form>
        <Modal.Header className="transportModalHeader">
          <span>Edit Pickup Point</span>
          <button type="button" onClick={() => props.setOpen(false)}></button>
        </Modal.Header>
        <Modal.Body className="transportFormModal">
          <div>
            <Row className="modalformBody ">
              <Col md={12} className="form-inputs">
                <Row className="form-inputs-row">
                  <Col md={6}>
                    <label htmlFor="">Academic year</label>
                    <Select
                      options={academicYearOptions}
                      placeholder="Academic Year"
                      styles={customStyles}
                      onChange={(e) => props.handleChangeYear(e)}
                      defaultValue={academicYearOptions.filter(
                        (item: any) => item.value === "2022-2023"
                      )}
                      //   defaultValue={formData.academic_year}
                      required
                    />
                  </Col>
                </Row>

                <Row className="form-inputs-row ">
                  <Col md={3}>
                    <label htmlFor="">Pickup Point</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter Pickup Point"
                      name="pick_up_point"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.pick_up_point}
                      required
                      // defaultValue={academicYearOptions.filter(
                      //   (item: any) => item.value === "2022-2023"
                      // )}
                      //   defaultValue={formData.academic_year}
                    />
                  </Col>
                  <Col md={3}>
                    <label htmlFor="">Pickup Fee</label>
                    <input
                      type="number"
                      name="pick_up_fee"
                      className="form-input"
                      placeholder="Enter Pickup Fee"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.pick_up_fee}
                      required
                    />
                  </Col>
                  <Col md={3}>
                    <label htmlFor="">Pickup Time</label>
                    <input
                      type="time"
                      className="form-input"
                      name="pick_up_time"
                      placeholder="Enter Pickup Fee"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.pick_up_time}
                      required
                    />
                  </Col>{" "}
                  <Col md={3}>
                    <label htmlFor="">Drop Time</label>
                    <input
                      type="time"
                      className="form-input"
                      name="drop_time"
                      placeholder="Enter Pickup Fee"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.drop_time}
                      required
                    />
                  </Col>
                  <Col md={10}>
                    <label htmlFor="">Description</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Description"
                      name="description"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.description}
                      // onChange={(e: any) => {
                      //   setFormData({ ...formData, description: e.value });
                      // }}
                      // required
                    />
                  </Col>
                </Row>
              </Col>
              <Row className="form-inputs-row"></Row>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-view"
            type="submit"
            onClick={(e) => props.handleEdit(e)}
          >
            <span>Update</span>
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditPickupPoint;
