import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FaChevronRight, FaDownload, FaEye } from "react-icons/fa";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import { apiPost } from "../../config/apiConfig";
import { ACADEMIC_YEAR, CLASS_LIST } from "../../config/BaseUrl";
import Moment from "moment";
import axios from "axios";
import { tryFetchPreRegistrationReport } from "../../slices/preRegistration/preRegistrationSlice";
import ReceiptModal from "./RecieptModal";
import { onBtExport } from "../Reports/headerComponents/ExportExcel";
function PreRegistrationReport() {
  const report: any = useSelector((state: any) => state.PreRegistration);
  const gridRef: any = useRef();
  const dispatch = useDispatch();
  const currentYear = localStorage.getItem("year");

  // HEADER STATES
  const [classId, setClassId] = useState("");
  const [year, setYear] = useState(currentYear);
  const [yearOptions, setYearOptions] = useState([]);
  const [classList, setClassList] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  function receiptModal(row: any) {
    console.log("row______________", row.data);
    setReceiptId(row?.data.application_no);
    setReceiptModalOpen(true);
  }
  useEffect(() => {
    console.log("daily fee coll", report?.preRegistrationReport.data);
  }, [report]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    []
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
  // const onGridReady = useCallback(
  //   (params: any) => {
  //     return report?.preRegistrationReport;
  //   },
  //   [report?.preRegistrationReport]
  // );
  // const footerData = [report?.preRegistrationReport?.dcbfoot]?.map(
  //   (footerRow) => {
  //     return {
  //       totalLabel: "Total",
  //       ...report?.preRegistrationReport?.dcbheads?.reduce(
  //         (rowData: any, field: any, index: any) => {
  //           rowData[field] = footerRow[field];
  //           return rowData;
  //         },
  //         {}
  //       ),
  //     };
  //   }
  // )[0];
  // const getRowStyle = useCallback((params: any) => {
  //   if (params.node.rowPinned) {
  //     return {
  //       "font-weight": "bold",
  //     };
  //   }
  // }, []);

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
  const classOptions: any = classList.map((items: any) => {
    return {
      value: items.id,
      label: items.class_name,
    };
  });
  const AcademicYearOptions = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status === 200) {
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
  useEffect(() => {
    getClassList();
    getAcademicYear();
  }, []);
  const handleClass = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setClassId(selectedValues);
  };

  const handlePaymentReport = () => {
    var data = {
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      toDate: Moment(toDate).format("YYYY-MM-DD"),
      class: classId,
      year: year,
    };
    dispatch(tryFetchPreRegistrationReport(data));
  };
  const createData = (count: number) => {
    // Map through the head_res array and match the footer data accordingly
    const result = [];

    for (let i = 0; i < count; i++) {
      const row = report?.preRegistrationReport.data?.heads_res?.reduce(
        (rowData: any, field: string) => {
          if (field === "sl_no") {
            rowData[field] = "Total";
          } else if (
            report?.preRegistrationReport.data?.footer?.hasOwnProperty(field)
          ) {
            rowData[field] = report?.preRegistrationReport.data?.footer[field];
          } else {
            // If no match, set empty string as fallback
            rowData[field] = "";
          }
          return rowData;
        },
        {}
      );

      result.push(row);
    }

    return result;
  };
  const pinnedBottomRowData = useMemo(() => {
    return createData(1);
  }, [report?.preRegistrationReport.data?.footer]);
  const columnDefs = [
    ...(Array.isArray(report?.preRegistrationReport.data?.heads)
      ? report?.preRegistrationReport.data?.heads.map(
          (heading: string, index: number) => ({
            headerName: heading, // Set the column header from heads array
            field:
              report?.preRegistrationReport?.data?.heads_res?.[index] || "", // Set the field name from heads_res array or empty string
          })
        )
      : []),
    report?.preRegistrationReport.data?.heads
      ? {
          field: "action",
          headerName: "Action",
          width: 180,
          cellRendererFramework: (params: any) => (
            <div
              className="roundbtn"
              onClick={() => {
                receiptModal(params);
                console.log("params", params);
              }}
            >
              <FaEye color="#556EE6" />
            </div>
          ),
          headerTooltip: "Action",
        }
      : "",
  ];

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
                (option) => option.value === year
              )}
            />
            <Select
              options={classOptions}
              isMulti
              placeholder="Class"
              styles={customStyles}
              onChange={handleClass}
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
            <button
              className="button-70"
              onClick={handlePaymentReport}
              // disabled={}
            >
              <span>Search</span>
            </button>
          </div>
          <div className="btn-export">
            <button
              onClick={() => onBtExport(report?.preRegistrationReport.excel)}
            >
              <FaDownload /> <span>Export to excel</span>
            </button>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        {!report?.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                {/* <button
                    onClick={() => onBtExport(report?.dcbReportExcel)}
                    disabled={report?.dcbReportExcel === ""}
                  >
                    <FaDownload /> <span>Export to excel</span>
                  </button> */}
              </div>
              <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={
                  report?.preRegistrationReport.data?.data
                    ? report?.preRegistrationReport.data?.data
                    : []
                }
                // columnDefs={report.dcbReportData?.dcbheader?.map(
                //   (heading: string, index: number) => ({
                //     headerName: heading,
                //     field: report.dcbReportData?.dcbheads[index],
                //   })
                // )}
                // rowData={
                //   report.dcbReportData?.dcbresult
                //     ? report.dcbReportData?.dcbresult
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
                pinnedBottomRowData={pinnedBottomRowData}
                // pinnedBottomRowData={[footerData]}
              />
            </div>
            <ReceiptModal
              modalOpen={receiptModalOpen}
              setOpen={setReceiptModalOpen}
              admNo={receiptId}
              year={year}
              type="registration"
            />
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

export default PreRegistrationReport;
