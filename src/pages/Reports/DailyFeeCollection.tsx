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
import DailyFeeCollectionReportHeader from "./headerComponents/DailyFeeCollectionHeader";
function DailyFeeCollection() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
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
      field: "old_admission_no",
      headerName: "Admn No",
      headerTooltip: "Admission Number",
    },
    // {
    //   field: "receipt_no",
    //   headerName: "Rcpt No",
    //   headerTooltip: "Receipt Number",
    // },
    {
      field: "student_name",
      headerName: "Name",
      headerTooltip: "Student Name",
    },
    {
      field: "class_name",
      headerName: "Class",
      headerTooltip: "Student Class",
    },
    {
      field: "division_name",
      headerName: "Division",
      headerTooltip: "Student Division",
    },
    // {
    //   field: "academic_year",
    //   headerName: "Academic Year",
    //   width: 150,
    //   headerTooltip: "Academic Year",
    // },
    // {
    //   field: "date",
    //   headerName: "Date",
    //   width: 150,
    //   headerTooltip: "Date Paid",
    // },
    // {
    //   field: "payment_type",
    //   headerName: "Mode",
    //   width: 110,
    //   headerTooltip: "Payment Mode",
    // },
    {
      field: "total_extra_concession",
      headerName: "Total Extra Concession",
      headerTooltip: "Fine Fee Amount",
    },
    {
      field: "total_fine",
      headerName: "Fine",
      headerTooltip: "Fine Amount",
    },
    // {
    //   field: "total_concession",
    //   headerName: "Concession",
    //   width: 110,
    //   headerTooltip: "Concession",
    // },
    {
      field: "total_paid_amt",
      headerName: "Paid Amt",
      headerTooltip: "Total Amount Paid",
    },
    // {
    //   field: "bank_br",
    //   headerName: "Bank branch",
    //   headerTooltip: "Bank Branch Name",
    // },
    // {
    //   field: "remarks",
    //   headerName: "Remarks",
    //   headerTooltip: "Remarks",
    // },
  ]);
  useEffect(() => {
    console.log("daily fee coll", paymentReport?.dailyFeeCollectionReportData);
  }, [paymentReport]);

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
      return paymentReport?.dailyFeeCollectionReportData;
    },
    [paymentReport?.dailyFeeCollectionReportData]
  );
  const footerData = [
    paymentReport?.dailyFeeCollectionReportData?.dcbfoot,
  ]?.map((footerRow) => {
    return {
      totalLabel: "Total",
      ...paymentReport?.dailyFeeCollectionReportData?.dcbheads?.reduce(
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
          <DailyFeeCollectionReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!paymentReport?.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                {/* <button
                  onClick={() => onBtExport(paymentReport?.dcbReportExcel)}
                  disabled={paymentReport?.dcbReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button> */}
              </div>
              <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={
                  paymentReport?.dailyFeeCollectionReportData.length > 0
                    ? paymentReport?.dailyFeeCollectionReportData
                    : []
                }
                // columnDefs={paymentReport.dcbReportData?.dcbheader?.map(
                //   (heading: string, index: number) => ({
                //     headerName: heading,
                //     field: paymentReport.dcbReportData?.dcbheads[index],
                //   })
                // )}
                // rowData={
                //   paymentReport.dcbReportData?.dcbresult
                //     ? paymentReport.dcbReportData?.dcbresult
                //     : []
                // }
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                sideBar={sideBar}
                pagination
                // onGridReady={onGridReady}
                // getRowStyle={getRowStyle}
                // rowClassRules={{
                //   "total-row": (params) => {
                //     return params.node.rowPinned === "bottom";
                //   },
                // }}
                // pinnedBottomRowData={[footerData]}
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

export default DailyFeeCollection;
