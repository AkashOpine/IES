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

function TransportDefaultersReport() {
  const transportDefaultersReport: any = useSelector(
    (state: any) => state.transportreport
  );
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Sl.No",
      field: "sl_no",
      // valueGetter: (params: any) => params.node.rowIndex + 1,
      width: 125,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerTooltip: "Serial Number",
    },

    { field: "student_name", headerName: "Name" },
    {
      headerName: "Class",
      field: "class_div",
      headerTooltip: "Class",
    },
    {
      field: "old_admission_no",
      headerName: "Adm no",
      headerTooltip: "Admission Number",
    },
    {
      field: "month",
      headerName: "Month",
      width: 270,
      headerTooltip: "Month",
    },
    {
      field: "vehicle_no",
      headerName: "Vehicle No",
      headerTooltip: "Vehicle Number",
    },
    { field: "due_date", headerName: "Due date", headerTooltip: "Due Date" },
    { field: "mobile", headerName: "Mobile", headerTooltip: "Mobile Number" },
    {
      field: "fee_amt",
      headerName: "Fee Amt",
      headerTooltip: "Fee Amount",
    },
    {
      field: "extra_concession",
      headerName: "Concession",
      headerTooltip: "Concession",
    },
    {
      field: "demand_amt",
      headerName: "Demand Amt",
      headerTooltip: "Demand Amount",
    },
    { field: "paid_amt", headerName: "Paid Amt", headerTooltip: "Paid Amount" },
    {
      field: "bal_amt",
      headerName: "Balance Amt",
      headerTooltip: "Balance Amount",
    },
    // {
    //   field: "concession_name",
    //   headerName: "Concession Type",
    //   headerTooltip: "Concession Type",
    // },
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
      return transportDefaultersReport.transportDefaultersReportData;
    },
    [transportDefaultersReport.transportDefaultersReportData]
  );
  useEffect(() => {}, [
    transportDefaultersReport.transportDefaultersReportData,
  ]);
  const createData = (count: any) => {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        student_name: transportDefaultersReport?.transportDefaultersReportData
          ?.grand_total
          ? "Total"
          : "",
        fee_amt:
          transportDefaultersReport?.transportDefaultersReportData?.grand_total
            ?.fee_amt,
        extra_concession:
          transportDefaultersReport?.transportDefaultersReportData?.grand_total
            ?.extra_concession,
        demand_amt:
          transportDefaultersReport?.transportDefaultersReportData?.grand_total
            ?.demand_amt,
        paid_amt:
          transportDefaultersReport?.transportDefaultersReportData?.grand_total
            ?.paid_amt,
        bal_amt:
          transportDefaultersReport?.transportDefaultersReportData?.grand_total
            ?.bal_amt,
      });
    }
    return result;
  };
  const pinnedBottomRowData = useMemo(() => {
    return createData(1);
  }, [transportDefaultersReport?.transportDefaultersReportData?.grand_total]);
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
        {!transportDefaultersReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(
                      transportDefaultersReport.transportDefaultersReportExcel
                    )
                  }
                  disabled={
                    transportDefaultersReport.transportDefaultersReportExcel ===
                    ""
                  }
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={
                  transportDefaultersReport?.transportDefaultersReportData
                    ?.details
                    ? transportDefaultersReport?.transportDefaultersReportData
                        ?.details
                    : []
                }
                columnDefs={transportDefaultersReport.transportDefaultersReportData?.header?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field:
                      transportDefaultersReport.transportDefaultersReportData
                        ?.heads[index],
                  })
                )}
                // columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                pinnedBottomRowData={pinnedBottomRowData}
                getRowStyle={getRowStyle}
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

export default TransportDefaultersReport;
