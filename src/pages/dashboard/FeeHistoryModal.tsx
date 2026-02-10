import React, { useEffect, useMemo, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeeReceiptModal from "../receipt/FeeReceiptModal";

function FeeHistoryModal(props: any) {
  const feesData: any = useSelector((state: any) => state.feeTable);
  const studentList = useSelector(
    (state: any) => state.classWiseList.studentSearch
  );
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  function receiptModal(row: any) {
    console.log("row", row?.slip_id);
    setReceiptId(row?.slip_id);
    setReceiptModalOpen(true);
  }
  useEffect(() => {
    console.log("feesData collectiom", feesData);
    console.log("studemsts list collectiom", studentList);
  }, [feesData, studentList]);

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
  const headerComponent = useMemo(() => {
    return <h2 className="bold">Fee History</h2>;
  }, []);
  const handleClose = () => props.setShow(false);
  return (
    <>
      <Modal
        show={props.show}
        //   onHide={() => props.setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="pay-modal-summary"
      >
        <div className="modalHeader">
          <Row>
            <Col md={8} className="student-profile-details">
              <div className="student-image">
                <div className="student-image-container">
                  <img
                    src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="student-details student-detail-font">
                <span className="bold mb-1">
                  {feesData.feeData.student_details?.name}
                </span>
                {feesData.feeData.student_details?.class +
                  " " +
                  feesData.feeData.student_details?.division}
              </div>
              <div className="student-class">
                <span className="mb-2 student-detail-font">
                  {feesData.feeData.student_details?.old_admission_no}
                </span>
                <div className="privilage">
                  <span className="student-privilage">
                    {feesData.feeData.student_details?.concession_type
                      ? feesData.feeData.student_details?.concession_type
                      : "No special privilage"}
                  </span>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <button onClick={handleClose}></button>
            </Col>
          </Row>
        </div>
        <Modal.Body>
          <DataTable
            columns={columns}
            data={studentList || []}
            selectableRowsHighlight
            pagination
            subHeader
            subHeaderComponent={headerComponent}
            subHeaderAlign={Alignment.LEFT}
          />
        </Modal.Body>
      </Modal>
      <FeeReceiptModal
        show={receiptModalOpen}
        setShow={setReceiptModalOpen}
        slipId={receiptId}
      />
    </>
  );
}

export default FeeHistoryModal;
