import axios from "axios";
import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiPost } from "../../config/apiConfig";
import { PAY_FEES } from "../../config/BaseUrl";
function FeesSummary(props: any) {
  const feesSummaryData: any = useSelector((state: any) => state.feeTable);
  console.log("fee summary data", feesSummaryData);
  useEffect(() => {}, [feesSummaryData.selectedMonth]);

  async function handleSubmit() {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append(
        "Authorization",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbl9kYXRhIjp7ImlkIjoiMTMiLCJuYW1lIjoiJ0ZlZSBBY2NvdW50YW50JyIsInJvbGUiOiI1Iiwicm9sZV9uYW1lIjoiQWNjb3VudGFudCJ9fQ.hncYyEZkh_udO8SLlA2KQ6WrLIYYDSUHxdvSZUh_Y9M"
      );
      bodyFormData.append(
        "academic_year",
        feesSummaryData.feeData?.academic_year
      );
      bodyFormData.append("student_id", "2266");
      bodyFormData.append("date", "2266");
      bodyFormData.append("payment_type", "2266");
      bodyFormData.append("cheque_no", "2266");
      bodyFormData.append("bank_name", "2266");
      bodyFormData.append("bank_br", "2266");
      bodyFormData.append("month_arr", "2266");
      bodyFormData.append("academic_fee_fine", "2266");
      bodyFormData.append("tmonth_arr", "2266");
      bodyFormData.append("trans_fine", "2266");
      bodyFormData.append("hmonth_arr", "2266");
      bodyFormData.append("hostel_feesettings", "2266");
      bodyFormData.append("hostel_fine", "2266");
      let resp: any = await apiPost(PAY_FEES, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        // setClassList(resp.response.data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <Card className="fee-summary-card">
      <Row className="mb-3">
        <Col md={6} className="summary-text">
          {feesSummaryData.rawName1}
        </Col>
        <Col md={6} className="summary-text text-end">
          {feesSummaryData.rawSum1}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} className="summary-text">
          {feesSummaryData.rawName2}
        </Col>
        <Col md={6} className="summary-text text-end">
          {feesSummaryData.rawSum2}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} className="summary-text">
          {feesSummaryData.rawName3}
        </Col>
        <Col md={6} className="summary-text text-end">
          {feesSummaryData.rawSum3}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} className="summary-text">
          {feesSummaryData.rawName4}
        </Col>
        <Col md={6} className="summary-text text-end">
          {feesSummaryData.rawSum4}
        </Col>
      </Row>

      <hr />
      <Row className="mb-4">
        <Col md={6} className="bold">
          Total
        </Col>
        <Col md={6} className=" text-end bold">
          {feesSummaryData.allRawTotal}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12} className="d-flex justify-content-around">
          <div className="pay-type">
            <input type="radio" name="pay" />
            Cash
          </div>
          <div className="pay-type">
            <input type="radio" name="pay" />
            Card
          </div>
          <div className="pay-type">
            <input type="radio" name="pay" />
            Cheque
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <button className="button-70 w-100" onClick={() => handleSubmit()}>
            Pay now
          </button>
        </Col>
      </Row>
    </Card>
  );
}

export default FeesSummary;
