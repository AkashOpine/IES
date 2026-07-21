import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  EDIT_STUDENT_HOSTEL_SETTING,
} from "../../config/BaseUrl";
import { clearSearch } from "../../slices/navsearch/ClassWiseSearchSlice";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import {
  tryFetchHostelDetails,
  tryFetchHostelRequiredList,
  tryFetchHostelStudentData,
} from "../../slices/hostel/hostelSlice";
import { log } from "console";
function EditHostelSettingModal(props: any) {
  const hostelList: any = useSelector((state: any) => state.hostel);
  const dispatch = useDispatch();
  const currentYear = localStorage.getItem("year");
  const [classOptions, setClassOptions] = useState([]);
  const [feeStructureRadio, setFeeStructureRadio] = useState(2);
  const [search, setSearch] = useState("");
  const [academicYearError, setAcademicYearError] = useState(false);
  const [admissionNoError, setAdmissionNoError] = useState(false);
  const [hostelTypeError, setHostelTypeError] = useState(false);
  const [roomNumberError, setRoomNumberError] = useState(false);
  const [roomTypeError, setRoomTypeError] = useState(false);
  const [formData, setFormData]: any = useState({
    academic_year: currentYear,
    student_id: "",
    student_name: "",
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
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Jun",
      month_id: 6,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Jul",
      month_id: 7,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Aug",
      month_id: 8,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Sep",
      month_id: 9,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Oct",
      month_id: 10,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Nov",
      month_id: 11,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Dec",
      month_id: 12,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Jan",
      month_id: 1,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Feb",
      month_id: 2,
      isCheckBox: false,
      feeInput: "",
    },
    {
      month: "Mar",
      month_id: 3,
      isCheckBox: false,
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
  const [selectedMonth, setSelectedMonth] = useState(
    monthDetails
      .filter((month) => month?.isCheckBox)
      .map((month) => month?.month_id),
  );
  const handleCheckBox = (id: any, event: any) => {
    const isChecked = event.target.checked;
    setMonthDetails((prevMonthDetails) =>
      prevMonthDetails.map((month) =>
        month.month_id === id
          ? {
              ...month,
              isCheckBox: isChecked,
              feeInput: isChecked ? hostelDetails?.hostelFee : "", // Reset feeInput when unchecked
            }
          : month,
      ),
    );
    if (isChecked) {
      setSelectedMonth((prevSelectedMonth) => [...prevSelectedMonth, id]);
    } else {
      setSelectedMonth((prevSelectedMonth) =>
        prevSelectedMonth.filter((monthId) => monthId !== id),
      );
    }
  };
  const handleMonthValuesChange = (monthId: any, value: any) => {
    // setMonthValues((previous: any) => ({
    //   ...previous,
    //   [event.target.name]: event.target.value,
    // }));
    setMonthDetails((prevMonthDetails) => {
      return prevMonthDetails?.map((month) =>
        month.month_id === monthId ? { ...month, feeInput: value } : month,
      );
    });
  };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
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
  const handleSubmit = async (e: any) => {
    const monthDetailsToSend = JSON.stringify(
      filteredMonthDetails
        .filter((month) => month?.isCheckBox)
        .map((month) => ({
          key: month?.month_id,
          feeAmount: month?.feeInput,
        })),
    );
    console.log("monthDetailsToSend", monthDetailsToSend);
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append(
        "student_id",
        hostelList.singleHostelerDetails?.student_id,
      );
      bodyFormData.append("month", monthDetailsToSend);
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", formData.academic_year);
      bodyFormData.append("adm_no", formData.student_id);
      bodyFormData.append("hostel_settings_id", hostelDetails.hostelSettingId);
      bodyFormData.append("hostel_type", formData.hostelType);
      bodyFormData.append("room_type", formData.roomType);
      bodyFormData.append("room_no", formData.roomNumber);
      bodyFormData.append("hostel_fee", hostelDetails.hostelFee || "");
      bodyFormData.append("admission_fee", hostelDetails.admissionFee || "");
      bodyFormData.append("readmission", hostelDetails.readmission || "");
      bodyFormData.append("remark", formData.remarks || "");
      bodyFormData.append(
        "caution_deposit",
        hostelDetails.cautionDeposit || "",
      );
      bodyFormData.append("store_deposit", hostelDetails.storeDeposit || "");
      bodyFormData.append(
        "establishment_fee",
        hostelDetails.establishmentFee || "",
      );
      bodyFormData.append("discontinue_flag", "0");
      console.log("hostel setting fee datas is ", formData);
      let resp: any = await apiPost(EDIT_STUDENT_HOSTEL_SETTING, bodyFormData);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        dispatch(tryFetchHostelStudentData());
        setAcademicYearError(false);
        toast.success("Hostel setting Edited successfully");
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
  useEffect(() => {
    getAcademicYear();
    dispatch(tryFetchHostelRequiredList());
    return () => {
      dispatch(clearSearch());
      setSearch("");
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
    dispatch(clearSearch());
    setMonthDetails((prevMonthDetails: any) => {
      const updatedMonthDetails = prevMonthDetails?.map((month: any) => {
        return { ...month, isCheckBox: false, feeInput: 0 };
      });
      return updatedMonthDetails;
    });
    props.setOpen(false);
  };
  const setHostelType = (e: any) => {
    setFormData({ ...formData, hostelType: e.value });
  };
  const setRoomType = (e: any) => {
    setFormData({ ...formData, roomType: e.value });
  };
  useEffect(() => {
    // Reset the monthDetails and uncheck all checkboxes
    setMonthDetails((prevMonthDetails) =>
      prevMonthDetails.map((month) => ({
        ...month,
        isCheckBox: false, // Uncheck all checkboxes
        feeInput: "", // Reset fee input to empty or 0
      })),
    );
    // Clear the selected months array
    setSelectedMonth([]);
  }, [formData.roomType]);

  useEffect(() => {
    if (formData.hostelType !== "" && formData.roomType !== "") {
      var body = {
        hostelId: formData.hostelType,
        roomId: formData.roomType,
      };
      dispatch(tryFetchHostelDetails(body));
    }
    setMonthDetails((prevMonthDetails) => {
      const updatedMonthDetails = prevMonthDetails?.map((month) => {
        return { ...month, isCheckBox: false };
      });
      return updatedMonthDetails;
    });
  }, [formData.hostelType, formData.roomType]);

  useEffect(() => {
    setHostelDetails({
      ...hostelDetails,
      hostelSettingId: hostelList.singleHostelerDetails?.id,
      hostelFee: hostelList.singleHostelerDetails?.hostel_fee,
      admissionFee: hostelList.singleHostelerDetails?.admission_fee,
      cautionDeposit: hostelList.singleHostelerDetails?.caution_deposit,
      storeDeposit: hostelList.singleHostelerDetails?.store_deposit,
      establishmentFee: hostelList.singleHostelerDetails?.establishment_fee,
      readmission: hostelList.singleHostelerDetails?.readmission,
    });
    setFormData({
      ...formData,
      academic_year: hostelList.singleHostelerDetails?.academic_year,
      student_id: hostelList.singleHostelerDetails?.old_admission_no,
      student_name: hostelList.singleHostelerDetails?.student_name,
      hostelType: hostelList.singleHostelerDetails?.hostel_type,
      roomType: hostelList.singleHostelerDetails?.room_type_id,
      roomNumber: parseInt(hostelList.singleHostelerDetails?.room_no),
      month: "",
      remarks: hostelList.singleHostelerDetails?.remark,
    });
    console.log(
      "hostelList.singleHostelerDetails",
      hostelList.singleHostelerDetails,
    );
  }, [hostelList.singleHostelerDetails]);
  const isSeniorClass =
    hostelList?.singleHostelerDetails?.class_id === "XI" ||
    hostelList?.singleHostelerDetails?.class_id === "XII";

  const filteredMonthDetails = isSeniorClass
    ? monthDetails // show everything
    : monthDetails.filter((m) => m.month_id !== 13 && m.month_id !== 14);
  // useEffect(() => {
  //   setMonthDetails((prevMonthDetails) => {
  //     const updatedMonthDetails = prevMonthDetails?.map((month) => {
  //       return { ...month, feeInput: hostelDetails?.hostelFee };
  //     });
  //     return updatedMonthDetails;
  //   });
  // }, [hostelDetails]);
  // CHANGE THE HOSTEL DETAILS LIKE FEE WHEN HOSTEL TYPE CHANGES
  useEffect(() => {
    setHostelDetails({
      ...hostelDetails,
      hostelSettingId: hostelList.hostelDetails?.[0]?.id,
      hostelFee: hostelList.hostelDetails?.[0]?.hostel_fee,
      // admissionFee: hostelList.hostelDetails?.[0]?.admission_fee,
      // cautionDeposit: hostelList.hostelDetails?.[0]?.caution_deposit,
      storeDeposit: hostelList.hostelDetails?.[0]?.store_deposit,
      establishmentFee: hostelList.hostelDetails?.[0]?.establishment_fee,
      readmission: hostelList.hostelDetails?.[0]?.readmission,
    });
  }, [hostelList.hostelDetails]);
  useEffect(() => {
    setMonthDetails((prevMonthDetails) => {
      return prevMonthDetails.map((month) => ({
        ...month,
        isCheckBox: false,
      }));
    });
    // If you need to clear the selectedMonth array as well
    setSelectedMonth([]);
  }, [formData.hostelType, formData.roomType]);

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
  }, [
    formData.academic_year,
    search,
    formData.hostelType,
    formData.roomNumber,
    formData.roomType,
  ]);

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
            <span>Edit Hostel Student Settings</span>
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
                        value={
                          academicYearOptions.find(
                            (item: any) =>
                              item.value === formData.academic_year,
                          ) || null
                        }
                      />

                      {academicYearError ? (
                        <div className="validation">Select academic year</div>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col md={6} className="custom-search">
                      <label htmlFor="">Student</label>
                      <input
                        type="text"
                        disabled
                        placeholder="Search with Reg no."
                        aria-label="Search"
                        className="form-input"
                        value={formData.student_name}
                      ></input>
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
                        defaultValue={HostelTypeOptions.find(
                          (item: any) =>
                            item.value ===
                            parseInt(
                              hostelList.singleHostelerDetails?.hostel_type,
                            ),
                        )}
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
                        defaultValue={RoomTypeOptions.filter(
                          (item: any) =>
                            item.label ===
                            hostelList.singleHostelerDetails?.room_type,
                        )}
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
                        value={formData.roomNumber}
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
                        value={hostelDetails.hostelFee}
                        disabled
                      />
                    </Col>
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
                            readmission: e.target.value || 0,
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
                              checked={months.isCheckBox}
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
              onClick={(e) => handleSubmit(e)}
            >
              <span>Update</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditHostelSettingModal;
