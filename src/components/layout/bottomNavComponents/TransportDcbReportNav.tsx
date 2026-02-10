import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function TransportDcbReportNav() {
  const rollName: any = localStorage.getItem("roleName");
  const location = useLocation();
  const navItem: any = [
    {
      id: 1,
      name: "Detailed DCB",
      reportRoute: "/transport-detailed-dcb-report",
    },
    {
      id: 2,
      name: "Route Wise DCB",
      reportRoute: "/transport-route-wise-dcb-report",
    },
    {
      id: 3,
      name: "Consolidated DCB",
      reportRoute: "/transport-consolidated-dcb-report",
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


export default TransportDcbReportNav