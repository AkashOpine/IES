import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, To, useLocation } from "react-router-dom";

function HostelReportNav() {
  const location = useLocation();
  const navItem: any = [
    {
      id: 1,
      name: "Hostel Defaulters",
      reportRoute: "/hostel-defaulters-report",
    },
    {
      id: 2,
      name: "Hostel List",
      reportRoute: "/hostel-list-report",
    },
  ];

  const [activeId, setActiveId] = useState(1);
  return (
    <Row>
      <Col md={12}>
        <nav className="report-nav">
          <ul>
            {navItem.map((items: any) => {
              return (
                <Link to={items.reportRoute}>
                  <li
                    onClick={() => setActiveId(items.id)}
                    className={`${activeId === items.id ? "active" : ""}`}
                  >
                    {items.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </Col>
    </Row>
  );
}

export default HostelReportNav;
