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
import DcbReportHeader from "./headerComponents/DcbReportHeader";
import { FaDownload } from "react-icons/fa";

function Defaulters() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [searchData, setSearchData] = useState("");
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
      field: "student_name",
      headerName: "Studnet name",
      headerTooltip: "Student Name",
    },
    {
      field: "old_admission_no",
      headerName: "Admission No",
      headerTooltip: "Admission Number",
      width: 150,
    },
    {
      field: "class",
      headerName: "Class",
      headerTooltip: "Student Class",
      width: 100,
    },
    {
      field: "division",
      headerName: "Division",
      headerTooltip: "Student Division",
      width: 100,
    },
    { field: "mobile", headerName: "Mobile", headerTooltip: "Mobile Number" },

    {
      field: "fee_amt",
      headerName: "Fee amount",
      headerTooltip: "Fee Amount",
      width: 150,
    },
    {
      field: "paid_amt",
      headerName: "Paid amount",
      headerTooltip: "Paid Amount",
      width: 150,
    },
    {
      field: "bal_amt",
      headerName: "Balance amount",
      headerTooltip: "Balance Amount",
      width: 150,
    },
    {
      field: "demad_amt",
      headerName: "Demand Amt",
      headerTooltip: "Demand Amount",
      width: 150,
    },
    {
      field: "extra_concession",
      headerName: "Concession",
      headerTooltip: "Concession",
    },
    {
      field: "concession",
      headerName: "Concession Type",
      headerTooltip: "Concession Type",
    },
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
      return paymentReport.defaultersReportData;
    },
    [paymentReport.defaultersReportData]
  );
  useEffect(() => {}, [paymentReport.defaultersReportData]);
  const onBtExport = useCallback(() => {
    if (paymentReport.defaultersReportData.length > 0) {
      gridRef.current.api.exportDataAsExcel();
    }
  }, [paymentReport.defaultersReportData]);
  // const onFilterTextBoxChanged = useCallback(() => {
  //   gridRef.current.api
  //     .setQuickFilter
  //     // document.getElementById("filter-text-box").value
  //     ();
  // }, []);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <DcbReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!paymentReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              {/* <div className="report_table_top">
                <input
                  type="text"
                  id="filter-text-box"
                  placeholder="Filter..."
                  // onInput={onFilterTextBoxChanged}
                />
                <div className="btn-export">
                  <button onClick={onBtExport}>
                    <FaDownload /> <span>Export to excel</span>
                  </button>
                </div>
              </div> */}
              <div className="btn-export">
                <button onClick={onBtExport}>
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                cacheQuickFilter={true}
                rowData={paymentReport.defaultersReportData}
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

export default Defaulters;
