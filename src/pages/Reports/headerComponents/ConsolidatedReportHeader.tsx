import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  tryFetchNewAutoCompleteSearch,
  tryFetchStudentSearchList,
} from "../../../slices/navsearch/ClassWiseSearchSlice";
import {
  tryFetchConsolidatedPaymentHistoryReportData,
  tryFetchConsolidatedReportData,
} from "../../../slices/reports/paymentReportSlice";
import { ACADEMIC_YEAR } from "../../../config/BaseUrl";
import { apiPost } from "../../../config/apiConfig";
import axios from "axios";
import Select, { OptionsOrGroups } from "react-select";
import { customStyles } from "../../../components/inputComponent/SelectStyle";

function ConsolidatedReportHeader(props: any) {
  const searchResult = useSelector((state: any) => state.classWiseList);
  const currentYear = localStorage.getItem("year");
  const [yearOptions, setYearOptions] = useState([]);
  const [year, setYear] = useState(currentYear);
  const inputReference: any = useRef(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [studentId, setStudentId] = useState("");
  const handleAutoCompleteSearch = (e: any) => {
    var body = {
      academicYear: year,
      username: e.target.value,
    };
    dispatch(tryFetchNewAutoCompleteSearch(body));
    if (e.target.value == "") {
      dispatch(clearSearch());
    }
    setSearch(e.target.value);
  };
  const handleFetchConsolidatedReport = (results: any) => {
    console.log("search", results);
    var body = {
      academicYear: year,
      admissionNumber: results.old_admission_no,
    };
    setSearch(results.old_admission_no);
    dispatch(tryFetchConsolidatedReportData(body));
    // setSearch("");
    dispatch(clearSearch());
  };
  const handleRegisterNumber = (results: any) => {
    console.log("result", results);
    setSearch(results.old_admission_no);
    setStudentId(results.id);
    dispatch(clearSearch());
  };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);

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
  const options = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const handleYear = (e: any) => {
    setYear(e.value);
  };

  useEffect(() => {
    getAcademicYear();
  }, []);
  const handleSearch = () => {
    console.log("started search");
    var body = {
      academicYear: year,
      admissionNumber: search,
    };
    if (props.tabKey === "Consolidated") {
      dispatch(tryFetchConsolidatedReportData(body));
    } else if (props.tabKey === "Till") {
      dispatch(tryFetchConsolidatedPaymentHistoryReportData(body));
    } else {
      dispatch(
        tryFetchStudentSearchList({
          academicYear: year,
          studentId: studentId,
        })
      );
    }
  };
  return (
    <div className="header-items">
      {/* {props.tabKey === "Till" || props.tabKey === "History" ? ( */}
      <Select
        options={options}
        placeholder="Select year"
        styles={customStyles}
        value={options.find((item: any) => item.value === year)}
        onChange={handleYear}
      />
      {/* ) : (
        ""
      )} */}
      <div className="custom-search">
        <input
          type="text"
          placeholder="Search with Reg no."
          aria-label="Search"
          className="input-number"
          onChange={handleAutoCompleteSearch}
          value={search}
        ></input>
        {searchResult.newAutoCompleteSearch.length > 0 ? (
          <div className="autocomplete-component" ref={inputReference}>
            {searchResult.newAutoCompleteSearch?.map((results: any) => {
              return (
                <div
                  className="autocomplete-items"
                  // onClick={() => handleClick(results)}
                  onClick={() =>
                    // props.tabKey === "Till" || props.tabKey === "History"
                    handleRegisterNumber(results)
                  }
                >
                  <div className="left">
                    <span className="autocomplete-items-text">
                      {results.first_name} {results.middle_name}{" "}
                      {results.last_name}
                    </span>
                    <span className="adm_no">{results.old_admission_no}</span>
                  </div>
                  <span>
                    {results.class_id} {results.division_id}
                  </span>
                </div>
                // </Link>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>

      <button className="btn-view btn-barcode" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default ConsolidatedReportHeader;
