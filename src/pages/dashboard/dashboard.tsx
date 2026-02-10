import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import FeesSummary from "./FeesSummary";
import FeesTable from "./FeesTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearRawDatas,
  tryFetchFeeTableData,
} from "../../slices/feetable/feeTableSlice";

import {
  clearSearch,
  tryFetchStudentSearchList,
} from "../../slices/navsearch/ClassWiseSearchSlice";
import { tryUserLogOut } from "../../slices/authentication/authSlice";

function Dashboard() {
  const feesData: any = useSelector((state: any) => state.feeTable);
  let { id, year } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("patrams", year, id);

    dispatch(tryFetchFeeTableData({ academicYear: year || "", studentId: id }));
    dispatch(clearSearch());
    return () => {
      dispatch(clearSearch());
      dispatch(clearRawDatas());
    };
  }, [id, year]);

  useEffect(() => {
    dispatch(
      tryFetchStudentSearchList({
        academicYear: feesData?.feeData?.academic_year || "",
        studentId: id,
      })
    );
  }, [id, feesData?.feeData?.academic_year]);

  return (
    <>
      {feesData.isLoading ? (
        <div className="loaderContainer">
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <div className="page-inner-content" style={{ paddingBottom: "4em" }}>
          <Row>
            <Col md={12}>
              <FeesTable />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Dashboard;
