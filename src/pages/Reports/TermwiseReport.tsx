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
import { FaChevronRight, FaDownload } from "react-icons/fa";
import { apiPost } from "../../config/apiConfig";
import { CLASS_LIST } from "../../config/BaseUrl";
import axios from "axios";
import { tryFetchTermWiseReportData } from "../../slices/reports/paymentReportSlice";
function TermwiseReport() {
  const report: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const dispatch = useDispatch();

  // HEADER STATES
  const [classId, setClassId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [classList, setClassList] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Sl.no",
      valueGetter: (params: any) => {
        return params.node ? params.node.rowIndex + 1 : null;
      },
      width: 110,

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
      field: "class_name",
      headerName: "Class",
      width: 110,
      headerTooltip: "Class",
    },
    {
      field: "application_no",
      headerName: "Appl.No",
      width: 110,
      headerTooltip: "Appl.No",
    },
    {
      width: 110,
      field: "date_of_registration",
      headerName: "Date of registration",
      headerTooltip: "Date of registration",
    },

    {
      field: "payment_type",
      headerName: "Payment Type",
      headerTooltip: "Payment Type",
    },
    {
      field: "payment_mode",
      headerName: "Payment Mode",
      headerTooltip: "Payment Mode",
    },
    {
      field: "fee_amount",
      headerName: "Amount",
      headerTooltip: "Amount",
    },
  ]);
  useEffect(() => {
    console.log("TermWiseReportData", report?.TermWiseReportData);
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
  const onGridReady = useCallback(
    (params: any) => {
      return report?.preRegistrationReport;
    },
    [report?.preRegistrationReport]
  );
  const footerData = [report?.TermWiseReportData?.grand_total]?.map(
    (footerRow) => {
      return {
        term: "Total",
        ...report?.TermWiseReportData?.heads?.reduce(
          (rowData: any, field: any, index: any) => {
            rowData[field] = footerRow[field];
            return rowData;
          },
          {}
        ),
      };
    }
  )[0];
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
  const classOptions: any = classList.map((items: any) => {
    return {
      value: items.id,
      label: items.class_name,
    };
  });

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
  useEffect(() => {
    getClassList();
    dispatch(tryFetchTermWiseReportData());
  }, []);
  const handleClass = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setClassId(selectedValues);
  };

  return (
    <>
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
                columnDefs={report?.TermWiseReportData?.header?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field: report?.TermWiseReportData?.heads[index],
                  })
                )}
                rowData={
                  report?.TermWiseReportData?.result
                    ? report?.TermWiseReportData?.result
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
                pinnedBottomRowData={[footerData]}
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

export default TermwiseReport;
