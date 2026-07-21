import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_STUDENT_HOSTEL_SETTING,
} from "../../config/BaseUrl";
import {
  clearSearch,
  tryFetchAutoCompleteSearch,
} from "../../slices/navsearch/ClassWiseSearchSlice";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import {
  tryFetchHostelDetails,
  tryFetchHostelRequiredList,
  tryFetchHostelStudentData,
} from "../../slices/hostel/hostelSlice";
interface StudentDetails {
  class_id?: string;
  // add other fields if needed
}
// import RepairDetailsContainer from "./RepairDetailsContainer";

function AddHostelSettingModal(props: any) {
  const hostelList: any = useSelector((state: any) => state.hostel);
  const searchResult = useSelector((state: any) => state.classWiseList);

  const dispatch = useDispatch();
  const [classOptions, setClassOptions] = useState([]);
  const [transportTypeRadio, setTransportTypeRadio] = useState("2");
  const [feeStructureRadio, setFeeStructureRadio] = useState(2);
  const [search, setSearch] = useState("");
  const [academicYearError, setAcademicYearError] = useState(false);
  const [admissionNoError, setAdmissionNoError] = useState(false);
  const [hostelTypeError, setHostelTypeError] = useState(false);
  const [roomNumberError, setRoomNumberError] = useState(false);
  const [roomTypeError, setRoomTypeError] = useState(false);
  const [monthValues, setMonthValues]: any = useState({});
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({});
  const currentYear = localStorage.getItem("year");
  const [formData, setFormData] = useState({
    academic_year: currentYear || "",
    student_id: "",
    hostelType: "",
    roomType: "",
    roomNumber: "",
    month: "",
    remarks: "",
  });
  const [hostelDetails, setHostelDetails] = useState({
    hostelSettingId: "",
    hostelFee: "",
    admissionFee: "",
    cautionDeposit: "",
    storeDeposit: "",
    establishmentFee: "",
    readmission: "",
  });

  const [monthDetails, setMonthDetails] = useState([
    {
      month: "Apr",
      month_id: 4,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "May",
      month_id: 5,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Jun",
      month_id: 6,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Jul",
      month_id: 7,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Aug",
      month_id: 8,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Sep",
      month_id: 9,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Oct",
      month_id: 10,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Nov",
      month_id: 11,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Dec",
      month_id: 12,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Jan",
      month_id: 1,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Feb",
      month_id: 2,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "Mar",
      month_id: 3,
      isCheckBox: true,
      feeInput: "",
    },

    {
      month: "Apr",
      month_id: 13,
      isCheckBox: true,
      feeInput: "",
    },
    {
      month: "May",
      month_id: 14,
      isCheckBox: true,
      feeInput: "",
    },
  ]);
  const isSeniorClass =
    studentDetails?.class_id === "XI" || studentDetails?.class_id === "XII";

  const filteredMonthDetails = isSeniorClass
    ? monthDetails // show everything
    : monthDetails.filter((m) => m.month_id !== 13 && m.month_id !== 14);

  const [selectedMonth, setSelectedMonth] = useState(
    filteredMonthDetails
      .filter((month) => month?.isCheckBox)
      .map((month) => month?.month_id),
  );

  const monthsSelected = selectedMonth.toString();
  const handleCheckBox = (id: any, event: any) => {
    const monthValue = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedMonth((prevSelectedMonth: any) => [
        ...prevSelectedMonth,
        parseInt(monthValue),
      ]);
      setMonthDetails((prevMonthDetails) => {
        return prevMonthDetails?.map((month) =>
          month.month_id === id
            ? { ...month, feeInput: hostelDetails?.hostelFee }
            : month,
        );
      });
    } else {
      setSelectedMonth((prevSelectedMonth: any) =>
        prevSelectedMonth.filter(
          (month: any) => month !== parseInt(monthValue),
        ),
      );
      setMonthDetails((prevMonthDetails) => {
        console.log("month field", prevMonthDetails);
        return prevMonthDetails?.map((month) =>
          month.month_id === id ? { ...month, feeInput: "0" } : month,
        );
      });
    }
  };
  const handleMonthValuesChange = (monthId: any, value: any) => {
    // setMonthValues((previous: any) => ({
    //   ...previous,
    //   [event.target.name]: event.target.value,
    // }));
    setMonthDetails((prevMonthDetails) => {
      console.log("month field", prevMonthDetails);
      return prevMonthDetails?.map((month) =>
        month.month_id === monthId ? { ...month, feeInput: value } : month,
      );
    });
  };

  // useEffect(() => {
  //   monthDetails?.map((month) => {
  //     setMonthValues((prevSelectedMonths) => {
  //       if (month.isCheckBox) {
  //         // Add the month_id to the state if the checkbox is checked
  //         return {
  //           ...prevSelectedMonths,
  //           ["id"]: month.month_id,
  //           ["value"]: month.feeInput,
  //         };
  //       } else {
  //         // Remove the month_id from the state if the checkbox is unchecked
  //         const { [month_id]: _, ...updatedMonths } = prevSelectedMonths;
  //         return updatedMonths;
  //       }
  //     });
  //   });
  // }, [hostelDetails?.hostelFee]);

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
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent default form submission

    // Reset all errors
    setAcademicYearError(false);
    setAdmissionNoError(false);
    setHostelTypeError(false);
    setRoomNumberError(false);
    setRoomTypeError(false);

    let hasError = false;

    if (formData.academic_year === "") {
      setAcademicYearError(true);
      hasError = true;
    }
    if (search === "") {
      setAdmissionNoError(true);
      hasError = true;
    }
    if (formData.hostelType === "") {
      setHostelTypeError(true);
      hasError = true;
    }
    if (formData.roomNumber === "") {
      setRoomNumberError(true);
      hasError = true;
    }
    if (formData.roomType === "") {
      setRoomTypeError(true);
      hasError = true;
    }

    if (hasError) {
      return; // Stop submission if there are errors
    }

    const monthDetailsToSend = JSON.stringify(
      filteredMonthDetails
        .filter((month) => month?.isCheckBox)
        .map((month) => ({
          key: month?.month_id,
          feeAmount: month?.feeInput,
        })),
    );

    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("month", monthDetailsToSend);
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", formData.academic_year);
      bodyFormData.append("adm_no", search);
      bodyFormData.append("hostel_settings_id", hostelDetails.hostelSettingId);
      bodyFormData.append("hostel_type", formData.hostelType);
      bodyFormData.append("room_type", formData.roomType);
      bodyFormData.append("room_no", formData.roomNumber);
      bodyFormData.append("hostel_fee", hostelDetails.hostelFee || "");
      bodyFormData.append("admission_fee", hostelDetails.admissionFee || "");
      bodyFormData.append(
        "caution_deposit",
        hostelDetails.cautionDeposit || "",
      );
      bodyFormData.append("readmission", hostelDetails.readmission || "");
      bodyFormData.append("store_deposit", hostelDetails.storeDeposit || "");
      bodyFormData.append(
        "establishment_fee",
        hostelDetails.establishmentFee || "",
      );
      bodyFormData.append("remark", formData.remarks || "");

      bodyFormData.append("discontinue_flag", "0");
      console.log("hostel setting fee datas is ", formData);
      let resp: any = await apiPost(ADD_STUDENT_HOSTEL_SETTING, bodyFormData);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        dispatch(tryFetchHostelStudentData());
        setAcademicYearError(false);
        toast.success(resp.response.data.status_message);
      } else {
        clearDatas();
        toast.error(resp.response.data.status_message);
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
  };

  const academicYearOptions = classOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const HostelTypeOptions = hostelList.hostelTypeListData?.map((items: any) => {
    return {
      label: items.name,
      value: items.id,
    };
  });
  const RoomTypeOptions = hostelList.roomTypeListData?.map((items: any) => {
    return {
      label: items.name,
      value: items.id,
    };
  });

  const handleAdmissionNumber = (results: any) => {
    setSearch(results.old_admission_no);
    setStudentDetails(results);

    dispatch(clearSearch());
  };
  useEffect(() => {
    if (search === "") {
      setStudentDetails({});
    }
  }, [search]);

  useEffect(() => {
    getAcademicYear();
    dispatch(tryFetchHostelRequiredList());
    return () => {
      dispatch(clearSearch());
      setSearch("");
      setStudentDetails({});
    };
  }, []);

  const clearDatas = () => {
    setAcademicYearError(false);
    setAdmissionNoError(false);
    setHostelTypeError(false);
    setRoomNumberError(false);
    setRoomTypeError(false);
    setFormData({
      academic_year: "",
      student_id: "",
      hostelType: "",
      roomType: "",
      roomNumber: "",
      month: "",
      remarks: "",
    });
    setSearch("");
    setHostelDetails({
      hostelSettingId: "",
      hostelFee: "",
      admissionFee: "",
      cautionDeposit: "",
      storeDeposit: "",
      establishmentFee: "",
      readmission: "",
    });
    setStudentDetails({});
    // setSelectedMonth([]);
    dispatch(clearSearch());
    props.setOpen(false);
  };

  const inputReference: any = useRef(null);
  const handleAutoCompleteSearch = (e: any) => {
    var data = {
      id: e.target.value,
      year: formData.academic_year,
    };
    dispatch(tryFetchAutoCompleteSearch(data));

    // if (e.target.value == "") {
    //   dispatch(clearSearch());
    // }
    setSearch(e.target.value);
  };
  const setHostelType = (e: any) => {
    setFormData({ ...formData, hostelType: e.value });
  };
  const setRoomType = (e: any) => {
    setFormData({ ...formData, roomType: e.value });
  };
  useEffect(() => {
    if (formData.hostelType !== "" && formData.roomType !== "") {
      var body = {
        hostelId: formData.hostelType,
        roomId: formData.roomType,
      };
      dispatch(tryFetchHostelDetails(body));
    }
  }, [formData.hostelType, formData.roomType]);

  // CHANGE THE HOSTEL DETAILS LIKE FEE WHEN HOSTEL TYPE CHANGES
  useEffect(() => {
    setHostelDetails({
      ...hostelDetails,
      hostelSettingId: hostelList.hostelDetails?.[0]?.id,
      hostelFee: hostelList.hostelDetails?.[0]?.hostel_fee,
      admissionFee: hostelList.hostelDetails?.[0]?.admission_fee,
      cautionDeposit: hostelList.hostelDetails?.[0]?.caution_deposit,
      storeDeposit: hostelList.hostelDetails?.[0]?.store_deposit,
      establishmentFee: hostelList.hostelDetails?.[0]?.establishment_fee,
      readmission: hostelList.hostelDetails?.[0]?.readmission,
    });
  }, [hostelList.hostelDetails]);
  useEffect(() => {
    console.log("thidsdsdddddddddddddddddddd");

    setMonthDetails((prevMonthDetails) => {
      const updatedMonthDetails = prevMonthDetails?.map((month) => {
        return { ...month, feeInput: hostelDetails?.hostelFee };
      });
      return updatedMonthDetails;
    });
  }, [hostelDetails?.hostelFee]);

  useEffect(() => {
    if (formData.academic_year !== "") {
      setAcademicYearError(false);
    }
    if (search !== "") {
      setAdmissionNoError(false);
    }
    if (formData.hostelType !== "") {
      setHostelTypeError(false);
    }
    if (formData.roomNumber !== "") {
      setRoomNumberError(false);
    }
    if (formData.roomType !== "") {
      setRoomTypeError(false);
    }
  }, [formData, search]);
  useEffect(() => {
    if (currentYear && classOptions.length > 0) {
      setFormData((prev) => ({
        ...prev,
        academic_year: currentYear,
      }));
    }
  }, [currentYear, classOptions, props.modalOpen]);
  // console.log("form",formData);
  // console.log("hostelTypeError",hostelTypeError);
  useEffect(() => {
    console.log("searchResult.autoComplete", searchResult.autoCompleteSearch);
  }, [searchResult]);

  return (
    <>
      <ToastContainer />
      <Modal
        size="xl"
        show={props.modalOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form>
          <Modal.Header className="transportModalHeader">
            <span>Add Hostel Student Settings</span>
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
                        }}
                        defaultValue={academicYearOptions.filter(
                          (item: any) => item.label === currentYear,
                        )}
                        value={academicYearOptions.find(
                          (option: any) =>
                            option.value === formData.academic_year,
                        )} // Add this to sync with state
                      />
                      {academicYearError ? (
                        <div className="validation">Select academic year</div>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col md={6} className="custom-search">
                      <label htmlFor="">Admission No</label>
                      <input
                        type="text"
                        placeholder="Search with Reg no."
                        aria-label="Search"
                        className="form-input"
                        // className="search-input"
                        onChange={handleAutoCompleteSearch}
                        value={search}
                      ></input>
                      {admissionNoError ? (
                        <div className="validation">
                          Select admission number
                        </div>
                      ) : (
                        ""
                      )}
                      {searchResult.autoCompleteSearch.length > 0 ? (
                        <div
                          className="autocomplete-component"
                          ref={inputReference}
                        >
                          {searchResult.autoCompleteSearch?.map(
                            (results: any) => {
                              return (
                                <div
                                  className="autocomplete-items"
                                  // onClick={() => handleClick(results)}
                                  onClick={() => handleAdmissionNumber(results)}
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
                      <label htmlFor="">Hostel Type</label>
                      <Select
                        options={HostelTypeOptions}
                        placeholder="Select hostel type"
                        styles={customStyles}
                        onChange={(e) => setHostelType(e)}
                        required
                        // defaultValue={RouteOptions.filter(
                        //   (item: any) => item.value === formData.route
                        // )}
                      />
                      {hostelTypeError ? (
                        <div className="validation">Select hostel type</div>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Room Type</label>
                      <Select
                        options={RoomTypeOptions}
                        placeholder="Select room type"
                        styles={customStyles}
                        onChange={(e) => setRoomType(e)}
                        // onChange={(e: any) => {
                        //   setFormData({
                        //     ...formData,
                        //     pickup: e.value,
                        //     fee: e.fee,
                        //   });
                        // }}
                        // defaultValue={PickupOptions.filter(
                        //   (item: any) => item.value === formData.pickup
                        // )}
                      />
                      {roomTypeError ? (
                        <div className="validation">Select room type</div>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Room Number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Room Number"
                        onChange={(e: any) => {
                          setFormData({
                            ...formData,
                            roomNumber: e.target.value,
                          });
                        }}
                      />
                      {roomNumberError ? (
                        <div className="validation">Enter room number</div>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Hostel Fee</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Hostel Fee"
                        // onChange={(e: any) =>
                        //   setHostelDetails({
                        //     ...hostelDetails,
                        //     hostelFee: e.target.value,
                        //   })
                        // }
                        value={hostelDetails.hostelFee}
                        disabled
                      />
                    </Col>
                    {/* <Col md={6}>
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
                    </Col> */}
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Admission Fee</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Admission Fee"
                        onChange={(e: any) =>
                          setHostelDetails({
                            ...hostelDetails,
                            admissionFee: e.target.value,
                          })
                        }
                        value={hostelDetails.admissionFee}
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Caution Deposit</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Caution Deposit"
                        onChange={(e: any) =>
                          setHostelDetails({
                            ...hostelDetails,
                            cautionDeposit: e.target.value,
                          })
                        }
                        value={hostelDetails.cautionDeposit}
                      />
                    </Col>
                  </Row>
                  <Row className="form-inputs-row">
                    <Col md={6}>
                      <label htmlFor="">Readmission Fee</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Readmission Fee"
                        onChange={(e: any) =>
                          setHostelDetails({
                            ...hostelDetails,
                            readmission: e.target.value,
                          })
                        }
                        value={hostelDetails.readmission}
                      />
                    </Col>
                    {/* <Col md={6}>
                      <label htmlFor="">Store Deposit</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Store Deposit"
                        // onChange={(e: any) =>
                        //   setHostelDetails({
                        //     ...hostelDetails,
                        //     storeDeposit: e.target.value,
                        //   })
                        // }
                        value={
                          hostelDetails.storeDeposit == null
                            ? "0"
                            : hostelDetails.storeDeposit
                        }
                        disabled
                      />
                    </Col> */}
                    <Col md={6}>
                      <label htmlFor="">Establishment Fee</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Establishment Fee"
                        // onChange={(e: any) =>
                        //   setHostelDetails({
                        //     ...hostelDetails,
                        //     establishmentFee: e.target.value,
                        //   })
                        // }
                        value={
                          hostelDetails.establishmentFee == null
                            ? "0"
                            : hostelDetails.establishmentFee
                        }
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
                      <Col md={12} className="d-flex flex-wrap  gap-5">
                        {filteredMonthDetails?.map((months, index) => {
                          return (
                            <div
                              key={months?.month_id}
                              className="d-flex align-items-center flex-column gap-1"
                            >
                              <label className="form-check-label">
                                {months?.month}
                              </label>

                              <input
                                type="checkbox"
                                value={months?.month_id}
                                name={months?.month}
                                defaultChecked
                                className="form-check-input"
                                onChange={(e) =>
                                  handleCheckBox(months?.month_id, e)
                                }
                              />

                              <input
                                type="text"
                                name={String(months?.month_id)}
                                value={months?.feeInput}
                                onChange={(e) =>
                                  handleMonthValuesChange(
                                    months?.month_id,
                                    e.target.value,
                                  )
                                }
                                className="fee-input"
                              />
                            </div>
                          );
                        })}

                        {/* {selectedMonth.map((month) => (
                          <input
                            type="text"
                            name={String(month)}
                            value={monthValues[String(month)]}
                            onChange={handleMonthValuesChange}
                          />
                        ))} */}
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
            <button
              className="btn-view"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              <span>Add Fee</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddHostelSettingModal;
