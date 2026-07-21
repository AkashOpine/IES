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
  MISCELLANEOUS_COLLECTION_DETAILS_BY_ID,
  UPDATE_MISCELLANEOUS_COLLECTION,
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
import { useNavigate, useParams } from "react-router-dom";
import { tryFetchMiscellaneousReportData } from "../../../slices/reports/paymentReportSlice";
import { toast } from "react-toastify";
interface FeeHead {
  fee_head_id: string;
  amount: string;
  remarks: string;
  [key: string]: string;
}
const MiscellaneousCollection = () => {
  const dispatch: any = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const inputReference: any = useRef(null);
  const feeHeadData: any = useSelector(
    (state: any) => state.miscellaneousSetting,
  );
  const miscFilters = useSelector(
    (state: any) => state.paymentreport.miscFilters,
  );
  const currentYear = localStorage.getItem("year") || "";
  useEffect(() => {
    if (id) {
      getItemById(id);
    }
  }, [id]);

  const [feeHeadDiv, setFeeHeadDiv] = useState<FeeHead[]>([
    {
      fee_head_id: "",
      amount: "",
      remarks: "",
    },
  ]);

  const searchResult = useSelector((state: any) => state.classWiseList);
  const [classOptions, setYearOptions] = useState([]);
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [search, setSearch] = useState("");
  const [isRadio, setIsRadio] = useState<number>(1);
  const [editValues, setEditValues] = useState<any>(null);
  const [values, setValues] = useState({
    academic_year: currentYear,
    register_no: "",
    name: "",
    class: "",
    division: "",
    fine: "",
    remarks: "",
  });
  const paymentMethodMap: Record<number, string> = {
    1: "cash",
    2: "card",
    3: "cheque",
    4: "DD",
    5: "bank",
  };
  const currentDate = new Date().toISOString().split("T")[0];
  const paymentMethod = paymentMethodMap[isRadio] || "";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRadio(Number(e.target.value));
  };
  const [receiptModal, setReceiptModal] = useState(false);
  const [isModalClosed, setisModalClosed] = useState(false);

  useEffect(() => {
    console.log("feeHeadDiv", feeHeadDiv);
  }, [feeHeadDiv]);

  const feeHeadOptions = feeHeadData.miscellaneousSettingList?.map(
    (items: any) => ({
      value: items.fee_amount,
      label: items.fee_head_name,
      id: items.id,
      remarks: items.remarks,
    }),
  );

  const addFeeHeadDiv = () => {
    setFeeHeadDiv([
      ...feeHeadDiv,
      {
        fee_head_id: "",
        amount: "",
        remarks: "",
      },
    ]);
  };

  const removeFeeHeadDiv = (index: number) => {
    const updated = [...feeHeadDiv];
    updated.splice(index, 1);
    setFeeHeadDiv(updated);
  };

  const handleFeeHeadChange = (index: number, field: string, value: any) => {
    const updated = [...feeHeadDiv];
    updated[index][field] = value;
    setFeeHeadDiv(updated);
  };
  useEffect(() => {
    if (editValues && !search) {
      setValues({
        academic_year: editValues?.master?.academic_year,
        register_no: editValues?.master?.adm_no,
        name: editValues?.master?.student_name,
        class: editValues?.master?.class_id,
        division: editValues?.master?.division_id,
        fine: editValues?.master?.fine,
        remarks: editValues?.master?.remarks,
      });
      setSearch(editValues?.master?.adm_no);
      if (editValues?.master?.payment_mode) {
        const map: any = {
          cash: 1,
          card: 2,
          cheque: 3,
          DD: 4,
          bank: 5,
        };

        setIsRadio(map[editValues.master.payment_mode]);
      }
    }

    if (editValues?.details) {
      const formattedData = editValues.details.map((item: any) => ({
        fee_head_id: item.fee_head_id,
        amount: item.fee_amount,
        remarks: item.remarks,
      }));

      setFeeHeadDiv(formattedData);
    }
    console.log("editValues", editValues);
  }, [editValues]);
  useEffect(() => {
    if (feeHeadDiv.length > 0 && feeHeadDiv[0]?.remarks) {
      setValues({
        ...values,
        remarks: feeHeadDiv[0]?.remarks || "",
      });
    }
  }, [feeHeadDiv[0]?.remarks]);

  // useEffect(() => {
  //   console.log("feeHeadData.addFeeHead", feeHeadData.addFeeHead);
  //   if (
  //     feeHeadData.addFeeHead.length > 0 &&
  //     feeHeadData.addFeeHead[0]?.remarks
  //   ) {
  //     setValues({
  //       ...values,
  //       remarks: feeHeadData.addFeeHead[0]?.remarks || "",
  //     });
  //   }
  // }, [feeHeadData.addFeeHead[0]?.remarks]);
  const getItemById = async (id: any) => {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("mis_id", id);

      let resp: any = await apiPost(
        MISCELLANEOUS_COLLECTION_DETAILS_BY_ID,
        bodyFormData,
      );
      console.log(" setting datas by id  is ", resp);
      if (resp.response.data.status === 200) {
        setEditValues(resp.response.data.data);
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

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token") as string;

      const validFeeList = feeHeadDiv.filter(
        (item: any) => item.fee_head_id && item.amount,
      );

      const body: any = {
        Authorization: token,
        academic_year: values.academic_year,
        adm_no: values.register_no,
        class_id: values.class,
        division_id: values.division,
        student_name: values.name,
        fine: values.fine,
        remarks: values.remarks,
        payment_mode: paymentMethod,
      };

      validFeeList.forEach((item: any, index: number) => {
        body[`feelist[${index}][fee_head_id]`] = item.fee_head_id;
        body[`feelist[${index}][amount]`] = item.amount;
      });

      const editBody: any = {
        mis_id: editValues?.master?.id,
        Authorization: token,
        academic_year: values.academic_year,
        adm_no: values.register_no,
        receipt_no: editValues?.master?.receipt_no,
        date: currentDate,
        class_id: values.class,
        division_id: values.division,
        student_name: values.name,
        fine: values.fine,
        remarks: values.remarks,
        payment_mode: paymentMethod,
      };

      validFeeList.forEach((item: any, index: number) => {
        editBody[`feelist[${index}][fee_head_id]`] = item.fee_head_id;
        editBody[`feelist[${index}][amount]`] = item.amount;
      });

      console.log("body", body);
      console.log("editBody", editBody);

      let resp: any;

      if (editValues?.master?.id) {
        resp = await apiPost(UPDATE_MISCELLANEOUS_COLLECTION, editBody);
      } else {
        resp = await apiPost(ADD_MISCELLANEOUS_COLLECTION, body);
      }

      console.log("mis collection datas is ", resp);

      if (resp.response.data.status === 200 && resp.response.data.data !== "") {
        clearDatas();

        if (editValues?.master?.id) {
          toast.success("Miscellaneous Collection Updated saved");
          dispatch(tryFetchMiscellaneousReportData(miscFilters));
          navigate("/miscellaneous-report");
        } else {
          toast.success("Miscellaneous Collection Saved");
          setReceiptModal(true);
          dispatch(tryGenerateReceipt(resp.response.data.data));
        }
      } else {
        alert("Something happened please try again");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
      } else {
        console.log("unexpected error: ", error);
      }
    }
  }

  const handleAutoCompleteSearch = (e: any) => {
    const value = e.target.value;

    setSearch(value);
    setValues({ ...values, register_no: value });
    console.log("valuesssssssssssss", values);

    var data = {
      id: value,
      year: values.academic_year,
    };

    dispatch(tryFetchAutoCompleteSearch(data));

    if (value === "") {
      dispatch(clearSearch());
    }
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
            <div className="bold mb-4 ">
              {editValues ? "Edit" : "Add"} Miscellaneous Fee Collection
            </div>
            <div className="setting-container">
              <Row>
                <Col md={4} className="setting-field-col">
                  <label>Academic Year</label>
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
                                key={results.old_admission_no}
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
                          },
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

                {feeHeadDiv.map((item, key) => (
                  <FeeHeadDiv
                    key={key}
                    array={feeHeadDiv}
                    index={key}
                    item={item}
                    feeHeadOptions={feeHeadOptions}
                    add={addFeeHeadDiv}
                    delete={removeFeeHeadDiv}
                    onChange={handleFeeHeadChange}
                  />
                ))}
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
                  <textarea
                    rows={5}
                    placeholder="Enter remarks"
                    className="form-input"
                    style={{
                      height: "auto",
                      paddingTop: "10px",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
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
                {editValues ? "Update" : "Add"} Fees
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
