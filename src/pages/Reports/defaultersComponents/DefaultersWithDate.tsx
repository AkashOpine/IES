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
import { CustomHeader } from "./customeHeader";

function DefaultersWithDate(props: any) {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [gridApi, setGridApi] = useState(null);
  const columnDefs = [
    {
      headerName: "Sl.No",
      valueGetter: (params: any) => params.node.rowIndex + 1,
      width: 120,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerTooltip: "Serial Number",
    },
    {
      headerName: "Student Name",
      field: "student_name",
    },
    {
      headerName: "Admn No",
      field: "old_admission_no",
      width: 100,
    },
    {
      headerName: "Mobile",
      field: "mobile",
      width: 150,
    },
    {
      headerName: "Class",
      valueGetter: (params: any) =>
        params.data.class + " " + params.data.division,
      headerTooltip: "Class",
      width: 90,
    },
    {
      headerName: "Fee Amount",
      field: "fee_amt",
      width: 100,
    },
    {
      headerName: "Demand Amount",
      field: "demad_amt",
      width: 100,
    },
    {
      headerName: "Paid Amount",
      field: "paid_amt",
      width: 100,
    },
    {
      headerName: "Balance Amount",
      field: "bal_amt",
      width: 100,
    },
    {
      headerName: "Term 1",
      field: "term1_bal",
      width: 100,
    },
    {
      headerName: "Term 2",
      field: "term2_bal",
      width: 100,
    },
    {
      headerName: "Term 3",
      field: "term3_bal",
      width: 100,
    },
  ];

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
  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };
  useEffect(() => {}, [paymentReport.newDefaultersWithDate]);
  const onBtExport = useCallback(() => {
    if (paymentReport.newDefaultersWithDate.length > 0) {
      gridRef.current.api.exportDataAsExcel();
    }
  }, [paymentReport.newDefaultersWithDate]);

  return (
    <Row className="tab-content">
      {!paymentReport.isLoading ? (
        <Col md={12}>
          <div className="ag-theme-alpine dcb-grid-table">
            <div className="d-flex  justify-content-between">
              <div className="heading">Due List ({props.heading})</div>
              <div className="btn-export mt-2">
                <button onClick={onBtExport}>
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
            </div>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={paymentReport.newDefaultersWithDate}
              onGridReady={onGridReady}
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

export default DefaultersWithDate;
