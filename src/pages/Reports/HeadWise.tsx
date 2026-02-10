import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import PaymentReportHeader from "./headerComponents/PaymentReportHeader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import Loader from "../../components/layout/aggrid/Loader";
import PaymentModeReportHeader from "./headerComponents/PaymentModeReportHeader";
import HeadWiseReportHeader from "./headerComponents/HeadWiseReportHeader";
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "./headerComponents/ExportExcel";

function HeadWise() {
  const headWiseReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi]: any = useState(null);
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
      field: "feehead_name",
      headerName: "Fee Head Name",
      headerTooltip: "Fee Head Name",
    },
    // {
    //   field: "total_fine",
    //   headerName: "Fine",
    //   headerTooltip: "Total Fine",
    // },
    {
      field: "total_fee_paid",
      headerName: "Total Fee Paid",
      headerTooltip: "Total Fee Paid",
    },
    // {
    //   field: "total_paid",
    //   headerName: "Total Paid Amount",
    //   headerTooltip: "Paid Paid Amount",
    // },
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      resizable: true,
      sortable: true,
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
  const onFirstDataRendered = useCallback((params: any) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const onGridReady = useCallback(
    (params: any) => {
      return headWiseReport.headWiseReportData;
    },
    [headWiseReport.headWiseReportData]
  );
  useEffect(() => {}, [headWiseReport.headWiseReportData]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <HeadWiseReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!headWiseReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(headWiseReport?.headWiseReportExcel)
                  }
                  disabled={headWiseReport?.headWiseReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={headWiseReport.headWiseReportData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                onFirstDataRendered={onFirstDataRendered}
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

export default HeadWise;
