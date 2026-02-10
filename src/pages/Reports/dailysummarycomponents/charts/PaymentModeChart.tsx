import React from "react";
import { AgChartsReact } from "ag-charts-react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
function PaymentModeChart() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const options = {
    data: paymentReport.dailySummaryReportData?.payment_mode,
    series: [
      {
        type: "pie",
        labelKey: "Payment_name",
        // calloutLabelKey: "feehead_name",

        sectorLabelKey: "Price",
        angleKey: "Price",
        innerRadiusOffset: -40,
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
        },

        // innerCircle: {
        //   fill: "#dff3ea",
        // },
        // innerLabels: [
        //   {
        //     text: "asdgas",
        //     color: "#35ab7c",
        //     fontSize: 72,
        //   },
        //   {
        //     text: "Coverage",
        //     fontSize: 24,
        //     margin: 4,
        //   },
        // ],
      },
    ],

    legend: {
      enabled: true,
      position: "bottom",
    },
  };
  return (
    <Row>
      <Col md={12}>
        <AgChartsReact options={options} />
      </Col>
    </Row>
  );
}

export default PaymentModeChart;
