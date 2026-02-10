import React, { useMemo, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeeReceiptModal from "../../receipt/FeeReceiptModal";
function ConsolidatedHistory() {
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const studentList = useSelector(
    (state: any) => state.classWiseList.studentSearch
  );

  const columns: any = [
    {
      name: "#",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: "Receipt No",
      selector: (row: { receipt_no: string }) => row.receipt_no,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: { paid_date: string }) => row.paid_date,
      sortable: true,
    },
    {
      name: "Mode",
      selector: (row: { mode: string }) => {
        return (
          <div
            className="ss"
            style={{
              background:
                row.mode === "CASH"
                  ? "rgba(52, 195, 143, 0.180392)"
                  : row.mode === "CARD"
                  ? "rgba(244, 106, 106, 0.180392)"
                  : row.mode === "DD"
                  ? "rgba(241, 180, 76, 0.180392)"
                  : "",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "3px",
              paddingBottom: "3px",
              borderRadius: "10px",
              textTransform: "capitalize",
            }}
          >
            {row.mode}
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Fee Amount",
      selector: (row: { fee_amount: string }) => row.fee_amount,
      sortable: true,
    },
    {
      name: "Fine",
      selector: (row: { fine: string }) => row.fine,
      sortable: true,
    },
    {
      name: "Paid",
      selector: (row: { already_paid: string }) => row.already_paid,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row: { balance: string }) => row.balance,
      sortable: true,
    },
    {
      button: true,
      cell: (row: any) => (
        // <Link to={`/receipt/${row.slip_id}`}>

        <div className="roundbtn" onClick={() => receiptModal(row)}>
          <FaEye color="#556EE6" />
        </div>

        // </Link>
      ),
    },
  ];

  function receiptModal(row: any) {
    console.log("row", row.slip_id);
    setReceiptId(row.slip_id);
    setReceiptModalOpen(true);
  }
  const headerComponent = useMemo(() => {
    return <h2 className="bold">Payment History</h2>;
  }, []);
  return (
    <Row className="tab-content">
      <Col>
        <DataTable
          columns={columns}
          data={studentList}
          selectableRowsHighlight
          pagination
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
        />
        <FeeReceiptModal
          show={receiptModalOpen}
          setShow={setReceiptModalOpen}
          slipId={receiptId}
        />
      </Col>
    </Row>
  );
}
export default ConsolidatedHistory;
