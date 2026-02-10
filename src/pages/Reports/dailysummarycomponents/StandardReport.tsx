import { AgGridReact } from "ag-grid-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import FileSaver from "file-saver";
import { onBtExport } from "../headerComponents/ExportExcel";

function StandardReport() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "receipt_no",
      headerName: "Receipt No.",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerTooltip: "Receipt Number",
    },
    {
      field: "student_name",
      headerName: "Student Name",
      headerTooltip: "Student Name",
    },
    {
      field: "old_admission_no",
      headerName: "Admn No.",
      headerTooltip: "Admission Number",
    },
    { field: "fine", headerName: "Fine", headerTooltip: "Fine Amount" },
    {
      field: "fee_amount",
      headerName: "Fee Amount",
      headerTooltip: "Fee Amount",
    },
    {
      field: "paid_amt",
      headerName: "Paid Amount",
      headerTooltip: "Paid Amount",
    },
    {
      field: "concession",
      headerName: "Concession",
      headerTooltip: "Concession",
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
      return paymentReport?.standardReportData;
    },
    [paymentReport?.standardReportData]
  );
  useEffect(() => {}, [paymentReport?.standardReportData]);

  return (
    <Row className="tab-content">
      {!paymentReport?.isLoading ? (
        <Col md={12}>
          <div className="ag-theme-alpine dcb-grid-table">
            <div className="btn-export mt-2">
              <button
                onClick={() => onBtExport(paymentReport?.standardReportExcel)}
                disabled={paymentReport?.standardReportExcel === ""}
              >
                <FaDownload /> <span>Export to excel</span>
              </button>
            </div>
            <AgGridReact
              ref={gridRef}
              rowData={paymentReport?.standardReportData}
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
  );
}

export default StandardReport;
