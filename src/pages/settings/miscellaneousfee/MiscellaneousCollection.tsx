import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apiGet, apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_MISCELLANEOUS_COLLECTION,
  CLASS_LIST,
  DIVISION_LIST,
} from "../../../config/BaseUrl";
import Select from "react-select";
import {
  clearFeeHeadDiv,
  setDefaultFeeHead,
  tryFetchMiscellaneousSettingList,
  tryGenerateReceipt,
} from "../../../slices/settings/miscellaneousSettingSlice";
import FeeHeadDiv from "./FeeHeadDiv";
import MiscellaneousCollectionReceiptModal from "../../receipt/MiscellaneousCollectionReceiptModal";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import {
  clearSearch,
  tryFetchAutoCompleteSearch,
} from "../../../slices/navsearch/ClassWiseSearchSlice";

const MiscellaneousCollection = () => {
  const dispatch: any = useDispatch();
  const inputReference: any = useRef(null);
  const feeHeadData: any = useSelector(
    (state: any) => state.miscellaneousSetting
  );
  const currentYear = localStorage.getItem("year") || "";

  const searchResult = useSelector((state: any) => state.classWiseList);
  const [classOptions, setYearOptions] = useState([]);
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [feeHeadDiv, setFeeHeadDiv] = useState([<FeeHeadDiv />]);
  const [search, setSearch] = useState("");
  const [isRadio, setIsRadio] = useState(1);

  const [values, setValues] = useState({
    academic_year: currentYear,
    register_no: "",
    name: "",
    class: "",
    division: "",
    fine: "",
    remarks: "",
  });
  var paymentMethod: string | Blob = "";
  switch (isRadio) {
    case 1:
      paymentMethod = "cash";
      break;
    case 2:
      paymentMethod = "card";
      break;
    case 3:
      paymentMethod = "cheque";
      break;
    case 4:
      paymentMethod = "DD";
      break;
    case 5:
      paymentMethod = "bank";
      break;
  }
  const handleChange = (e: any) => {
    setIsRadio(+e.currentTarget.value);
  };
  const [receiptModal, setReceiptModal] = useState(false);
  const [isModalClosed, setisModalClosed] = useState(false);

  const addFeeHeadDiv = () => {
    setFeeHeadDiv([...feeHeadDiv, <FeeHeadDiv />]);
  };
  const removeFeeHeadDiv = (index: number) => {
    var array = [...feeHeadDiv];
    if (index !== -1) {
      array.splice(index, 1);
      setFeeHeadDiv(array);
    }
  };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      // console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
        setYearOptions(resp.response.data.data);
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
  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setClassList(resp.response.data.data);
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
  async function getDivisionList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(DIVISION_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setDivisionList(resp.response.data.data);
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
    dispatch(tryFetchMiscellaneousSettingList());
    getAcademicYear();
    getClassList();
    getDivisionList();
    // setValues({ ...values, academic_year: "2022-2023" });
    return () => {
      dispatch(clearFeeHeadDiv());
    };
  }, []);
  const academicYearOptions = classOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const classListOptions: any = classList.map((items: any) => {
    return {
      value: items.id,
      label: items.class_name,
    };
  });
  const divisionOptions: any = divisionList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;

      var body = {
        Authorization: token,
        academic_year: values.academic_year,
        adm_no: values.register_no,
        class_id: values.class,
        division_id: values.division,
        student_name: values.name,
        feelist: feeHeadData.addFeeHead,
        fine: values.fine,
        remarks: values.remarks,
        payment_mode: paymentMethod,
      };
      console.log("values", body);
      let resp: any = await apiPost(ADD_MISCELLANEOUS_COLLECTION, body);
      console.log("mis collection datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data !== "") {
        clearDatas();
        setReceiptModal(true);
        dispatch(tryGenerateReceipt(resp.response.data.data));
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
  const handleAutoCompleteSearch = (e: any) => {
    var data = {
      id: e.target.value,
      year: values.academic_year,
    };
    dispatch(tryFetchAutoCompleteSearch(data));
    if (e.target.value == "") {
      dispatch(clearSearch());
    }
    setSearch(e.target.value);
  };
  const handleSelectAdmn = (results: any) => {
    setSearch(results.old_admission_no);
    setValues({
      ...values,
      register_no: results.old_admission_no,
      name:
        results.first_name +
        " " +
        results.middle_name +
        " " +
        results.last_name,
      class: results.class,
      division: results.division,
    });
    // console.log("search result on click", results);
    dispatch(clearSearch());
  };
  const clearDatas = () => {
    // dispatch(clearFeeHeadDiv());
    setSearch("");
    setValues({
      academic_year: "",
      register_no: "",
      name: "",
      class: "",
      division: "",
      fine: "",
      remarks: "",
    });
  };
  const setCloseModal = () => {
    window.location.reload();
  };
  return (
    <div className="page-inner-content">
      <form onSubmit={handleSubmit}>
        <Card className="b-none">
          <Card.Body>
            <div className="bold mb-4 ">Add Miscellaneous Fee Collection</div>
            <div className="setting-container">
              <Row>
                <Col md={4} className="setting-field-col">
                  <label>Academic Year</label>
                  {/* <Select
                    options={academicYearOptions}
                    placeholder="Academic Year"
                    styles={customStyles}
                    onChange={(e: any) => {
                      setValues({ ...values, academic_year: e.value });
                    }}
                    defaultValue={academicYearOptions.find(
                      (value: any) => value == "2022-2023"
                    )}
                  /> */}
                  <select
                    name="academic_year"
                    className="form-input"
                    onChange={(e: any) => {
                      setValues({ ...values, academic_year: e.target.value });
                    }}
                    value={values.academic_year || ""}
                  >
                    {academicYearOptions?.map((year: any) => (
                      <option key={year.value} value={year.value}>
                        {year.label}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={4} className="setting-field-col">
                  <label>Admission Number</label>
                  <div className="custom-search">
                    <input
                      type="text"
                      placeholder="Enter admission number"
                      className="form-input"
                      onChange={handleAutoCompleteSearch}
                      // onChange={(e: any) => {
                      //   setValues({ ...values, register_no: e.target.value });
                      // }}
                      value={search}
                    />
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
                                onClick={() => handleSelectAdmn(results)}
                                tabIndex={0}
                                // onClick={() =>
                                //   handleFetchConsolidatedReport(results)
                                // }
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
                          }
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
                <Col md={2} className="setting-field-col">
                  <label>Class</label>
                  <select
                    name="class"
                    value={values.class}
                    onChange={(e) => {
                      console.log("clss", e);
                      setValues({ ...values, class: e.target.value });
                    }}
                    className="form-input"
                  >
                    {classList.map((items: any) => {
                      return (
                        <option value={items.id}>{items.class_name}</option>
                      );
                    })}
                  </select>
                  {/* <Select
                    options={classListOptions}
                    placeholder="Select class"
                    styles={customStyles}
                    onChange={(e: any) => {
                      setValues({ ...values, class: e.value });
                    }}
                    defaultValue={classListOptions.filter(
                      (item: any) => item.label === "UKG"
                    )}
                    filterOption={(option) => option.label !== "All"}
                  /> */}
                </Col>
                <Col md={2} className="setting-field-col">
                  <label>Division</label>
                  <select
                    name="division"
                    value={values.division}
                    onChange={(e) => {
                      console.log("div", e.target.value);
                      setValues({ ...values, division: e.target.value });
                    }}
                    className="form-input"
                  >
                    {divisionList.map((items: any) => {
                      return <option value={items.id}>{items.name}</option>;
                    })}
                  </select>
                  {/* <Select
                    options={divisionOptions}
                    placeholder="Select division"
                    styles={customStyles}
                    onChange={(e: any) => {
                      setValues({ ...values, division: e.value });
                    }}
                    defaultInputValue={values.division}
                    filterOption={(option) => option.label !== "All"}
                  /> */}
                </Col>
                <Col md={12} className="setting-field-col">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="form-input"
                    required
                    onChange={(e: any) => {
                      setValues({ ...values, name: e.target.value });
                    }}
                    value={values.name}
                  />
                </Col>

                {feeHeadDiv?.map((items, key) => {
                  return (
                    <FeeHeadDiv
                      array={feeHeadDiv}
                      add={addFeeHeadDiv}
                      index={key}
                      delete={removeFeeHeadDiv}
                    />
                  );
                })}
                {/* <Col md={4} className="setting-field-col">
                  <label>Fine</label>
                  <input
                    type="text"
                    placeholder="Enter fine"
                    className="form-input"
                    onChange={(e: any) => {
                      setValues({ ...values, fine: e.target.value });
                    }}
                  />
                </Col> */}
                <Col md={6} className="setting-field-col">
                  <label>Remarks</label>
                  <input
                    type="text"
                    placeholder="Enter remarks"
                    className="form-input"
                    onChange={(e: any) => {
                      setValues({ ...values, remarks: e.target.value });
                    }}
                    value={values.remarks}
                  />
                </Col>
              </Row>
              <Row>
                <label>Payment Mode</label>
              </Row>
              <Row>
                <Col
                  className="d-flex justify-content-between mt-3"
                  style={{ fontSize: "13px" }}
                  md={5}
                >
                  <div className="d-flex align-center gap-1">
                    <input
                      type="radio"
                      name="pay"
                      value="1"
                      onChange={handleChange}
                      checked={isRadio === 1}
                    />
                    Cash
                  </div>
                  <div className="d-flex align-center gap-1">
                    <input
                      type="radio"
                      name="pay"
                      value="2"
                      onChange={handleChange}
                      checked={isRadio === 2}
                    />
                    Card
                  </div>
                  <div className="d-flex align-center gap-1">
                    <input
                      type="radio"
                      name="pay"
                      value="3"
                      onChange={handleChange}
                      checked={isRadio === 3}
                    />
                    Cheque
                  </div>
                  <div className="d-flex align-center gap-1">
                    <input
                      type="radio"
                      name="pay"
                      value="4"
                      onChange={handleChange}
                      checked={isRadio === 4}
                    />
                    DD
                  </div>
                  <div className="d-flex align-center gap-1">
                    <input
                      type="radio"
                      name="pay"
                      value="5"
                      onChange={handleChange}
                      checked={isRadio === 5}
                    />
                    Bank
                  </div>
                </Col>
              </Row>
            </div>
            <div className="mt-5 text-end">
              <button className="btn-view" role="submit">
                Add Fees
              </button>
            </div>
          </Card.Body>
        </Card>
      </form>
      <MiscellaneousCollectionReceiptModal
        openModal={receiptModal}
        setOpenModal={setReceiptModal}
        closeModal={() => setCloseModal()}
      />
    </div>
  );
};

export default MiscellaneousCollection;
