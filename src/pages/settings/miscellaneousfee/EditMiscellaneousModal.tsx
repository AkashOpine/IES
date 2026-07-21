import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { apiPost } from "../../../config/apiConfig";
import { ADD_MISCELLANEOUS_SETTING } from "../../../config/BaseUrl";
import { tryFetchMiscellaneousSettingList } from "../../../slices/settings/miscellaneousSettingSlice";

function EditMiscellaneousModal(props: any) {
  return (
    <Modal
      size="lg"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form onSubmit={(e) => props.handleEdit(e, props.id)}>
        <Modal.Header className="transportModalHeader">
          <span>Edit Miscellaneous fee details</span>
          <button type="button" onClick={() => props.setOpen(false)}></button>
        </Modal.Header>
        <Modal.Body className="transportFormModal">
          <div>
            <Row className="modalformBody">
              <Col md={12} className="form-inputs">
                <Row className="form-inputs-row">
                  <Col md={8} className="m-auto">
                    <input
                      type="text"
                      name="fee_head_name"
                      className="form-input"
                      placeholder="Fee Head"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.fee_head_name}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row">
                  <Col md={8} className="m-auto">
                    <input
                      type="number"
                      name="fee_amount"
                      className="form-input"
                      placeholder="Amount"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.fee_amount}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row">
                  <Col md={8} className="m-auto">
                    <textarea
                    style={{
                      height: "auto",
                      paddingTop: "10px",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                    rows={5}
                      name="remarks"
                      className="form-input"
                      placeholder="Remarks"
                      onChange={(e) => props.handle(e)}
                      value={props.editValues.remarks}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-view" role="submit">
            <span>Save</span>
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditMiscellaneousModal;
