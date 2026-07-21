import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { ACADEMIC_YEAR, CLASS_LIST, DIVISION_LIST } from "../../config/BaseUrl";
import { apiPost } from "../../config/apiConfig";
import axios from "axios";
import Select from "react-select";
import {
  clearSearch,
  tryFetchAutoCompleteSearch,
  tryFetchClassSearchList,
} from "../../slices/navsearch/ClassWiseSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReportNav from "./bottomNavComponents/ReportNav";
import { tryFetchTransportSettingTableData } from "../../slices/settings/transportSettingSlice";
import TransportReportNav from "./bottomNavComponents/TransportReportNav";
import TransportStudentListNav from "./bottomNavComponents/TransportStudentListNav";
import HostelReportNav from "./bottomNavComponents/HostelReportNav";
import AcademicDcbReportsNav from "./bottomNavComponents/AcademicDcbReportsNav";
import TransportDcbReportNav from "./bottomNavComponents/TransportDcbReportNav";
import HostelDcbReportsNav from "./bottomNavComponents/HostelDcbReportsNav";
import { setClassWiseFilters } from "../../slices/classWiseSlice/classWiseSlice";
export default function BottomNav(props: any) {
  const loginTypeId = localStorage.getItem("roleId");
  const location = useLocation();

  const dispatch = useDispatch();
  const history = useNavigate();
  const customStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: "14px",
        fontWeight: "600",
      };
    },
    control: (base: any, state: { isFocused: any }) => ({
      ...base,

      background: "#f3f6f9",
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      minHeight: 0,
      height: "38px",
      borderColor: "#f3f6f9",

      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#" : "#",
      },
    }),
    menu: (base: any) => ({
      ...base,

      borderRadius: 0,

      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      fontSize: "13px",
      padding: 0,
    }),
  };
  const currentYear = localStorage.getItem("year");
  const [year, setYear] = useState(currentYear);
  const [className, setClassName] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [search, setSearch] = useState("");
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [yearOption, setYearOption] = useState([]);
  const inputReference: any = useRef(null);
  // let [events, setEvents] = React.useState([]);
  // let { keyboardProps } = useKeyboard({
  //   onKeyDown: (e) => setEvents((events) => [`key down: ${e.key}`, ...events]),
  //   onKeyUp: (e) => setEvents((events) => [`key up: ${e.key}`, ...events]),
  // });
  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);
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
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      if (resp.response.data.status == 200) {
        setYearOption(resp.response.data.data);
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
  const handleClass = (e: any) => {
    setClassName(e.value);
  };
  const handleDivision = (e: any) => {
    setDivisionName(e.value);
  };
  const handleYear = (e: any) => {
    setYear(e.value);
  };
  const handleAutoCompleteSearch = (e: any) => {
    var data = {
      id: e.target.value,
      year: year,
    };
    dispatch(tryFetchAutoCompleteSearch(data));
    if (e.target.value == "") {
      dispatch(clearSearch());
    }
    setSearch(e.target.value);
  };
  function fetchClassWiseDetails() {
    const searchValue = {
      classSearch: className,
      divisionSearch: divisionName,
      year: year,
    };

    dispatch(tryFetchClassSearchList(searchValue));
    dispatch(
      setClassWiseFilters({
        year: year || "",
        classId: className || "",
        divisionId: divisionName || "",
      }),
    );

    history(`/class-wise-list`);
  }

  function fetchStudentSearch() {
    const id = searchResult.autoCompleteSearch[0].id;
    if (location.pathname === "/transport-setting") {
      dispatch(tryFetchTransportSettingTableData(id));
      setSearch("");
      dispatch(clearSearch());
    } else {
      history(`/dashboard/${id}`);
      setSearch("");
    }
  }

  const classOptions: any = classList.map((items: any) => {
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
  const academicYearOptions = yearOption?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const searchResult = useSelector((state: any) => state.classWiseList);
  // const handleClick = (result: any) => {
  //   let fullName;
  //   fullName = `${result.first_name} ${result.middle_name} ${result.last_name}`;
  //   setSearch("");
  //   // setSearch(fullName);
  // };
  const handleFetchTransport = (results: any) => {
    if (location.pathname === "/transport-setting") {
      dispatch(tryFetchTransportSettingTableData(results.id));
      setSearch("");
      dispatch(clearSearch());
    } else if (location.pathname === "/concession/student") {
      var data = {
        year: year,
        id: results.id,
      };
      history(`/concession/${results.id}/${year}`);
      dispatch(clearSearch());
      setSearch("");
    } else {
      history(`/dashboard/${results.id}/${year}`);
      setSearch("");
    }
  };
  useEffect(() => {
    getClassList();
    getDivisionList();
    getAcademicYear();
  }, []);
  useEffect(() => {
    return () => {
      setSearch("");
    };
  }, []);

  return (
    <div className="bottomNavContainer navBar">
      {props.navStatus === "MainSearchNav" ? (
        <Row>
          <Col md={12} className="d-flex gap-3 align-items-center">
            <Select
              options={academicYearOptions}
              placeholder="Academic Year"
              styles={customStyles}
              onChange={handleYear}
              value={academicYearOptions.filter(
                (filteredYear) => filteredYear.label == year,
              )}
            />
            <div className="custom-search">
              <input
                type="text"
                placeholder="Search with Reg no."
                aria-label="Search"
                className="search-input"
                onChange={handleAutoCompleteSearch}
                value={search}
              ></input>
              {searchResult.autoCompleteSearch.length > 0 ? (
                <div className="autocomplete-component" ref={inputReference}>
                  {searchResult.autoCompleteSearch?.map((results: any) => {
                    return (
                      // <Link
                      //   to={`/dashboard/${results.id}`}
                      //   onClick={() => handleFetchTransport(results)}
                      // >
                      <div
                        className="autocomplete-items"
                        // onClick={() => handleClick(results)}
                        onClick={() => handleFetchTransport(results)}
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
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              className="button-70"
              role="submit"
              onClick={() => fetchStudentSearch()}
            >
              <span>Search</span>
            </button>
            {location.pathname === "/transport-setting" ? (
              ""
            ) : (
              <>
                <Select
                  options={classOptions}
                  placeholder="Class"
                  styles={customStyles}
                  onChange={handleClass}
                />
                <Select
                  options={divisionOptions}
                  placeholder="Division"
                  styles={customStyles}
                  onChange={handleDivision}
                />
                <button
                  className="button-70"
                  role="button"
                  onClick={() => fetchClassWiseDetails()}
                >
                  <span>Search</span>
                </button>
              </>
            )}
          </Col>
        </Row>
      ) : props.navStatus === "FeeReports" ? (
        <ReportNav />
      ) : props.navStatus === "TransportReports" ? (
        <TransportReportNav />
      ) : props.navStatus === "AcademicDCBreport" ? (
        <AcademicDcbReportsNav />
      ) : props.navStatus === "TransportDCBreport" ? (
        <TransportDcbReportNav />
      ) : props.navStatus === "hostelDCBreport" ? (
        <HostelDcbReportsNav />
      ) : props.navStatus === "TransportStudentList" ? (
        <TransportStudentListNav />
      ) : props.navStatus === "HostelReports" ? (
        <HostelReportNav />
      ) : (
        ""
      )}
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function tryFetchFeeTableData(id: any): any {
  throw new Error("Function not implemented.");
}
