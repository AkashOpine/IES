import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { onBtExport } from "../../headerComponents/ExportExcel";
import AcademicDcbReportHeader from "../../headerComponents/AcademicDcbReportHeader";

function AcademicDefaulters() {
  const academicDefaultersRes: any = useSelector(
    (state: any) => state.dcbReport
  );
  useEffect(() => {
    console.log(
      "academicDefaultersRes",
      academicDefaultersRes.academicDefaulters
    );
  }, [academicDefaultersRes]);

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
      return academicDefaultersRes.academicDefaulters;
    },
    [academicDefaultersRes.academicDefaulters]
  );
  useEffect(() => {}, [academicDefaultersRes.academicDefaulters]);
  const footerData = [
    academicDefaultersRes.academicDefaulters?.foot,
  ]?.map((footerRow) => {
    return {
      totalLabel: "Total",
      ...academicDefaultersRes.academicDefaulters?.dcbheads?.reduce(
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
          <AcademicDcbReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!academicDefaultersRes.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(academicDefaultersRes?.academicDefaultersExcel)
                  }
                  disabled={
                    academicDefaultersRes?.academicDefaultersExcel === ""
                  }
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                // rowData={academicDefaultersRes.academicDefaulters}
                // columnDefs={columnDefs}
                columnDefs={academicDefaultersRes.academicDefaulters?.dcbheader?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field:
                      academicDefaultersRes.academicDefaulters?.dcbheads[
                        index
                      ],
                  })
                )}
                rowData={
                  academicDefaultersRes.academicDefaulters?.dcbresult
                    ? academicDefaultersRes.academicDefaulters?.dcbresult
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
export default AcademicDefaulters;
