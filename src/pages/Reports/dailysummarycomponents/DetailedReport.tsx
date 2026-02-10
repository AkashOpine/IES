import { AgGridReact } from "ag-grid-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
function DetailedReport() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "receipt_no",
      headerName: "Receipt No.",
      headerCheckboxSelection: true,
      headerTooltip: "Receipt Number",
      checkboxSelection: true,
      width: 150,
    },
    {
      field: "first_name",
      headerName: "Student Name",
      headerTooltip: "Student Name",
    },
    {
      field: "old_admission_no",
      headerName: "Admn No.",
      headerTooltip: "Admission Number",
      width: 150,
    },
    {
      field: "feehead_name",
      headerName: "Fee Name",
      headerTooltip: "Fee Name",
    },
    {
      field: "fine",
      headerName: "Fine",
      headerTooltip: "Fine Amount",
      width: 150,
    },

    {
      field: "fee_amount",
      headerName: "Fee Amount",
      headerTooltip: "Fee Amount",
      width: 150,
    },
    {
      field: "paid_amt",
      headerName: "Paid Amount",
      headerTooltip: "Paid Amount",
      width: 150,
    },
    {
      field: "extra_concession",
      headerName: "Extra Concession",
      headerTooltip: "Extra Concession",
      width: 150,
    },
    {
      field: "concession",
      headerName: "Concession",
      headerTooltip: "Concession",
      width: 150,
    },
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
  //   const onFirstDataRendered = useCallback((params: any) => {
  //     gridRef.current.api.sizeColumnsToFit();
  //   }, []);
  const onGridReady = useCallback(
    (params: any) => {
      return paymentReport?.detailedReportData.data;
    },
    [paymentReport?.detailedReportData.data]
  );
  useEffect(() => {}, [paymentReport?.detailedReportData]);
  const onBtExport = useCallback(() => {
    if (paymentReport?.detailedReportData.data.length > 0) {
      gridRef.current.api.exportDataAsExcel();
    }
  }, [paymentReport?.detailedReportData]);
  return (
    <Row className="tab-content">
      {!paymentReport?.isLoading ? (
        <Col md={12}>
          <div className="ag-theme-alpine dcb-grid-table">
            <div className="btn-export mt-2">
              <button onClick={onBtExport}>
                <FaDownload /> <span>Export to excel</span>
              </button>
            </div>
            <AgGridReact
              ref={gridRef}
              rowData={paymentReport?.detailedReportData?.data}
              columnDefs={columnDefs}
              animateRows={true}
              rowSelection="multiple"
              suppressRowClickSelection={true}
              defaultColDef={defaultColDef}
              //   onFirstDataRendered={onFirstDataRendered}
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
  );
}

export default DetailedReport;
