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

function HostelListReport() {
  const hostelListReport: any = useSelector((state: any) => state.hostelreport);
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Sl.No",
      field: "sl_no",
      width: 125,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },

    { field: "student_name", headerName: "Name" },
    { field: "old_admission_no", headerName: "Admission No" },
    {
      headerName: "Class",
      // valueGetter: (params: any) =>
      //   params.data.class_name + " " + params.data.division_name,
      field: "class_name",
    },
    { field: "hostel_type", headerName: "Hostel Type" },
    { field: "room_type", headerName: "Room Type" },
    {
      field: "room_no",
      headerName: "Room No",
    },
    {
      field: "establishment_fee",
      headerName: "Establishment Fee",
    },
    {
      field: "admission_fee",
      headerName: "Admission Fee",
    },
    {
      field: "readmission",
      headerName: "Readmission Fee",
    },
    {
      field: "caution_deposit",
      headerName: "Caution Deposit",
    },

    { field: "fee_amount", headerName: "Hostel Fee " },
    { field: "total_fee", headerName: "Total Fee " },
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
      return hostelListReport.hostelListReportData.details;
    },
    [hostelListReport.hostelListReportData.details]
  );
  const createData = (count: any) => {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        room_no: hostelListReport?.hostelListReportData?.grand_total
          ? "Total"
          : "",
        admission_fee:
          hostelListReport?.hostelListReportData?.grand_total?.admission_fee,
        establishment_fee:
          hostelListReport?.hostelListReportData?.grand_total
            ?.establishment_fee,
        caution_deposit:
          hostelListReport?.hostelListReportData?.grand_total?.caution_deposit,
        store_deposit:
          hostelListReport?.hostelListReportData?.grand_total?.store_deposit,
        fee_amount:
          hostelListReport?.hostelListReportData?.grand_total?.fee_amount,
        total_fee:
          hostelListReport?.hostelListReportData?.grand_total?.total_fee,
      });
    }
    return result;
  };
  const pinnedBottomRowData = useMemo(() => {
    return createData(1);
  }, [hostelListReport.hostelListReportData?.grand_total]);
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
        {!hostelListReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(hostelListReport.hostelListReportExcel)
                  }
                  disabled={hostelListReport.hostelListReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={
                  hostelListReport?.hostelListReportData?.details
                    ? hostelListReport?.hostelListReportData?.details
                    : []
                }
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                getRowStyle={getRowStyle}
                sideBar={sideBar}
                pagination
                pinnedBottomRowData={pinnedBottomRowData}
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

export default HostelListReport;
