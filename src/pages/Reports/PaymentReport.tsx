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
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "./headerComponents/ExportExcel";

function PaymentReport() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  useEffect(() => {
    console.log("paymentReport", paymentReport.paymentReportData);
  }, [paymentReport]);

  const createData = (count: any) => {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        Name: paymentReport.paymentReportData?.grand_total ? "Total" : "",
        "Bus Fee": paymentReport.paymentReportData?.grand_total?.["Bus Fee"],
         "AdvFeeTot": paymentReport.paymentReportData?.grand_total?.["AdvFeeTot"],
        "Arts Day & Other Celebrations":
          paymentReport.paymentReportData?.grand_total?.[
            "Arts Day & Other Celebrations"
          ],

        "Other Annual/Monthly Charges":
          paymentReport.paymentReportData?.grand_total?.[
            "Other Annual/Monthly Charges"
          ],
        "Re Admission Fee":
          paymentReport.paymentReportData?.grand_total?.["Re Admission Fee"],
        "Computer Fee/IP":
          paymentReport.paymentReportData?.grand_total?.["Computer Fee/IP"],
        "Diary and ID Card":
          paymentReport.paymentReportData?.grand_total?.["Diary and ID Card"],
        "Tuition Fee":
          paymentReport.paymentReportData?.grand_total?.["Tuition Fee"],
        Scholarship:
          paymentReport.paymentReportData?.grand_total?.["Scholarship"],
        "Staff Welfare Fund":
          paymentReport.paymentReportData?.grand_total?.["Staff Welfare Fund"],

        "H Hostel fee":
          paymentReport.paymentReportData?.grand_total?.["H Hostel fee"],
        "H Caution Deposit":
          paymentReport.paymentReportData?.grand_total?.["H Caution Deposit"],
        "H Admission Fee":
          paymentReport.paymentReportData?.grand_total?.["H Admission Fee"],
        "Computer Fee/FS":
          paymentReport.paymentReportData?.grand_total?.["Computer Fee/FS"],
        "Yearly Development Charges":
          paymentReport.paymentReportData?.grand_total?.[
            "Yearly Development Charges"
          ],
        "Fashion Studies":
          paymentReport.paymentReportData?.grand_total?.["Fashion Studies"],
        Fine: paymentReport.paymentReportData?.grand_total?.["Fine"],
        Concession:
          paymentReport.paymentReportData?.grand_total?.["Concession"],
        Total: paymentReport.paymentReportData?.grand_total?.["Total"],
        CashTot: paymentReport.paymentReportData?.grand_total?.["CashTot"],
        CardTot: paymentReport.paymentReportData?.grand_total?.["CardTot"],
        OnlineTot: paymentReport.paymentReportData?.grand_total?.["OnlineTot"],
        BankTot: paymentReport.paymentReportData?.grand_total?.["BankTot"],
        ChequeTot: paymentReport.paymentReportData?.grand_total?.["ChequeTot"],
      });
    }
    return result;
  };

  useEffect(() => {
    console.log(
      "paymentReport.paymentReportData",
      paymentReport.paymentReportData,
    );
  }, [paymentReport.paymentReportData]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      resizable: true,
      sortable: true,
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
  // const onFirstDataRendered = useCallback((params: any) => {
  //   gridRef.current.api.sizeColumnsToFit();
  // }, []);

  const getRowStyle = useCallback((params: any) => {
    if (params.node.rowPinned) {
      return {
        "font-weight": "bold",
      };
    }
    // if (params.node.lastChild) {
    //   return {
    //     "font-weight": "bold",
    //   };
    // }
    // if (params.node.rowPinned) {
    //   return { background: "#babfc7" };
    // }
  }, []);

  const pinnedBottomRowData = useMemo(() => {
    return createData(1);
  }, [paymentReport.paymentReportData?.grand_total]);
  const onGridReady = useCallback(
    (params: any) => {
      return paymentReport.paymentReportData?.Details;
    },
    [paymentReport.paymentReportData?.Details],
  );
  // const onBtExport = useCallback(() => {
  //   if (paymentReport.paymentReportData?.Details.length > 0) {
  //     gridRef.current.api.exportDataAsExcel();
  //   }
  // }, [paymentReport.paymentReportData?.Details]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <PaymentReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!paymentReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() => onBtExport(paymentReport.paymentReportExcel)}
                  disabled={paymentReport.paymentReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={
                  paymentReport.paymentReportData?.Details
                    ? paymentReport.paymentReportData?.Details
                    : []
                }
                // columnDefs={columnDefs}
                columnDefs={paymentReport.paymentReportData?.headers?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field: paymentReport.paymentReportData?.head[index],
                  }),
                )}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                // onFirstDataRendered={onFirstDataRendered}
                sideBar={sideBar}
                pagination
                getRowStyle={getRowStyle}
                onGridReady={onGridReady}
                pinnedBottomRowData={pinnedBottomRowData}
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

export default PaymentReport;
