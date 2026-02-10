import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaCoins } from "react-icons/fa";
import { useSelector } from "react-redux";
import TableDetails from "./TableDetails";
import TableHeader from "./tableHeader";
import { useParams } from "react-router-dom";
import TableDetailsConcession from "./TableDetailsConcession";
function FeesTable() {
  const params = useParams();
  console.log("params0___________", params);

  return (
    <Card className="fees-table-card">
      <Row>
        <TableHeader />
      </Row>
      <Row>{params.type ? <TableDetailsConcession /> : <TableDetails />}</Row>
    </Card>
  );
}

export default FeesTable;
