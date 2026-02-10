import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { ACADEMIC_YEAR } from "../../config/BaseUrl";
import Moment from "moment";
import axios from "axios";
import { tryFetchAdmissionFeeReport } from "../../slices/preRegistration/preRegistrationSlice";
import FeeReceiptModal from "../receipt/FeeReceiptModal";
import ReceiptModal from "./RecieptModal";
import { onBtExport } from "../Reports/headerComponents/ExportExcel";
function AdmissionFeeReport() {
  const paymentReport: any = useSelector(
    (state: any) => state.PreRegistration?.admissionFeeReport
  );
  const gridRef: any = useRef();
  const dispatch = useDispatch();
  // HEADER STATES
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const currentYear = localStorage.getItem("year");
  const [year, setYear] = useState(currentYear);
  const [receiptId, setReceiptId] = useState("");
  const [yearOptions, setYearOptions] = useState([]);

  const [columnDefs] = useState([
    {
      headerName: "Sl.no",
      valueGetter: (params: any) => {
        return params.node ? params.node.rowIndex + 1 : null;
      },
      width: 100,
      headerCheckboxSelection: false,
      checkboxSelection: false,
      headerTooltip: "Serial Number",
    },
    {
      field: "first_name",
      headerName: "Name",
      headerTooltip: "Student Name",
    },
    {
      field: "academic_year",
      headerName: "Academic Year",
      width: 120,
      headerTooltip: "Academic Year",
    },
    {
      field: "old_admission_no",
      width: 100,
      headerName: "Adm No",
      headerTooltip: "Adm No",
    },
    {
      field: "date",
      headerName: "Date ",
      headerTooltip: "Date",
      width: 120,
    },
    {
      field: "class_div",
      headerName: "Class",
      width: 100,
      headerTooltip: "Class",
    },
    {
      field: "application_no",
      headerName: "Appl.No",
      width: 110,
      headerTooltip: "Appl.No",
    },
    {
      field: "fee_amt",
      headerName: "ADMN Fee",
      width: 110,
      headerTooltip: "ADMN Fee",
    },
    {
      field: "cd",
      width: 110,
      headerName: "CD Fee",
      headerTooltip: "CD Fee",
    },
    {
      field: "pay_type",
      width: 100,
      headerName: "Payment Type",
      headerTooltip: "Payment Type",
    },
    {
      field: "application_status",
      width: 150,
      headerName: "Application Status",
      headerTooltip: "Application Status",
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      cellRendererFramework: (params: any) => (
        <div className="roundbtn" onClick={() => receiptModal(params)}>
          <FaEye color="#556EE6" />
        </div>
      ),
      headerTooltip: "Action",
    },
  ]);
  function receiptModal(row: any) {
    console.log("row______________", row.data);
    setReceiptId(row?.data.application_no);
    setReceiptModalOpen(true);
  }

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
  //     return paymentReport?.preRegistrationReport;
  //   },
  //   [paymentReport?.preRegistrationReport]
  // );
  const createData = (count: number) => {
    // Map through the head_res array and match the footer data accordingly
    const result = [];

    for (let i = 0; i < count; i++) {
      const row = paymentReport?.data?.heads_res?.reduce(
        (rowData: any, field: string) => {
          if (field === "sl_no") {
            rowData[field] = "Total";
          } else if (paymentReport?.data?.footer?.hasOwnProperty(field)) {
            rowData[field] = paymentReport?.data?.footer[field];
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
  }, [paymentReport?.data?.footer]);
  const getRowStyle = useCallback((params: any) => {
    if (params.node.rowPinned) {
      return {
        "font-weight": "bold",
      };
    }
  }, []);

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
  const AcademicYearOptions = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
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
    getAcademicYear();
  }, []);
  // const handleClass = (selectedOptions: any) => {
  //   const selectedValues = selectedOptions
  //     .map((option: any) => option.value)
  //     .join(",");
  //   setClassId(selectedValues);
  // };

  const handlePaymentReport = () => {
    var data = {
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      toDate: Moment(toDate).format("YYYY-MM-DD"),
      year: year,
    };
    dispatch(tryFetchAdmissionFeeReport(data));
  };
  // const gridOptions = {
  //   domLayout: "autoHeight",
  //   columnDefs: [
  //     // Define your column definitions here
  //   ],
  // };
  useEffect(() => {
    console.log("fasssssss+++++++== ", paymentReport); // Check if data is being fetched correctly
  }, [paymentReport?.data]);

  useEffect(() => {
    if (receiptModalOpen === false) {
      setReceiptId("");
    }
  }, [receiptModalOpen]);

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
            <button onClick={() => onBtExport(paymentReport?.excel)}>
              <FaDownload /> <span>Export to excel</span>
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
                columnDefs={[
                  ...(paymentReport?.data?.heads?.length
                    ? paymentReport?.data?.heads?.map(
                        (heading: string, index: number) => ({
                          headerName: heading, // Set the column header from heads array
                          field: paymentReport?.data?.heads_res?.[index] || "", // Set the field name from heads_res array or empty string
                        })
                      )
                    : []),
                  paymentReport?.data?.heads
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
                ]}
                rowData={paymentReport?.data?.data || []} // Ensure rowData is an array
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                pinnedBottomRowData={pinnedBottomRowData}
                sideBar={sideBar}
                pagination
              />
            </div>
            <ReceiptModal
              modalOpen={receiptModalOpen}
              setOpen={setReceiptModalOpen}
              admNo={receiptId}
              year={year}
              type="admission"
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

export default AdmissionFeeReport;
