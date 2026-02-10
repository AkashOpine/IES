import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "../../headerComponents/ExportExcel";
import PaymentReportHeader from "../../headerComponents/PaymentReportHeader";
import { useSelector } from "react-redux";
import AcademicDcbReportHeader from "../../headerComponents/AcademicDcbReportHeader";
import TransportDcbReportHeader from "../../headerComponents/TransportDcbReportHeader";
import { log } from "console";
function TransportDetailedDCB() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const transportDetailReport: any = useSelector(
    (state: any) => state.dcbReport
  );
  useEffect(() => {
    console.log("transportDetailReport  ", transportDetailReport.transportDetailsDcb  );
  }, [transportDetailReport ]);

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
      return transportDetailReport.transportDetailsDcb;
    },
    [transportDetailReport.transportDetailsDcb]
  );
  useEffect(() => {}, [transportDetailReport.transportDetailsDcb]);
  const footerData = [transportDetailReport.transportDetailsDcb?.data?.foot]?.map(
    (footerRow) => {
      return {
        totalLabel: "Total",
        ...transportDetailReport.transportDetailsDcb?.data?.dcbheads?.reduce(
          (rowData: any, field: any, index: any) => {
          rowData[field] = footerRow?.[field] ?? "";
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
          <TransportDcbReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!transportDetailReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() => onBtExport(transportDetailReport?.transportDetailsDcbExcel)}
                  disabled={transportDetailReport?.transportDetailsDcbExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                // rowData={transportDetailReport.transportDetailsDcb}
                // columnDefs={columnDefs}
                columnDefs={transportDetailReport.transportDetailsDcb?.data?.dcbheader?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field: transportDetailReport.transportDetailsDcb?.data?.dcbheads[index],
                  })
                )}
                rowData={
                  transportDetailReport.transportDetailsDcb?.data?.dcbresult
                    ? transportDetailReport.transportDetailsDcb?.data?.dcbresult
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

export default TransportDetailedDCB;
