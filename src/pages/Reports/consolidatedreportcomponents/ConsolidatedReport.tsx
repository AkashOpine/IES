import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import ConsolidatedReportHeader from "../headerComponents/ConsolidatedReportHeader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "../headerComponents/ExportExcel";
function ConsolidatedReport() {
  const consolidatedReport: any = useSelector(
    (state: any) => state.paymentreport
  );
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    // {
    //   field: "date",
    //   headerName: "Date",
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    // },
    {
      field: "feehead_name",
      headerName: "Fees",
      headerTooltip: "Fees Name",
    },

    {
      field: "total_paid",
      headerName: "Total",
      headerTooltip: "Total Fees",
    },
    {
      field: "total_fee_paid",
      headerName: "Paid",
      headerTooltip: "Fees Paid",
    },
    {
      field: "total_fine",
      headerName: "Fine",
      headerTooltip: "Fees Fine",
    },
    {
      field: "total_concession",
      headerName: "Concession",
      headerTooltip: "Concession",
    },
    {
      field: "total_balace",
      headerName: "Balance",
      headerTooltip: "Balance Fees",
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
      return consolidatedReport.consolidatedReport;
    },
    [consolidatedReport.consolidatedReport]
  );
  useEffect(() => {}, [consolidatedReport.consolidatedReport]);

  return (
    <>
      <Row className="tab-content">
        {!consolidatedReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(consolidatedReport.consolidatedReportExcel)
                  }
                  disabled={consolidatedReport.consolidatedReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={consolidatedReport.consolidatedReport}
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

export default ConsolidatedReport;
