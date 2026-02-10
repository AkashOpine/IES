import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FaChevronRight } from "react-icons/fa";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import Moment from "moment";
import { tryFetchStudentPaymentTypeReport } from "../../slices/preRegistration/preRegistrationSlice";
import { apiPost } from "../../config/apiConfig";
import { ACADEMIC_YEAR } from "../../config/BaseUrl";
import axios from "axios";
function StudentPaymentTypeReport() {
  const paymentReport: any = useSelector((state: any) => state.PreRegistration);
  const gridRef: any = useRef();
  const dispatch = useDispatch();

  // HEADER STATES
  const [paymentMode, setPaymentMode] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [yearOptions, setYearOptions] = useState([]);
  const currentYear = localStorage.getItem("year");

  const [year, setYear] = useState(currentYear);

  // const [columnDefs] = useState([
  //   {
  //     headerName: "Sl.no",
  //     valueGetter: (params: any) => {
  //       return params.node ? params.node.rowIndex + 1 : null;
  //     },
  //     width: 125,
  //     headerCheckboxSelection: false,
  //     checkboxSelection: false,
  //     headerTooltip: "Serial Number",
  //   },
  //   {
  //     field: "academic_year",
  //     headerName: "Academic Year",
  //     headerTooltip: "Academic Year",
  //   },
  //   {
  //     field: "first_name",
  //     headerName: "Name",
  //     headerTooltip: "Student Name",
  //   },
  //   {
  //     field: "class_name",
  //     headerName: "Class",
  //     headerTooltip: "Class",
  //   },
  //   {
  //     field: "date_of_registration",
  //     headerName: "Date of registration",
  //     width: 150,
  //     headerTooltip: "Date of registration",
  //   },
  //   {
  //     field: "father",
  //     headerName: "Parent Name",
  //     //   width: 110,
  //     headerTooltip: "Parent Name",
  //   },
  //   {
  //     field: "fmobile",
  //     headerName: "Contact Number",
  //     headerTooltip: "Contact Number",
  //   },
  //   {
  //     field: "application_status",
  //     headerName: "Application Status",
  //     headerTooltip: "Application Status",
  //   },
  // ]);
  const columnDefs = [
    ...(Array.isArray(paymentReport?.studentPaymentTypeReport.heads)
      ? paymentReport?.studentPaymentTypeReport.heads.map(
          (heading: string, index: number) => ({
            headerName: heading, // Set the column header from heads array
            field:
              paymentReport?.studentPaymentTypeReport?.heads_res?.[index] || "", // Set the field name from heads_res array or empty string
          }),
        )
      : []),
  ];

  useEffect(() => {
    console.log(
      "daily fee coll paymentrepott",
      paymentReport?.studentPaymentTypeReport,
    );
  }, [paymentReport]);

  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);

      if (resp.response.data.status === 200) {
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
  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    [],
  );
  const sideBar: any = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        minWidth: 225,
        maxWidth: 225,
        width: 225,
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: "right",
    defaultToolPanel: "",
  };

  //header functions
  const separater = useMemo(() => {
    return <div className="sep"></div>;
  }, []);
  const arrowDown = useMemo(() => {
    return (
      <div className="arrow">
        <FaChevronRight />
      </div>
    );
  }, []);
  // const classOptions: any = classList.map((items: any) => {
  //   return {
  //     value: items.id,
  //     label: items.class_name,
  //   };
  // });

  // async function getClassList() {
  //   try {
  //     var token = localStorage.getItem("token") as string;
  //     var bodyFormData = new FormData();
  //     bodyFormData.append("Authorization", token);
  //     let resp: any = await apiPost(CLASS_LIST, bodyFormData);
  //     console.log("data is ", resp);
  //     if (resp.response.data.status == 200) {
  //       setClassList(resp.response.data.data);
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log("error message: ", error.message);
  //       return error.message;
  //     } else {
  //       console.log("unexpected error: ", error);
  //       return "An unexpected error occurred";
  //     }
  //   }
  // }
  const paymentOptions = [
    { value: "Card", label: "Card" },
    { value: "Cash", label: "Cash" },
    { value: "Bank", label: "Bank" },
    { value: "Online", label: "Online" },
    { value: "Adv.Fee", label: "Adv.Fee" },
  ];
  const AcademicYearOptions = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });

  const handlePaymentReport = () => {
    var data = {
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      toDate: Moment(toDate).format("YYYY-MM-DD"),
      payment_type: paymentMode,
      year: year,
    };
    dispatch(tryFetchStudentPaymentTypeReport(data));
  };
  useEffect(() => {
    getAcademicYear();
  }, []);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <div className="header-items">
            <Select
              options={AcademicYearOptions}
              placeholder="Select year"
              styles={customStyles}
              onChange={(e: any) => setYear(e.value)}
              value={AcademicYearOptions.filter(
                (option) => option.value === year,
              )}
            />
            <DatePicker
              onChange={setFromDate}
              value={fromDate}
              className="datepicker"
              clearIcon={separater}
              calendarIcon={arrowDown}
              dayPlaceholder="day"
              monthPlaceholder="month"
              yearPlaceholder="year"
              format="y-MM-dd"
            />
            <span
              style={{ color: "#80808F", fontSize: "14px", fontWeight: "500" }}
            >
              TO
            </span>
            <DatePicker
              onChange={setToDate}
              value={toDate}
              className="datepicker"
              clearIcon={separater}
              calendarIcon={arrowDown}
              dayPlaceholder="day"
              monthPlaceholder="month"
              yearPlaceholder="year"
              format="y-MM-dd"
              // minDate={fromDate}
            />
            <Select
              options={paymentOptions}
              placeholder="Select mode of Payment"
              styles={customStyles}
              onChange={(e: any) => {
                setPaymentMode(e.value);
              }}
              // defaultValue={classOptions.filter(
              //   (item: any) => item.label === "All"
              // )}
              // filterOption={(option) => option.label !== "All"}
            />
            <button
              className="button-70"
              onClick={handlePaymentReport}
              // disabled={}
            >
              <span>Search</span>
            </button>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        {!paymentReport?.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                {/* <button
                    onClick={() => onBtExport(paymentReport?.dcbReportExcel)}
                    disabled={paymentReport?.dcbReportExcel === ""}
                  >
                    <FaDownload /> <span>Export to excel</span>
                  </button> */}
              </div>
              <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={
                  paymentReport?.studentPaymentTypeReport?.data?.length > 0
                    ? paymentReport?.studentPaymentTypeReport?.data
                    : []
                }
                // columnDefs={paymentReport.dcbReportData?.dcbheader?.map(
                //   (heading: string, index: number) => ({
                //     headerName: heading,
                //     field: paymentReport.dcbReportData?.dcbheads[index],
                //   })
                // )}
                // rowData={
                //   paymentReport.dcbReportData?.dcbresult
                //     ? paymentReport.dcbReportData?.dcbresult
                //     : []
                // }
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                sideBar={sideBar}
                pagination
                // onGridReady={onGridReady}
                // getRowStyle={getRowStyle}
                // rowClassRules={{
                //   "total-row": (params) => {
                //     return params.node.rowPinned === "bottom";
                //   },
                // }}
                // pinnedBottomRowData={[footerData]}
              />
            </div>
          </Col>
        ) : (
          <Col md={12} className="loaderContainer">
            <Spinner animation="grow" variant="primary" />
          </Col>
        )}
      </Row>
    </>
  );
}

export default StudentPaymentTypeReport;
