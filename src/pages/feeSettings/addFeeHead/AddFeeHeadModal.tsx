import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Modal, Row } from "react-bootstrap";
import { ADD_FEE_HEAD, EDIT_FEE_HEAD } from "../../../config/BaseUrl";
import { apiPost } from "../../../config/apiConfig";
import axios from "axios";

function AddFeeHeadModal(props: any) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fee_head: "",
  });
  const clearDatas = () => {
    setFormData({
      fee_head: "",
    });
    props.setOpen(false);
  };

  useEffect(() => {
    if (props.editValues) {
      setFormData({ fee_head: props.editValues.feehead_name });
    } else {
      setFormData({
        fee_head: "",
      });
    }
  }, [props]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (props.editValues) {
      handleEdit();
      console.log("thiss");
    } else {
      handleAdd();
      console.log("that");
    }
  }
  async function handleAdd() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("feehead_name", formData.fee_head);

      let resp: any = await apiPost(ADD_FEE_HEAD, bodyFormData);

      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        props.refreshList();
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
  async function handleEdit() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("feehead_name", formData.fee_head);
      bodyFormData.append("feehead_id", props.editValues?.feehead_id);

      let resp: any = await apiPost(EDIT_FEE_HEAD, bodyFormData);
      console.log("DELETE setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        props.refreshList();
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

  return (
    <Modal
      size="lg"
      show={props.modalOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="transportModal"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header className="transportModalHeader">
          <span>Add Fee Head </span>
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
export default AddFeeHeadModal;
