import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../../config/apiConfig";
import { ACADEMIC_YEAR, ADD_PICKUP_POINT } from "../../../../config/BaseUrl";
import {
  clearPickupPoint,
  tryFetchPickupPointListData,
} from "../../../../slices/transport/transportSlice";
import PickupPointDetailsContainer from "./PickupPointDetailsContainer";
function AddPickupPointModal(props: any) {
  const dispatch = useDispatch();
  const transportData: any = useSelector((state: any) => state.transport);
  // console.log("Pickuppointlist", transportData.pickupPointDetails);
  const [classOptions, setClassOptions] = useState([]);
  const [formData, setFormData] = useState({
    academic_year: "",
    route_id: "",
    pick_up_point: "",
    pick_up_fee: "",
    pick_up_time: "",
    drop_time: "",
    description: "",
  });
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      // console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status === 200) {
        setClassOptions(resp.response.data.data);
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
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      console.log("pickup data  ", transportData.pickupPointDetails);
      var body = {
        Authorization: token,
        academic_year: formData.academic_year,
        route_id: transportData.routeId,
        pick_up_points: transportData.pickupPointDetails,
        edit_pickup: "0",
      };
      let resp: any = await apiPost(ADD_PICKUP_POINT, body);
      console.log("pickup point datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        toast.success("Pickup Point Details Added Succefully");
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
  useEffect(() => {
    // setFormData({ ...formData, academic_year: "2023-2024" });
    getAcademicYear();
  }, []);
  const clearDatas = () => {
    setFormData({
      academic_year: "",
      route_id: "",
      pick_up_point: "",
      pick_up_fee: "",
      pick_up_time: "",
      drop_time: "",
      description: "",
    });
    props.setOpen(false);
    dispatch(clearPickupPoint());
    var data = {
      year: transportData.academicYear,
      route: transportData.routeId,
    };
    dispatch(tryFetchPickupPointListData(data));
  };
  return (
    <>
      <ToastContainer />

      <Modal
        size="xl"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header className="transportModalHeader">
            <span>Add Pickup Point</span>
            <button type="button" onClick={clearDatas}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div>
              <PickupPointDetailsContainer
                academicYear={classOptions}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-view"
              role="button"
              // onClick={(e) => handleSubmit(e)}
            >
              <span>Add Pickup Point</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddPickupPointModal;
