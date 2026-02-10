import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import HostelDcbReportHeader from "../../headerComponents/HostelDcbReportHeader";
import { onBtExport } from "../../headerComponents/ExportExcel";
import { FaDownload } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";

function HostelDetailedDcb() {
  const hostelDetailsReport: any = useSelector((state: any) => state.dcbReport);
  useEffect(() => {
    console.log("hostelDetailsReport  ", hostelDetailsReport);
  }, [hostelDetailsReport]);

  const gridRef: any = useRef();

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    [],
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
      return hostelDetailsReport.hostelDetailsDcb;
    },
    [hostelDetailsReport.hostelDetailsDcb],
  );
  useEffect(() => {}, [hostelDetailsReport.hostelDetailsDcb]);
  const footerData = hostelDetailsReport.hostelDetailsDcb?.data?.foot
    ? [hostelDetailsReport.hostelDetailsDcb.data.foot].map((footerRow) => ({
        totalLabel: "Total",
        ...hostelDetailsReport.hostelDetailsDcb?.data?.dcbheads?.reduce(
          (rowData: any, field: any) => {
            rowData[field] = footerRow?.[field] ?? "";
            return rowData;
          },
          {},
        ),
      }))[0]
    : null;

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
                    onBtExport(hostelDetailsReport?.hostelDetailsDcbExcel)
                  }
                  disabled={hostelDetailsReport?.hostelDetailsDcbExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                // rowData={hostelDetailsReport.hostelDetailsDcb}
                // columnDefs={columnDefs}
                columnDefs={hostelDetailsReport.hostelDetailsDcb?.data?.dcbheader?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field:
                      hostelDetailsReport.hostelDetailsDcb?.data?.dcbheads[
                        index
                      ],
                  }),
                )}
                rowData={
                  hostelDetailsReport.hostelDetailsDcb?.data?.dcbresult
                    ? hostelDetailsReport.hostelDetailsDcb?.data?.dcbresult
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

export default HostelDetailedDcb;
