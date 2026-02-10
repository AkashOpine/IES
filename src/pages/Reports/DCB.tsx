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
import FileSaver from "file-saver";
import { onBtExport } from "./headerComponents/ExportExcel";
function DCB() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();

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
      return paymentReport.dcbReportData;
    },
    [paymentReport.dcbReportData]
  );
  useEffect(() => {}, [paymentReport.dcbReportData]);
  const footerData = [paymentReport.dcbReportData?.dcbfoot]?.map(
    (footerRow) => {
      return {
        totalLabel: "Total",
        ...paymentReport.dcbReportData?.dcbheads?.reduce(
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
              <div className="btn-export">
                <button
                  onClick={() => onBtExport(paymentReport?.dcbReportExcel)}
                  disabled={paymentReport?.dcbReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                // rowData={paymentReport.dcbReportData}
                // columnDefs={columnDefs}
                columnDefs={paymentReport.dcbReportData?.dcbheader?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field: paymentReport.dcbReportData?.dcbheads[index],
                  })
                )}
                rowData={
                  paymentReport.dcbReportData?.dcbresult
                    ? paymentReport.dcbReportData?.dcbresult
                    : []
                }
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                sideBar={sideBar}
                pagination
                onGridReady={onGridReady}
                getRowStyle={getRowStyle}
                rowClassRules={{
                  "total-row": (params) => {
                    return params.node.rowPinned === "bottom";
                  },
                }}
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

export default DCB;
