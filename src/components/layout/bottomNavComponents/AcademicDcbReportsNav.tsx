import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, To, useLocation } from "react-router-dom";

function AcademicDcbReportsNav() {
  const rollName: any = localStorage.getItem("roleName");
  const location = useLocation();
  const navItem: any = [
    {
      id: 1,
      name: "Detailed DCB",
      reportRoute: "/academic-detailed-dcb-report",
    },
    {
      id: 2,
      name: "Class Wise DCB",
      reportRoute: "/academic-class-wise-dcb-report",
    },
    {
      id: 3,
      name: "Consolidated DCB",
      reportRoute: "/academic-consolidated-dcb-report",
    },
     {
      id: 4,
      name: "Academic Defaulters",
      reportRoute: "/academic-defaulters",
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

export default AcademicDcbReportsNav;
