import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_TRANSPORT_INDIVIDUAL_FEE,
} from "../../../config/BaseUrl";
import {
  tryFetchPickupPointListData,
  tryFetchRouteListData,
  tryFetchTransportListData,
} from "../../../slices/transport/transportSlice";
import { clearSearch } from "../../../slices/navsearch/ClassWiseSearchSlice";
import { toast, ToastContainer } from "react-toastify";
// import RepairDetailsContainer from "./RepairDetailsContainer";

function AddTransportClassFeeModal(props: any) {
  console.log("props./askjdghasjkdasd", props);
  const TransportLists: any = useSelector((state: any) => state.transport);
  const dispatch = useDispatch();
  const [classOptions, setClassOptions] = useState([]);
  const [transportTypeRadio, setTransportTypeRadio] = useState("2");
  const [feeStructureRadio, setFeeStructureRadio] = useState(2);
  const [search, setSearch] = useState("");

  const monthDetails = [
    {
      month: "Jun",
      month_id: 6,
      isCheckBox: true,
    },
    {
      month: "Jul",
      month_id: 7,
      isCheckBox: true,
    },
    {
      month: "Aug",
      month_id: 8,
      isCheckBox: true,
    },
    {
      month: "Sep",
      month_id: 9,
      isCheckBox: true,
    },
    {
      month: "Oct",
      month_id: 10,
      isCheckBox: true,
    },
    {
      month: "Nov",
      month_id: 11,
      isCheckBox: true,
    },
    {
      month: "Dec",
      month_id: 12,
      isCheckBox: true,
    },
    {
      month: "Jan",
      month_id: 1,
      isCheckBox: true,
    },
    {
      month: "Feb",
      month_id: 2,
      isCheckBox: true,
    },
    {
      month: "Mar",
      month_id: 3,
      isCheckBox: true,
    },
    {
      month: "Apr",
      month_id: 4,
      isCheckBox: true,
    },
    {
      month: "May",
      month_id: 5,
      isCheckBox: true,
    },
  ];
  const [selectedMonth, setSelectedMonth] = useState(
    monthDetails
      .filter((month) => month.isCheckBox)
      .map((month) => month.month_id)
  );
  const monthsSelected = selectedMonth.toString();
  const handleCheckBox = (event: any) => {
    const monthValue = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedMonth((prevSelectedMonth: any) => [
        ...prevSelectedMonth,
        parseInt(monthValue),
      ]);
    } else {
      setSelectedMonth((prevSelectedMonth: any) =>
        prevSelectedMonth.filter((month: any) => month !== parseInt(monthValue))
      );
    }
  };

  useEffect(() => {
    console.log("values props", props.editValues);

    console.log("selectedMonth", monthsSelected);
  }, [selectedMonth]);
  const [formData, setFormData] = useState({
    academic_year: "",
    student_id: props?.editValues?.id,
    route: "",
    pickup: "",
    bus_no: "",
    month: "",
    fee: "",
    transport_type: "2",
  });
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
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
    console.log("formdata", formData);
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", formData.academic_year);
      bodyFormData.append("route", formData.route);
      bodyFormData.append("student_id", props.editValues.id);
      bodyFormData.append("pickup", formData.pickup);
      bodyFormData.append("month", monthsSelected);
      bodyFormData.append("transport_type", transportTypeRadio);
      let resp: any = await apiPost(ADD_TRANSPORT_INDIVIDUAL_FEE, bodyFormData);

      console.log("transport fee months ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        dispatch(tryFetchTransportListData());
        toast.success("Transport Details Added Succefully");
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
  const academicYearOptions = classOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const RouteOptions = TransportLists?.routeListData?.map((items: any) => {
    return {
      label: items.route,
      value: items.id,
    };
  });
  const PickupOptions = Array.isArray(TransportLists?.pickupPointListData)
    ? TransportLists?.pickupPointListData.map((items: any) => {
        return {
          label: items.pick_up_point,
          value: items.id,
          fee: items.pick_up_fee,
        };
      })
    : [];
  const handleChangeRoute = (e: any) => {
    console.log("route value", e);
    var data = {
      year: formData.academic_year,
      route: e.value,
    };
    setFormData({ ...formData, route: e.value, bus_no: e.value });
    dispatch(tryFetchPickupPointListData(data));
  };
  const handlePickupChange = (e: any) => {
    console.log("pickup value", e);

    setFormData({ ...formData, pickup: e.value, fee: e.fee });
  };
  useEffect(() => {
    getAcademicYear();
    dispatch(tryFetchRouteListData());

    console.log("values props", props.editValues);
    return () => {
      dispatch(clearSearch());

      setSearch("");
      // setSelectedMonth([]);
    };
  }, []);
  useEffect(() => {
    var data = {
      year: props?.editValues?.academic_year,
      route: props?.editValues?.route_id,
    };

    dispatch(tryFetchPickupPointListData(data));
    setFormData({
      ...formData,
      academic_year: props?.editValues?.academic_year,
      route: props?.editValues?.route_id,
      pickup: props?.editValues?.pickup_id,
      fee: props?.editValues?.fee_amount,
    });
  }, [props.editValues]);

  const clearDatas = () => {
    setFormData({
      academic_year: "",
      student_id: "",
      route: "",
      pickup: "",
      bus_no: "",
      month: "",
      fee: "",
      transport_type: "",
    });
    setSearch("");
    // setSelectedMonth([]);
    dispatch(clearSearch());
    props.setOpen(false);
  };
  const searchResult = useSelector((state: any) => state.classWiseList);

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
            <span>Add Bus Fee</span>
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
                        onChange={(e: any) => {
                          setFormData({ ...formData, academic_year: e.value });
                        }}
                        value={academicYearOptions.filter(
                          (item: any) => item.label == formData.academic_year
                        )}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row ">
                    <Col md={6}>
                      <label htmlFor="">Student Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Student name"
                        value={
                          props.editValues.first_name +
                          " " +
                          props.editValues.last_name
                        }
                        disabled
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Class</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Class "
                        value={props.editValues.class_id}
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Division</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Division"
                        value={props.editValues.division_id}
                        disabled
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Transport Type</label>
                      <div className="d-flex gap-4">
                        <div className="d-flex align-center gap-1">
                          <input
                            type="radio"
                            name="transportType"
                            value="1"
                            onChange={() => setTransportTypeRadio("1")}
                            checked={transportTypeRadio === "1"}
                          />
                          One-Way
                        </div>
                        <div className="d-flex align-center gap-1">
                          <input
                            type="radio"
                            name="transportType"
                            value="2"
                            onChange={() => setTransportTypeRadio("2")}
                            checked={transportTypeRadio === "2"}
                          />
                          Two-Way
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="form-inputs-row ">
                    <Col md={6}>
                      <label htmlFor="">Route</label>
                      <Select
                        options={RouteOptions}
                        placeholder="Select Route"
                        styles={customStyles}
                        onChange={(e: any) => handleChangeRoute(e)}
                        required
                        value={RouteOptions.filter(
                          (item: any) => item.value === formData.route
                        )}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Pickup Point</label>
                      <Select
                        options={PickupOptions}
                        placeholder="Select Point for pickup"
                        styles={customStyles}
                        onChange={(e: any) => {
                          handlePickupChange(e);
                        }}
                        value={PickupOptions.filter(
                          (item: any) => item.value === formData.pickup
                        )}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Fee Amount</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Fee Amount"
                        value={formData.fee}
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row "></Row>
                  {feeStructureRadio === 2 ? (
                    <Row className="form-inputs-row">
                      <Col md={12} className="d-flex gap-5">
                        {monthDetails.map((months, index) => {
                          return (
                            <div key={months.month_id}>
                              <label className="form-check-label">
                                {months.month}
                              </label>
                              <input
                                type="checkbox"
                                value={months.month_id}
                                name={months.month}
                                defaultChecked
                                className="form-check-input"
                                onChange={(e) => handleCheckBox(e)}
                              />
                            </div>
                          );
                        })}
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn-view" type="submit">
              <span>Add Fee</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddTransportClassFeeModal;
