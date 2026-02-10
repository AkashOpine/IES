import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FaDownload } from "react-icons/fa";
import { onBtExport } from "../headerComponents/ExportExcel";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo/ieslogo.png";
import { useReactToPrint } from "react-to-print";

function ConsolidatedPaymentHistory() {
  const receipt: any = useSelector(
    (state: any) => state.paymentreport.consolidatedPaymentHistoryReport
  );
  const gridRef: any = useRef();
  const componentRef: any = useRef();

  // const [columnDefs, setColumnDefs] = useState([
  //   // {
  //   //   field: "date",
  //   //   headerName: "Date",
  //   //   headerCheckboxSelection: true,
  //   //   checkboxSelection: true,
  //   // },
  //   {
  //     field: "feehead_name",
  //     headerName: "Fees",
  //     headerTooltip: "Fees Name",
  //   },

  //   {
  //     field: "payment_type",
  //     headerName: "Payment Type",
  //     headerTooltip: "Total Fees",
  //   },
  //   {
  //     field: "month",
  //     headerName: "Months",
  //     headerTooltip: "Fees Paid",
  //   },
  //   {
  //     field: "total_fine",
  //     headerName: "Fine",
  //     headerTooltip: "Fees Fine",
  //   },
  //   {
  //     field: "total_paid",
  //     headerName: "Paid",
  //     headerTooltip: "Total paid",
  //   },
  //   {
  //     field: "total_fee_paid",
  //     headerName: "Total fees paid",
  //     headerTooltip: "Total Fees paid",
  //   },
  // ]);
  // const defaultColDef = useMemo(
  //   () => ({
  //     filter: true,
  //     sortable: true,
  //     resizable: true,
  //   }),
  //   []
  // );
  // const sideBar: any = {
  //   toolPanels: [
  //     {
  //       id: "columns",
  //       labelDefault: "Columns",
  //       labelKey: "columns",
  //       iconKey: "columns",
  //       toolPanel: "agColumnsToolPanel",
  //       minWidth: 225,
  //       maxWidth: 225,
  //       width: 225,
  //     },
  //     {
  //       id: "filters",
  //       labelDefault: "Filters",
  //       labelKey: "filters",
  //       iconKey: "filter",
  //       toolPanel: "agFiltersToolPanel",
  //       minWidth: 180,
  //       maxWidth: 400,
  //       width: 250,
  //     },
  //   ],
  //   position: "right",
  //   defaultToolPanel: "",
  // };
  // const onGridReady = useCallback(
  //   (params: any) => {
  //     return consolidatedReport.consolidatedPaymentHistoryReport;
  //   },
  //   [consolidatedReport.consolidatedPaymentHistoryReport]
  // );
  // useEffect(() => {}, [consolidatedReport.consolidatedPaymentHistoryReport]);
  // return (
  //   <>
  //     <Row className="tab-content">
  //       {!consolidatedReport.isLoading ? (
  //         <Col md={12}>
  //           <div className="ag-theme-alpine grid-table">
  //             <div className="btn-export">
  //               {/* <button
  //                   onClick={() =>
  //                     onBtExport(consolidatedReport.consolidatedReportExcel)
  //                   }
  //                   disabled={consolidatedReport.consolidatedReportExcel === ""}
  //                 >
  //                   <FaDownload /> <span>Export to excel</span>
  //                 </button> */}
  //             </div>
  //             <AgGridReact
  //               ref={gridRef}
  //               rowData={consolidatedReport.consolidatedPaymentHistoryReport}
  //               columnDefs={columnDefs}
  //               animateRows={true}
  //               rowSelection="multiple"
  //               suppressRowClickSelection={true}
  //               defaultColDef={defaultColDef}
  //               sideBar={sideBar}
  //               pagination
  //               onGridReady={onGridReady}
  //             />
  //           </div>
  //         </Col>
  //       ) : (
  //         <Col md={12} className="loaderContainer">
  //           <Spinner animation="grow" variant="primary" />
  //         </Col>
  //       )}
  //     </Row>
  //   </>
  // );
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-btn",
    onAfterPrint: () => console.log("react print closed"),
  });
  return (
    <>
      {receipt !== null ? (
        <Row>
          <Col md={12} className="" style={{ margin: "2em auto" }}>
            <div className="print-btn" onClick={() => handlePrint()}>
              {/* <FaPrint size={14} /> */}
              <span>Print receipt</span>
            </div>
            <div className="receipt-main " ref={componentRef}>
              <Row>
                <Col
                  md={12}
                  className="text-center"
                  // style={{ borderBottom: "1px solid #F3F1F1" }}
                >
                  <img
                    className="img-responsive receipt_logo"
                    alt="ies logo"
                    src={logo}
                  />
                </Col>
              </Row>
              <tr />
              <Row>
                <Col
                  md={12}
                  className="text-center mt-3"
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#B5B5C3",
                  }}
                >
                  <span className="receipt-head">
                    RECEIPT {receipt?.academic_year}
                  </span>
                </Col>
              </Row>
              <Row className="mb-4 mt-4">
                <Col md={6}>
                  <div className="receipt-item">
                    <span>Name</span>
                    <span>{receipt?.student_details?.student_name}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Date</span>
                    <span>{receipt?.student_details?.date}</span>
                  </div>{" "}
                  <div className="receipt-item">
                    <span>Concession</span>
                    <span>{receipt?.student_details?.concession_type}</span>
                  </div>{" "}
                  {receipt.pickup_name ? (
                    <div className="receipt-item">
                      <span>Pick Up</span>
                      <span>{receipt?.pickup_name}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md={6}>
                  <div className="receipt-item receipt-item-right">
                    <span>Adm.No</span>
                    <span>{receipt?.student_details?.old_admission_no}</span>
                  </div>
                  <div className="receipt-item receipt-item-right">
                    <span>Class</span>
                    <span>
                      {" "}
                      {receipt?.student_details?.class_name}{" "}
                      {receipt?.student_details?.division_name}
                    </span>
                  </div>
                  {receipt.route_name ? (
                    <div className="receipt-item receipt-item-right">
                      <span>Bus Stop</span>
                      <span>{receipt?.route_stop}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={12} className="receipt-fee-table">
                  <table className="table table-responsive">
                    <thead className="table-head">
                      <tr>
                        <th className="text-start" style={{ width: "50%" }}>
                          Particulars
                        </th>
                        <th className="text-center">Month</th>
                        <th className="text-center">Payment Type</th>
                        <th className="text-center">Fine</th>
                        <th className="text-center">Paid Amt</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {receipt?.fee_details?.length > 0
                        ? receipt?.fee_details.map((item: any) => {
                            return (
                              <tr>
                                <td>{item.feehead_name}</td>
                                <td className="text-center">{item.month}</td>
                                <td className="text-center">
                                  {item.payment_type}
                                </td>
                                <td className="text-center">
                                  {item.total_fine}
                                </td>
                                <td className="text-center">
                                  {item.total_paid}
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                      {/* {receipt?.trans_fee_details?.length > 0
                      ? receipt?.trans_fee_details.map((item: any) => {
                          return (
                            <tr>
                              <td>Bus Fee</td>
                              <td className="text-center">{item.feemonth}</td>
                              <td className="text-center">{item.paid_amt}</td>
                            </tr>
                          );
                        })
                      : ""}
                    {receipt?.hostel_fee_details?.length > 0
                      ? receipt?.hostel_fee_details.map((item: any) => {
                          return (
                            <tr>
                              <td>{item.feehead_name}</td>
                              <td className="text-center">{item.feemonth}</td>
                              <td className="text-center">{item.paid_amt}</td>
                            </tr>
                          );
                        })
                      : ""} */}
                      {/* <tr className="mt-2">
                      <td>Fine</td>
                      <td className="text-center"></td>
                      <td className="text-center ">{receipt?.total_fine}</td>
                    </tr> */}
                      <tr className="mt-2">
                        <td style={{ fontWeight: "bold" }}>Grand Total</td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td
                          className="text-center "
                          style={{ fontWeight: "bold" }}
                        >
                          {receipt?.grand_total}
                        </td>
                      </tr>
                      {/* <tr className="mt-2">
                      <td
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        Rupees {amountInWords} only
                      </td>
                      <td className="text-center"></td>
                      <td></td>
                    </tr> */}
                    </tbody>
                  </table>
                </Col>
              </Row>
              {/* <Row className="mb-3">
              <Col md={12} className="remark-container">
                <div className="title">Remarks</div>
                <div
                  className={
                    receipt.remarks ? "content content_border" : "content"
                  }
                >
                  {receipt?.remarks}
                </div>
              </Col>
            </Row> */}
              <Row className="mb-3">
                <Col md={6}>
                  <div className="d-flex gap-2">
                    <span className="bold">Pending Amount Till Date</span>
                    <span className="bold">:</span>
                    <span>{receipt?.till_month}</span>
                  </div>
                </Col>
                <Col md={6} className="float-right">
                  <div className="d-flex gap-2">
                    <span className="bold">Yearly Balance</span>
                    <span className="bold">:</span>
                    <span>{receipt?.yearly_balance}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  md={12}
                  className="mt-3"
                  style={{
                    fontSize: "13px",
                    marginLeft: "2em",
                    color: "black",
                  }}
                >
                  Authorized Signature
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={12} className="empty-page">
            No search result found
          </Col>
        </Row>
      )}
    </>
  );
}

export default ConsolidatedPaymentHistory;
