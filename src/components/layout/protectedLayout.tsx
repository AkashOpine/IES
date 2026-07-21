import { Col, Container, Row } from "react-bootstrap";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import SidebarComponent from "./sidebar";
import MainNav from "./MainNav";
import BottomNav from "./BottomNav";
import BottomBar from "./BottomBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { tryUserLogOut } from "../../slices/authentication/authSlice";
//import { useAuth } from "../../hooks/useAuth";
import moment from "moment";
export const ProtectedLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feesData: any = useSelector((state: any) => state.feeTable);
  const receipt: any = useSelector((state: any) => state.receipt.receiptData);
  const user = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expires");
  const params = useParams();
  // useEffect(() => {
  //   console.log("year", params);
  // }, [params]);

  // if (!user) {
  //   return <Navigate to="/" />;
  // }
  useEffect(() => {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const expireDateTime = moment(expiryDate).format("YYYY-MM-DD HH:mm:ss");
    // console.log("expirt date time", expireDateTime);
    // console.log("current date time", expireDateTime < currentDateTime);
    if (expireDateTime < currentDateTime) {
      dispatch(tryUserLogOut({ navigate }));
    }
  }, []);
  useEffect(() => {
    const expiryTime: any = localStorage.getItem("expireTime");
    const now = Date.now();

    if (expiryTime && now < expiryTime) {
      const timeLeft = expiryTime - now;
      // console.log("timeLeft", timeLeft);

      const logoutTimer = setTimeout(() => {
        // console.log("logout success");
        dispatch(tryUserLogOut({ navigate }));
      }, timeLeft);

      return () => clearTimeout(logoutTimer);
    }
  }, []);
  let bottombar;
  let navStyle;
  switch (location.pathname) {
    case "/home":
      bottombar = "MainSearchNav";
      navStyle = "btm-nav";
      break;
    // case `/dashboard/${feesData.feeData.student_details?.student_id}`:
    //   bottombar = "MainSearchNav";
    //   navStyle = "btm-nav";
    //   break;
    case `/dashboard/${feesData.feeData.student_details?.student_id}/${params?.year}`:
      bottombar = "MainSearchNav";
      navStyle = "btm-nav";
      break;
    case `/concession/student/${feesData.feeData.student_details?.student_id}`:
      bottombar = "MainSearchNav";
      navStyle = "btm-nav";
      break;
    case `/concession/student`:
      bottombar = "MainSearchNav";
      navStyle = "btm-nav";
      break;
    case `/class-wise-list`:
      bottombar = "MainSearchNav";
      navStyle = "btm-nav";
      break;

    case `/reports`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/daily-summary-report`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/payment-mode-report`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/dcb-report`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/concession-report`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/detailed-fee-collection-report`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/head-wise-report`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/defaulters-report`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/defaulters`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;
    case `/transport-setting`:
      bottombar = "MainSearchNav";
      navStyle = "btm-nav";
      break;
    case `/transport-defaulters-report`:
      bottombar = "TransportReports";
      navStyle = "btm-report-nav";
      break;
    case `/transport-fuel-report`:
      bottombar = "TransportReports";
      navStyle = "btm-report-nav";
      break;
    case `/transport-maintanence-report`:
      bottombar = "TransportReports";
      navStyle = "btm-report-nav";
      break;
    case `/transport-student-list`:
      bottombar = "TransportStudentList";
      navStyle = "btm-nav";
      break;
    case `/hostel-defaulters-report`:
      bottombar = "HostelReports";
      navStyle = "btm-report-nav";
      break;
    case `/hostel-list-report`:
      bottombar = "HostelReports";
      navStyle = "btm-report-nav";
      break;
    case `/transport-list-report`:
      bottombar = "TransportReports";
      navStyle = "btm-report-nav";
      break;
    case `/transport-fee-collection`:
      bottombar = "TransportReports";
      navStyle = "btm-report-nav";
      break;
    case `/daily-fee-collection`:
      bottombar = "FeeReports";
      navStyle = "btm-report-nav";
      break;

    case `/academic-detailed-dcb-report`:
      bottombar = "AcademicDCBreport";
      navStyle = "btm-report-nav";
      break;

    case `/academic-class-wise-dcb-report`:
      bottombar = "AcademicDCBreport";
      navStyle = "btm-report-nav";
      break;

    case `/academic-consolidated-dcb-report`:
      bottombar = "AcademicDCBreport";
      navStyle = "btm-report-nav";
      break;
    case `/academic-defaulters`:
      bottombar = "AcademicDCBreport";
      navStyle = "btm-report-nav";
      break;

    case `/transport-detailed-dcb-report`:
      bottombar = "TransportDCBreport";
      navStyle = "btm-report-nav";
      break;

    case `/transport-route-wise-dcb-report`:
      bottombar = "TransportDCBreport";
      navStyle = "btm-report-nav";
      break;

    case `/transport-consolidated-dcb-report`:
      bottombar = "TransportDCBreport";
      navStyle = "btm-report-nav";
      break;

    case `/hostel-detailed-dcb-report`:
      bottombar = "hostelDCBreport";
      navStyle = "btm-report-nav";
      break;
    case `/hostel-type-wise-dcb-report`:
      bottombar = "hostelDCBreport";
      navStyle = "btm-report-nav";
      break;
    case `/hostel-consolidated-dcb-report`:
      bottombar = "hostelDCBreport";
      navStyle = "btm-report-nav";
      break;
  }

  return (
    <Container fluid className="main-content">
      <Row>
        <Col md={2} className="sidebarComponent">
          <SidebarComponent />
        </Col>

        <Col md={10} className="mainBodyComponent">
          <Row>
            <Col md={12} className="navBarComponent">
              <Row className="navRow">
                <Col md={12}>
                  <MainNav />
                </Col>
              </Row>

              <Row className="navRow">
                <Col md={12} className={navStyle}>
                  <BottomNav navStatus={bottombar} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="page-content">
              <Outlet />
            </Col>
          </Row>
          {feesData.allRawTotal > 0 ? (
            <Row>
              <Col md={12} className="bottom">
                <BottomBar />
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};
