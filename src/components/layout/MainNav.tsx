import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FaBeer } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import icon from "../../assets/icon/icon.png";
import icon1 from "../../assets/icon/icon1.png";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { tryUserLogOut } from "../../slices/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MainNav() {
  const loginType: any = useSelector((state: any) => state.auth);
  const loginName = localStorage.getItem("roleName");
  const dispatch = useDispatch();
  const [socialDrp, setsocialDrp] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(tryUserLogOut({ navigate }));
  };
  return (
    <div className="mainNavContainer navBar">
      <Row>
        <Col md={12} className=" main-nav-inner">
          <div className="main-search">
            <div className="position">
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="search-input"
              ></input>
              <span>
                <FaSearch color="#DADADA" />
              </span>
            </div>
          </div>
          <div className="profile-area">
            <img src={icon} alt="" />
            <img src={icon1} alt="" />

            <div className="profile-name">{loginName}</div>
            <Dropdown
              className="d-inline-block"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item waves-effect profile-btn"
                tag="button"
              >
                <div className="profile-icon">
                  {loginName !== null ? loginName.charAt(0) : "R"}
                </div>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
}
