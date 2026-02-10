import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, To, useLocation } from "react-router-dom";

function TransportReportNav() {
  const rollName: any = localStorage.getItem("roleName");
  const location = useLocation();
  const navItem: any = [
    {
      id: 1,
      name: "Transport Defaulters",
      reportRoute: "/transport-defaulters-report",
      isTransport: true,
    },
    {
      id: 2,
      name: "Transport Fuel Report",
      reportRoute: "/transport-fuel-report",
      isTransport: rollName === "TransportAdmin" || "TransportManager",
    },
    {
      id: 3,
      name: "Transport Maintanence Report",
      reportRoute: "/transport-maintanence-report",
      isTransport: rollName === "TransportAdmin" || "TransportManager",
    },
    {
      id: 4,
      name: "Transport List Report",
      reportRoute: "/transport-list-report",
      isTransport: rollName === "TransportAdmin" || "TransportManager",
    },
    {
      id: 5,
      name: "Transport Fee Collection",
      reportRoute: "/transport-fee-collection",
      isTransport: rollName === "Accountant" || "TransportAdmin",
    },
  ];

  const [activeId, setActiveId] = useState(1);
  return (
    <Row>
      <Col md={12}>
        <nav className="report-nav">
          <ul>
            {navItem.map((items: any) => {
              if (items.isTransport)
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

export default TransportReportNav;
