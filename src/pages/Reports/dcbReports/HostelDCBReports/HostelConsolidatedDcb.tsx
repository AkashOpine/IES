import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import HostelDcbReportHeader from "../../headerComponents/HostelDcbReportHeader";
import { onBtExport } from "../../headerComponents/ExportExcel";
import { FaDownload } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
function HostelConsolidatedDcb() {
  const hostelDetailsReport: any = useSelector((state: any) => state.dcbReport);
  useEffect(() => {
    console.log(
      "hostelDetailsReport  ",
      hostelDetailsReport?.hostelConsolidatedDcb
    );
  }, [hostelDetailsReport]);

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
      return hostelDetailsReport?.hostelConsolidatedDcb;
    },
    [hostelDetailsReport?.hostelConsolidatedDcb]
  );
  useEffect(() => {}, [hostelDetailsReport?.hostelConsolidatedDcb]);
  const footerData = [
    hostelDetailsReport?.hostelConsolidatedDcb?.grand_total,
  ]?.map((footerRow) => {
    return {
      totalLabel: "Total",
      ...hostelDetailsReport?.hostelConsolidatedDcb?.heads?.reduce(
        (rowData: any, field: any, index: any) => {
          rowData[field] = footerRow[field];
          return rowData;
        },
        {}
      ),
    };
  })[0];
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
          <HostelDcbReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!hostelDetailsReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(hostelDetailsReport?.hostelConsolidatedDcbExcel)
                  }
                  disabled={
                    hostelDetailsReport?.hostelConsolidatedDcbExcel === ""
                  }
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                // rowData={hostelDetailsReport.hostelConsolidatedDcb}
                // columnDefs={columnDefs}
                columnDefs={hostelDetailsReport.hostelConsolidatedDcb?.header?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field:
                      hostelDetailsReport.hostelConsolidatedDcb?.heads[index],
                  })
                )}
                rowData={
                  hostelDetailsReport.hostelConsolidatedDcb?.result
                    ? hostelDetailsReport.hostelConsolidatedDcb?.result
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
export default HostelConsolidatedDcb;
