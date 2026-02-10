import axios from "axios";
import { AnyAaaaRecord } from "dns";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { apiPost } from "../../config/apiConfig";
import { STUDENT_LIST } from "../../config/BaseUrl";
import { tryFetchStudentSearchList } from "../../slices/navsearch/ClassWiseSearchSlice";

function FeeHistory() {
  const dispatch = useDispatch();
  const { id, year }: any = useParams();
  const feesData: any = useSelector((state: any) => state.feeTable);
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
        <Link to={`/receipt/${row.slip_id}`}>
          <div className="roundbtn">
            <FaEye color="#556EE6" />
          </div>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    dispatch(
      tryFetchStudentSearchList({
        academicYear: feesData?.feeData?.academic_year || "",
        studentId: id,
      })
    );
  }, [id, feesData?.feeData?.academic_year]);
  const headerComponent = useMemo(() => {
    return <h2>Fee History</h2>;
  }, []);
  return (
    <div className="page-inner-content">
      <DataTable
        columns={columns}
        data={studentList}
        selectableRowsHighlight
        pagination
        subHeader
        subHeaderComponent={headerComponent}
        subHeaderAlign={Alignment.LEFT}
      />
    </div>
  );
}

export default FeeHistory;
