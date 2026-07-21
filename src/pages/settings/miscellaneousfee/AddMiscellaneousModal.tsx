import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { apiPost } from "../../../config/apiConfig";
import { ADD_MISCELLANEOUS_SETTING } from "../../../config/BaseUrl";
import { tryFetchMiscellaneousSettingList } from "../../../slices/settings/miscellaneousSettingSlice";

function AddMiscellaneousModal(props: any) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fee_head: "",
    amount: "",
    remark: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("fee_head_name", formData.fee_head);
      bodyFormData.append("fee_amount", formData.amount);
      bodyFormData.append("remarks", formData.remark);
      let resp: any = await apiPost(ADD_MISCELLANEOUS_SETTING, bodyFormData);
      console.log("miscellaneous datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
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
  const clearDatas = () => {
    setFormData({
      fee_head: "",
      amount: "",
      remark: "",
    });
    props.setOpen(false);
    dispatch(tryFetchMiscellaneousSettingList());
  };

  return (
    <Modal
      size="lg"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header className="transportModalHeader">
          <span>Add Miscellaneous fee details</span>
          <button type="button" onClick={() => clearDatas()}></button>
        </Modal.Header>
        <Modal.Body className="transportFormModal">
          <div>
            <Row className="modalformBody">
              <Col md={12} className="form-inputs">
                <Row className="form-inputs-row">
                  <Col md={8} className="m-auto">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Fee Head"
                      value={formData.fee_head}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          fee_head: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-inputs-row">
                  <Col md={8} className="m-auto">
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Amount"
                      onChange={(e) => {
                        setFormData({ ...formData, amount: e.target.value });
                      }}
                      value={formData.amount}
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
                      className="form-input"
                      placeholder="Remarks"
                      onChange={(e) => {
                        setFormData({ ...formData, remark: e.target.value });
                      }}
                      value={formData.remark}
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

export default AddMiscellaneousModal;
