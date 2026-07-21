import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_TRANSPORT_INDIVIDUAL_FEE,
  ADD_TRANSPORT_REPAIR,
} from "../../../config/BaseUrl";
import {
  tryFetchPickupPointListData,
  tryFetchRouteListData,
  tryFetchTransportListData,
} from "../../../slices/transport/transportSlice";
import {
  clearSearch,
  tryFetchAutoCompleteSearch,
} from "../../../slices/navsearch/ClassWiseSearchSlice";
import { toast, ToastContainer } from "react-toastify";
import { tryFetchTransportSettingFeeListData } from "../../../slices/settings/transportSettingSlice";
// import RepairDetailsContainer from "./RepairDetailsContainer";

function AddTransportFeeModal(props: any) {
  const TransportLists: any = useSelector((state: any) => state.transport);
  const dispatch = useDispatch();
  const currentYear = localStorage.getItem("year");
  const [classOptions, setClassOptions] = useState([]);
  const [transportTypeRadio, setTransportTypeRadio] = useState("2");
  const [feeStructureRadio, setFeeStructureRadio] = useState(2);
  const [fee, setFee] = useState(0);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    academic_year: "",
    student_id: "",
    route: "",
    pickup: "",
    bus_no: "",
    month: "",
    fee: 0,
    tuition: "",
    remarks: "",
  });
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    class: "",
    division: "",
    routeNo: "",
  });
  const monthDetails = [
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
      month_id: 13,
      isCheckBox: true,
    },
    {
      month: "May",
      month_id: 14,
      isCheckBox: true,
    },
  ];
  const isSeniorClass =
    studentDetails?.class === "XI" || studentDetails?.class === "XII";

  const filteredMonthDetails = useMemo(
    () =>
      isSeniorClass
        ? monthDetails
        : monthDetails.filter((m) => m.month_id !== 13 && m.month_id !== 14),
    [isSeniorClass, monthDetails],
  );

  // ✅ Lazy initializer sets checked months once on mount
  const [selectedMonth, setSelectedMonth] = useState<number[]>(() =>
    filteredMonthDetails
      .filter((month) => month.isCheckBox)
      .map((month) => month.month_id),
  );

  // ✅ Only reset selection if the class tier changes (XI/XII vs lower)
  const prevIsSeniorClass = useRef(isSeniorClass);
  useEffect(() => {
    if (prevIsSeniorClass.current !== isSeniorClass) {
      prevIsSeniorClass.current = isSeniorClass;
      setSelectedMonth(
        filteredMonthDetails
          .filter((month) => month.isCheckBox)
          .map((month) => month.month_id),
      );
    }
  }, [isSeniorClass, filteredMonthDetails]);

  useEffect(() => {
    console.log("selectedMonth", selectedMonth);
  }, [selectedMonth]);

  const monthsSelected = selectedMonth.toString();

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const monthValue = parseInt(event.target.value);
    const isChecked = event.target.checked;

    setSelectedMonth((prev) =>
      isChecked
        ? Array.from(new Set([...prev, monthValue]))
        : prev.filter((month) => month !== monthValue),
    );
  };
  // const fee = () => {
  //   var value: any = formData.fee;

  //   if (formData.tuition === "1") {
  //     parseInt(value + 1000); // Add 1000 if tuituin is "1"
  //   }

  //   if (transportTypeRadio == "2") {
  //     return value; // Return the full value for transport type "2"
  //   } else {
  //     return value / 2; // Return half of the value for other transport types
  //   }
  // };
  useEffect(() => {
    var value: any = formData.fee;
    // if (formData.tuition !== "1" && transportTypeRadio === "1") {
    //   // If there is no tuition and transport type is "2", take the full amount

    //   setFee(value / 2);
    // } else if (formData.tuition === "1" && transportTypeRadio === "2") {
    //   // If tuition is "1" and transport type is "1", take half of the fee plus 1000
    //   setFee(value / 2 + 1000);
    // } else if (formData.tuition === "0" && transportTypeRadio === "2") {
    //   // If tuition is "1" and transport type is "1", take half of the fee plus 1000
    //   setFee(value / 2);
    // } else {
    //   // Fallback for other cases (you can customize this as needed)
    //   setFee(value); // Default to half fee in case none of the above conditions match
    // }
    if (formData.tuition === "1") {
      // Tuition case
      if (transportTypeRadio === "1") {
        // transportTypeRadio is"1", take half of the fee plus 1000
        setFee(parseFloat(value) / 2 + 1000);
      } else {
        // transportTypeRadio is 0, take full value plus 1000
        setFee(parseFloat(value) + 1000);
      }
    } else {
      // Non-tuition case
      if (transportTypeRadio === "1") {
        // transportTypeRadio is"1", take half of the value
        setFee(parseFloat(value) / 2);
      } else {
        // transportTypeRadio is 0, take full value
        setFee(parseFloat(value));
      }
    }
  }, [formData.pickup, formData.route, formData.tuition, transportTypeRadio]);

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
    console.log("formdata", formData);
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", formData.academic_year);
      bodyFormData.append("route", formData.route);
      bodyFormData.append("student_id", formData.student_id);
      bodyFormData.append("pickup", formData.pickup);
      bodyFormData.append("month", selectedMonth.join(","));

      bodyFormData.append("transport_type", transportTypeRadio);
      bodyFormData.append("tuition", formData.tuition);
      bodyFormData.append("remark", formData.remarks);

      let resp: any = await apiPost(ADD_TRANSPORT_INDIVIDUAL_FEE, bodyFormData);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        // dispatch(tryFetchTransportListData());
        dispatch(tryFetchTransportSettingFeeListData());
        toast.success(resp.response.data.status_message);
        setStudentDetails({
          name: "",
          class: " ",
          division: " ",
          routeNo: " ",
        });
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
    console.log("studentDetails", studentDetails);
  }, [studentDetails]);

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
  const PickupOptions = TransportLists?.pickupPointListData?.data?.map(
    (items: any) => {
      return {
        label: items.pick_up_point,
        value: items.id,
        fee: items.pick_up_fee,
      };
    },
  );
  const tuitionOptions = [
    {
      value: "0",
      label: "NO",
    },
    {
      value: "1",
      label: "YES",
    },
  ];
  const handleChangeRoute = (e: any) => {
    console.log("route value", e);
    console.log("formData", formData);
    var data = {
      year: formData.academic_year,
      route: e.value,
    };
    setFormData({ ...formData, route: e.value, bus_no: e.value });
    dispatch(tryFetchPickupPointListData(data));
  };

  useEffect(() => {
    getAcademicYear();
    dispatch(tryFetchRouteListData());
    return () => {
      dispatch(clearSearch());

      setSearch("");
    };
  }, []);

  const clearDatas = () => {
    setFormData({
      academic_year: "",
      student_id: "",
      route: "",
      pickup: "",
      bus_no: "",
      month: "",
      fee: 0,
      tuition: "",
      remarks: "",
    });
    setSearch("");
    setStudentDetails({
      name: "",
      class: " ",
      division: " ",
      routeNo: " ",
    });
    // setSelectedMonth([]);
    dispatch(clearSearch());
    props.setOpen(false);
  };
  const searchResult = useSelector((state: any) => state.classWiseList);
  const inputReference: any = useRef(null);
  const handleAutoCompleteSearch = (e: any) => {
    console.log("");
    var data = {
      id: e.target.value,
      year: formData.academic_year,
    };
    dispatch(tryFetchAutoCompleteSearch(data));

    if (e.target.value == "") {
      dispatch(clearSearch());
    }
    setSearch(e.target.value);
  };
  const handleFetchConsolidatedReport = (results: any) => {
    console.log("search", results);
    setSearch(results.old_admission_no);
    setStudentDetails({
      ...studentDetails,
      name:
        results.first_name +
        " " +
        results.middle_name +
        " " +
        results.last_name,
      class: results.class_id,
      division: results.division_id,
    });
    setFormData({ ...formData, student_id: results.id });
    dispatch(clearSearch());
  };

  function calc(arg0: number): string | number | readonly string[] | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <ToastContainer />
      <Modal
        size="xl"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header className="transportModalHeader">
            <span>Add Bus Fee</span>
            <button type="button" onClick={clearDatas}></button>
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
                          // console.log("academic year", e.value);
                          // console.log(
                          //   "academic year++++++++",
                          //   formData.academic_year
                          // );
                        }}
                        defaultValue={academicYearOptions.filter(
                          (item: any) => item.value === currentYear,
                        )}
                        // defaultValue="2025-2026"
                      />
                    </Col>
                    <Col md={6} className="custom-search">
                      <label htmlFor="">School Admission No</label>
                      <input
                        type="text"
                        placeholder="Search with Reg no."
                        aria-label="Search"
                        className="form-input"
                        // className="search-input"
                        onChange={handleAutoCompleteSearch}
                        value={search}
                      ></input>
                      {searchResult.autoCompleteSearch.length > 0 ? (
                        <div
                          className="autocomplete-component"
                          ref={inputReference}
                        >
                          {searchResult.autoCompleteSearch?.map(
                            (results: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="autocomplete-items"
                                  // onClick={() => handleClick(results)}
                                  onClick={() =>
                                    handleFetchConsolidatedReport(results)
                                  }
                                >
                                  <div className="left">
                                    <span className="autocomplete-items-text">
                                      {results.first_name} {results.middle_name}{" "}
                                      {results.last_name}
                                    </span>
                                    <span className="adm_no">
                                      {results.old_admission_no}
                                    </span>
                                  </div>
                                  <span>
                                    {results.class_id} {results.division_id}
                                  </span>
                                </div>
                                // </Link>
                              );
                            },
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row className="form-inputs-row ">
                    <Col md={6}>
                      <label htmlFor="">Student Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Student name"
                        value={studentDetails.name}
                        disabled
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Class</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Class "
                        value={studentDetails.class}
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
                        value={studentDetails.division}
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
                        defaultValue={RouteOptions.filter(
                          (item: any) => item.value === formData.route,
                        )}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Pickup Point</label>
                      <Select
                        options={PickupOptions}
                        placeholder="Select a pickup Point"
                        styles={customStyles}
                        onChange={(e: any) => {
                          setFormData({
                            ...formData,
                            pickup: e.value,
                            fee: e.fee,
                          });
                        }}
                        defaultValue={PickupOptions?.filter(
                          (item: any) => item.value === formData.pickup,
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row ">
                    <Col md={6}>
                      <label htmlFor="">Need transport for tuition?</label>
                      <Select
                        options={tuitionOptions}
                        placeholder="Select"
                        styles={customStyles}
                        onChange={(e: any) => {
                          setFormData({
                            ...formData,
                            tuition: e.value,
                          });
                        }}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Fee Amount</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Fee Amount"
                        value={fee}
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={12}>
                      <label htmlFor="remarks" className="mb-2">
                        Remarks
                      </label>
                      <textarea
                        id="remarks"
                        className="form-text-area"
                        placeholder="Remarks"
                        value={formData.remarks}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            remarks: e.target.value,
                          })
                        }
                        rows={5}
                      />
                    </Col>
                  </Row>
                  {feeStructureRadio === 2 ? (
                    <Row className="form-inputs-row">
                      <Col md={12} className="d-flex gap-5 flex-wrap">
                        {filteredMonthDetails.map((months, index) => {
                          return (
                            <div
                              key={months.month_id}
                              className="d-flex flex-column"
                            >
                              <label className="form-check-label">
                                {months.month}
                              </label>
                              <input
                                type="checkbox"
                                value={months.month_id}
                                name={months.month}
                                checked={selectedMonth.includes(
                                  months.month_id,
                                )}
                                className="form-check-input"
                                onChange={handleCheckBox}
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
            <button className="btn-view">
              <span>Add Fee</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddTransportFeeModal;
