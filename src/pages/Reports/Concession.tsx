import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { tryFetchConcessionReportData } from "../../slices/reports/paymentReportSlice";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { onBtExport } from "./headerComponents/ExportExcel";

function Concession() {
  const dispatch = useDispatch();
  const gridRef: any = useRef();
  useEffect(() => {
    dispatch(tryFetchConcessionReportData());
  }, []);
  const concessionReport: any = useSelector(
    (state: any) => state.paymentreport
  );
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
  return (
    <Row className="mt-2">
      {!concessionReport.isLoading ? (
        <Col md={12}>
          <div className="ag-theme-alpine grid-table">
            <div className="btn-export">
              <button
              // onClick={() => onBtExport(headWiseReport?.headWiseReportExcel)}
              // disabled={headWiseReport?.headWiseReportExcel === ""}
              >
                <FaDownload /> <span>Export to excel</span>
              </button>
            </div>
            <AgGridReact
              columnDefs={concessionReport.concessionReport?.header?.map(
                (heading: string, index: number) => ({
                  headerName: heading,
                  field: concessionReport.concessionReport?.heads[index],
                })
              )}
              rowData={
                concessionReport.concessionReport?.result
                  ? concessionReport.concessionReport?.result
                  : []
              }
              // onGridReady={onGridReady}
              ref={gridRef}
              animateRows={true}
              suppressRowClickSelection={true}
              defaultColDef={defaultColDef}
              sideBar={sideBar}
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

export default Concession;
