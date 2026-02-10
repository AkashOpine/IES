import React, { useEffect, useState } from "react";
import Moment from "moment";
import { tryUserLogOut } from "../../slices/authentication/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import YearlyCollectionComponent from "./maindashboardcomponents/YearlyCollectionComponent";
import TillMonthCollectionComponent from "./maindashboardcomponents/TillMonthCollectionComponent";
import TableCalenderComponent from "./maindashboardcomponents/TableCalenderComponent";
function MainDashBoardFee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let date: any = new Date();
  const [nowDate, setNowDate] = useState(Moment(date).format("YYYY-MM-DD"));
  const [nowTime, setNowTime] = useState(Moment(date).format("HH:mm:ss"));
  // let nowDate = Moment(date).format("YYYY-MM-DD");
  // let nowTime = Moment(date).format("HH:mm:ss");
  // const autoLogOut = () => {
  //   console.log("nowDate", nowDate);
  //   console.log("nowTime", nowTime);
  //   console.log("Date", localStorage.getItem("expireDate"));
  //   console.log("Time", localStorage.getItem("expireTime"));
  //   setNowDate(Moment(date).format("YYYY-MM-DD"));
  //   setNowTime(Moment(date).format("HH:mm:ss"));
  // };
  useEffect(() => {
    console.log("nowDate", nowDate);
    console.log("nowTime", nowTime);
    console.log("Date", localStorage.getItem("expireDate"));
    console.log("Time", localStorage.getItem("expireTime"));
    if (
      nowDate === localStorage.getItem("expireDate") &&
      nowTime === localStorage.getItem("expireTime")
    ) {
      dispatch(tryUserLogOut({ navigate }));
    }
  }, [date]);
  return <div className="maindashboard-fee">DASHBOARD</div>;
}

export default MainDashBoardFee;
