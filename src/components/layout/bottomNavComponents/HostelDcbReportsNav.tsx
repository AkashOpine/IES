import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, To, useLocation } from "react-router-dom";

function HostelDcbReportsNav() {
 const rollName: any = localStorage.getItem("roleName");
   const location = useLocation();
   const navItem: any = [
     {
       id: 1,
       name: "Detailed DCB",
       reportRoute: "/hostel-detailed-dcb-report",
     },
      {
       id: 2,
       name: "Type Wise DCB",
       reportRoute: "/hostel-type-wise-dcb-report",
     },
      {
       id: 3,
       name: "Consolidated DCB",
       reportRoute: "/hostel-consolidated-dcb-report",
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

export default HostelDcbReportsNav