import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, To, useLocation } from "react-router-dom";

function ReportNav() {
  const location = useLocation();
  const navItem: any = [
    {
      id: 1,
      name: "Fee Report",
      reportRoute: "/reports",
    },
    {
      id: 2,
      name: "Daily Summary",
      reportRoute: "/daily-summary-report",
    },
    {
      id: 3,
      name: "Payment mode",
      reportRoute: "/payment-mode-report",
    },
    { id: 4, name: "DCB", reportRoute: "/dcb-report" },
    {
      id: 5,
      name: "Concession",
      reportRoute: "/concession-report",
    },
    {
      id: 6,
      name: "Detailed fee Collection",
      reportRoute: "/detailed-fee-collection-report",
    },
    {
      id: 7,
      name: "Headwise",
      reportRoute: "/head-wise-report",
    },
    {
      id: 8,
      name: "New Defaulters",
      reportRoute: "/defaulters",
    },
    {
      id: 9,
      name: "Daily Fee Collection",
      reportRoute: "/daily-fee-collection",
    },
    // {
    //   id: 8,
    //   name: "Defaulters",
    //   reportRoute: "/defaulters-report",
    // },
  ];

  const [activeId, setActiveId] = useState(1);
  useEffect(() => {}, [activeId]);
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

export default ReportNav;
