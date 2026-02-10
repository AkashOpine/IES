import React, { useEffect, useState } from "react";
import Moment from "moment";
import { tryUserLogOut } from "../../slices/authentication/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Spinner } from "react-bootstrap";
import YearlyCollectionComponent from "./maindashboardcomponents/YearlyCollectionComponent";
import TillMonthCollectionComponent from "./maindashboardcomponents/TillMonthCollectionComponent";
import TableCalenderComponent from "./maindashboardcomponents/TableCalenderComponent";
import { apiPost } from "../../config/apiConfig";
import {
  MANAGEMENT_DASHBOARD,
  MANAGEMENT_DASHBOARD_BACKEND_API,
} from "../../config/BaseUrl";
import axios from "axios";
import DailyFeeCollection from "./maindashboardcomponents/DailyFeeCollection";
import TermWiseDCB from "./maindashboardcomponents/TermWiseDCB";
function MainDashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dashboard, setDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const expiryTime: any = localStorage.getItem("expireTime");
  //   console.log("expiretime", expiryTime);
  //   const now = Date.now();

  //   if (expiryTime && now < expiryTime) {
  //     const timeLeft = expiryTime - now;
  //     console.log("timeLeft", timeLeft);

  //     const logoutTimer = setTimeout(() => {
  //       console.log("logout success");
  //       dispatch(tryUserLogOut({ navigate }));
  //     }, timeLeft);

  //     return () => clearTimeout(logoutTimer);
  //   }
  // }, []);
  async function getManagementDashboardData() {
    try {
      setIsLoading(true);
      console.log("dashboard data started");
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(MANAGEMENT_DASHBOARD, bodyFormData);
      console.log("dashboard data is ", resp);
      if (resp.response.data.status == 200) {
        setIsLoading(false);
        setDashboard(resp.response.data.data.Details);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        console.log("error message: ", error.message);
        return error.message;
      } else {
        setIsLoading(false);
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  async function getDashboardBackendData() {
    try {
      setIsLoading(true);
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp2: any = await apiPost(
        MANAGEMENT_DASHBOARD_BACKEND_API,
        bodyFormData
      );
      console.log("dashboard data is ", resp2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        console.log("error message: ", error.message);
        return error.message;
      } else {
        setIsLoading(false);
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  useEffect(() => {
    getManagementDashboardData();
    getDashboardBackendData();
  }, []);

  return (
    <div className="maindashboard">
      <>
        {isLoading ? (
          <Col md={12} className="loaderContainer">
            <Spinner animation="grow" variant="primary" />
          </Col>
        ) : (
          <div>
            <Row>
              <Col md={12}>
                <YearlyCollectionComponent data={dashboard} />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mt-3">
                {/* <TillMonthCollectionComponent data={dashboard} /> */}
                <TermWiseDCB data={dashboard} />
              </Col>
            </Row>
            {/* <Row>
              <Col md={12} className="mt-3">
                <DailyFeeCollection data={dashboard} />
              </Col>
            </Row> */}
            <Row>
              <Col md={12} className="mt-3">
                <TableCalenderComponent data={dashboard} />
              </Col>
            </Row>
          </div>
        )}
      </>
    </div>
  );
}

export default MainDashBoard;
