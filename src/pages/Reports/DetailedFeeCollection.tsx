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

import DetailedReportHeader from "./headerComponents/DetailedReportHeader";
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "./headerComponents/ExportExcel";
function DetailedFeeCollection() {
  const detailedFeeReport: any = useSelector(
    (state: any) => state.paymentreport
  );
  const gridRef: any = useRef();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi]: any = useState(null);
  const [columnDefs, setColumnDefs] = useState([
    {
      // field: "class",
      headerName: "Class",
      headerTooltip: "Class",
      width: 130,
      valueGetter: (params: any) =>
        params.data.class +
        "-" +
        (params.data.division === null ? "" : params.data.division),
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: "no_students",
      headerName: "No. of students",
      headerTooltip: "Number of students",
      width: 110,
    },
    {
      field: "fee_amt",
      headerName: "Fee",
      headerTooltip: "Fees",
      width: 110,
    },
    {
      field: "academic_fee",
      headerName: "Academic Fee",
      headerTooltip: "Academic Fee",
      width: 110,
    },
    {
      field: "academic_fee_per_stud",
      headerName: "Academic Fee Per Student",
      headerTooltip: "Academic Fee Per Student",
      width: 110,
    },
    {
      field: "trans_fee",
      headerName: "Transport Fee",
      headerTooltip: "Transport Fee",
      width: 110,
    },
    {
      field: "hostel_fee",
      headerName: "Hostel Fee",
      headerTooltip: "Hostel Fee",
      width: 110,
    },
    {
      field: "extra_concession",
      headerName: "Extra Concession",
      headerTooltip: "Extra Concession",
      width: 110,
    },
    {
      field: "demand_amt",
      headerName: "Demant Amt",
      headerTooltip: "Demand Amount",
      width: 110,
    },
    {
      field: "paid_amt",
      headerName: "Paid Amt",
      headerTooltip: "Paid Amount",
      width: 110,
    },

    {
      field: "dis_paid_amt",
      headerName: "Dis Paid Amt",
      headerTooltip: "Dis Paid Amount",
      width: 110,
    },
    {
      field: "paid_amt_excess",
      headerName: "Excess Paid Amt",
      headerTooltip: "Excess Paid Amount",
    },
    {
      field: "balace",
      headerName: "Balance",
      headerTooltip: "Balance",
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
  const onFirstDataRendered = useCallback((params: any) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const onGridReady = useCallback(
    (params: any) => {
      return detailedFeeReport.detailedFeeReportData;
    },
    [detailedFeeReport.detailedFeeReportData]
  );
  useEffect(() => {}, [detailedFeeReport.detailedFeeReportData]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <DetailedReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!detailedFeeReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(detailedFeeReport?.detailedFeeReportExcel)
                  }
                  disabled={detailedFeeReport?.detailedFeeReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={detailedFeeReport.detailedFeeReportData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                onFirstDataRendered={onFirstDataRendered}
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

export default DetailedFeeCollection;
