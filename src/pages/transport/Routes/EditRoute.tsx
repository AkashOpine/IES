import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_MISCELLANEOUS_SETTING,
} from "../../../config/BaseUrl";
import { tryFetchMiscellaneousSettingList } from "../../../slices/settings/miscellaneousSettingSlice";

function EditRouteModal(props: any) {
  // const [academicYear, setAcademicYear] = useState("");
  const academicYearOptions = props.classOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });

  // useEffect(() => {
  //   console.log("academic year", props.editValues.academic_year);
  //   setAcademicYear(props.editValues.academic_year);
  // }, [props.editValues]);

  return (
    <Modal
      size="lg"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form>
        <Modal.Header className="transportModalHeader">
          <span>Edit Route</span>
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
                      onChange={(e) => props.handleYear(e)}
                      defaultValue={academicYearOptions?.filter(
                        (item: any) => item.value === "2022-2023"
                      )}
                    />
                  </Col>

                  <Col md={6}>
                    <label htmlFor="">Route</label>
                    <input
                      type="text"
                      name="route"
                      className="form-input"
                      placeholder="Route"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.route}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row">
                  <Col md={6}>
                    <label htmlFor="">Description</label>
                    <input
                      type="text"
                      name="description"
                      className="form-input"
                      placeholder="Description"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.description}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Bus.No</label>
                    <input
                      type="text"
                      name="bus_no"
                      className="form-input"
                      placeholder="Bus Number"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.bus_no}
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
            <span>Save</span>
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditRouteModal;
