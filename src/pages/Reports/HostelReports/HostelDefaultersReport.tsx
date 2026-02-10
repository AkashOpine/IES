import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import DcbReportHeader from "../headerComponents/DcbReportHeader";
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "../headerComponents/ExportExcel";

function HostelDefaultersReport() {
  const hostelDefaultersReport: any = useSelector(
    (state: any) => state.hostelreport
  );
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Sl.No",
      valueGetter: (params: any) => params.node.rowIndex + 1,
      width: 125,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },

    { field: "student_name", headerName: "Name" },
    { field: "old_admission_no", headerName: "Admission No" },
    {
      headerName: "Class",
      valueGetter: (params: any) =>
        params.data.class_name + " " + params.data.division,
    },
    { field: "mobile", headerName: "Mobile" },
    { field: "due_date", headerName: "Due date" },
    {
      field: "fee_amt",
      headerName: "Fee Amt",
    },

    { field: "paid_amt", headerName: "Paid amt" },
    { field: "bal_amt", headerName: "Balance Amt" },
  ]);

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
      return hostelDefaultersReport.hostelDefaultersReportData;
    },
    [hostelDefaultersReport.hostelDefaultersReportData]
  );
  useEffect(() => {}, [hostelDefaultersReport.hostelDefaultersReportData]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <DcbReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!hostelDefaultersReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(
                      hostelDefaultersReport.hostelDefaultersReportExcel
                    )
                  }
                  disabled={
                    hostelDefaultersReport.hostelDefaultersReportExcel === ""
                  }
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={hostelDefaultersReport.hostelDefaultersReportData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
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

export default HostelDefaultersReport;
