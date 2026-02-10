import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../../config/apiConfig";
import { ACADEMIC_YEAR, ADD_ROUTE } from "../../../../config/BaseUrl";
import { tryFetchRouteListData } from "../../../../slices/transport/transportSlice";
import RoutesDetailsContainer from "./RouteDetailsContainer";
function AddRouteModal(props: any) {
  const dispatch = useDispatch();

  const [classOptions, setClassOptions] = useState([]);
  const [formData, setFormData] = useState({
    academic_year: "",
    route: "",
    description: "",
    bus_no: "",
  });
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      // console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
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
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", formData.academic_year);
      bodyFormData.append("route", formData.route);
      bodyFormData.append("description", formData.description);
      bodyFormData.append("bus_no", formData.bus_no);
      let resp: any = await apiPost(ADD_ROUTE, bodyFormData);
      console.log("fuel datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        toast.success("Route Added Succefully");
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
    setFormData({ ...formData, academic_year: "2023-2024" });
    getAcademicYear();
    // dispatch(tryFetchPickupPointListData());
  }, []);
  const clearDatas = () => {
    setFormData({
      academic_year: "",
      route: "",
      description: "",
      bus_no: "",
    });
    props.setOpen(false);
    dispatch(tryFetchRouteListData());
  };
  return (
    <>
      <ToastContainer />

      <Modal
        size="lg"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header className="transportModalHeader">
            <span>Add Route</span>
            <button type="button" onClick={clearDatas}></button>
          </Modal.Header>
          <Modal.Body className="transportFormModal">
            <div>
              <RoutesDetailsContainer
                academicYear={classOptions}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn-view" type="submit">
              <span>Add Routes</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddRouteModal;
