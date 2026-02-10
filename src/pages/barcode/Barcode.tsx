import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import { Row, Col } from "react-bootstrap";
import BarCodeHeader from "./BarCodeHeader";

const BarcodeGenerator = () => {
  const [from, setFrom]: any = useState("");
  const [to, setTo]: any = useState("");
  const [copies, setCopies]: any = useState("");
  const [barcodes, setBarcodes]: any = useState([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setBarcodes(
      Array.from({ length: to - from + 1 }, (_, i) => Number(from) + i)
    );
  };
  useEffect(() => {
    console.log("array to", to);
    console.log("array from", from);
    console.log("array", barcodes);
  }, [barcodes, from, to]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <form onSubmit={handleSubmit}>
            <BarCodeHeader
              from={from}
              setFrom={setFrom}
              to={to}
              setTo={setTo}
              copies={copies}
              setCopies={setCopies}
            />
          </form>
        </Col>
      </Row>
      {copies !== "" ? (
        <Row>
          <Col md={12} className="mt-2">
            <div>
              {barcodes.map((value: any, index: any) =>
                Array.from({ length: copies }, (_, i) => (
                  <Barcode key={index * copies + i} value={value} />
                ))
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <div className="loaderContainer">
          <span className="barcode_text">BARCODE WILL BE DISPLAY HERE</span>
        </div>
      )}
    </>
  );
};

export default BarcodeGenerator;
