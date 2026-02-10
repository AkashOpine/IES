import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import PaymentReportHeader from "./headerComponents/PaymentReportHeader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import Loader from "../../components/layout/aggrid/Loader";
import PaymentModeReportHeader from "./headerComponents/PaymentModeReportHeader";
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "./headerComponents/ExportExcel";

function PaymentMode() {
  const paymentModeReport: any = useSelector(
    (state: any) => state.paymentreport
  );
  const gridRef: any = useRef();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi]: any = useState(null);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Sl.no",
      valueGetter: (params: any) => {
        return params.node ? params.node.rowIndex + 1 : null;
      },
      width: 125,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerTooltip: "Serial Number",
    },
    {
      field: "old_admission_no",
      headerName: "Admn No",
      width: 130,
      headerTooltip: "Admission Number",
    },
    {
      field: "receipt_no",
      headerName: "Rcpt No",
      width: 110,
      headerTooltip: "Receipt Number",
    },
    {
      field: "student_name",
      headerName: "Name",
      headerTooltip: "Student Name",
    },
    {
      // field: "class",
      headerName: "Class",
      valueGetter: (params: any) =>
        params.data.class + "-" + params.data.division,
      width: 110,
      headerTooltip: "Student Class",
    },
    // {
    //   field: "division",
    //   headerName: "Division",
    //   width: 110,
    //   headerTooltip: "Student Division",
    // },
    {
      field: "academic_year",
      headerName: "Academic Year",
      width: 150,
      headerTooltip: "Academic Year",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerTooltip: "Date Paid",
    },
    {
      field: "payment_type",
      headerName: "Mode",
      width: 110,
      headerTooltip: "Payment Mode",
    },
    {
      field: "total_fine",
      headerName: "Fine",
      width: 110,
      headerTooltip: "Fine Amount",
    },
    {
      field: "total_concession",
      headerName: "Concession",
      width: 110,
      headerTooltip: "Concession",
    },
    {
      field: "total_paid_amt",
      headerName: "Paid Amt",
      width: 110,
      headerTooltip: "Paid Amount",
    },

    {
      field: "cheque_no",
      headerName: "Cheque",
      width: 110,
      headerTooltip: "Cheque Number",
      // hide: (params: any) => (params?.online_txnid ? true : false),
    },
    {
      field: "online_txnid",
      headerName: "Online txnid",
      width: 110,
      headerTooltip: "Online Transaction Id",
    },
    {
      field: "DD_no",
      headerName: "DD",
      width: 110,
      headerTooltip: "Demand Draft",
    },
    {
      field: "bank_name",
      headerName: "Bank name",
      width: 110,
      headerTooltip: "Bank Name",
    },
    {
      field: "bank_br",
      headerName: "Bank branch",

      headerTooltip: "Bank Branch Name",
    },
    {
      field: "remarks",
      headerName: "Remarks",
      headerTooltip: "Remarks",
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      resizable: true,
      sortable: true,
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
  // const onFirstDataRendered = useCallback((params: any) => {
  //   gridRef.current.api.sizeColumnsToFit();
  // }, []);
  const onGridReady = useCallback(
    (params: any) => {
      return paymentModeReport.paymentModeReportData;
    },
    [paymentModeReport.paymentModeReportData]
  );
  useEffect(() => {}, [paymentModeReport.paymentModeReportData]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <PaymentModeReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!paymentModeReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(paymentModeReport.paymentModeReportExcel)
                  }
                  disabled={paymentModeReport.paymentModeReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={paymentModeReport.paymentModeReportData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                defaultColDef={defaultColDef}
                suppressRowClickSelection={true}
                // onFirstDataRendered={onFirstDataRendered}
                sideBar={sideBar}
                pagination
                onGridReady={onGridReady}
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

export default PaymentMode;
