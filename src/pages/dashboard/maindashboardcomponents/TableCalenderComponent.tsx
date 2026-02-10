import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Calendar from "react-calendar";
import { FaEye } from "react-icons/fa";
import { log } from "console";
import DailyFeeCollection from "./DailyFeeCollection";
import TillMonthCollectionComponent from "./TillMonthCollectionComponent";
function TableCalenderComponent(props: any) {
  const [value, onChange] = useState(new Date());
  const columns = [
    {
      name: "Student Name",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row: any) => row.year,
      sortable: true,
    },
    {
      name: "Request",
      selector: (row: any) => row.year,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row: any) => row.year,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <div className="settingsButtonsContainer">
          <div className="settings-btn viewBtn">
            <FaEye size={12} />
          </div>
        </div>
      ),
      center: true,
    },
  ];

  const data: any = [];
  return (
    <Row>
      <Col md={8}>
        <Row>
          <Col md={12}>
            <TillMonthCollectionComponent data={props.data} />
          </Col>
          {/* <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6]}
        /> */}
          <Col md={12}>
            <DailyFeeCollection data={props.data} />
          </Col>
        </Row>
      </Col>
      <Col md={4}>
        <Calendar onChange={onChange} value={value} />
      </Col>
    </Row>
  );
}

export default TableCalenderComponent;
