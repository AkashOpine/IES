import React, { useMemo } from "react";
import { Col } from "react-bootstrap";
import {
  FaBarcode,
  FaBus,
  FaBusAlt,
  FaCog,
  FaDiceD20,
  FaFileAlt,
  FaGasPump,
  FaHome,
  FaHotel,
  FaMapMarkerAlt,
  FaRoute,
  FaUserGraduate,
} from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { TbBus, TbSteeringWheel } from "react-icons/tb";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../../assets/logo/logo1.png";
import logo2 from "../../assets/logo/bvb_ponnani.png";
import { setDefaultFeeHead } from "../../slices/settings/miscellaneousSettingSlice";
import { log } from "console";

export default function SidebarComponent() {
  const location = useLocation();
  const dispatch: any = useDispatch();
  const loginTypeId: any = localStorage.getItem("roleId");
  const rollName: any = localStorage.getItem("roleName");
  const reports_only: any = localStorage.getItem("only_reports");
  console.log("reports_only", reports_only);

  const icon = useMemo(() => {
    return (
      <>
        <div style={{ marginRight: "5px" }}>
          <FaCog></FaCog>
        </div>
      </>
    );
  }, []);
  const hostel = useMemo(() => {
    return (
      <>
        <div style={{ marginRight: "5px" }}>
          <FaHotel></FaHotel>
        </div>
      </>
    );
  }, []);
  const transport = useMemo(() => {
    return (
      <>
        <div style={{ marginRight: "5px" }}>
          <FaBusAlt></FaBusAlt>
        </div>
      </>
    );
  }, []);
  return (
    <ProSidebarProvider>
      <Sidebar style={{ height: "100%" }} className="side-bar">
        <div className="sidebar-header">
          <span className="sidebar-logo">
            <img src={logo1} alt="" />
          </span>
        </div>
        <Menu>
          <label className="sidebar-label">Menu</label>
          <Link to="/home">
            <MenuItem>
              <FaHome></FaHome> Dashboard{" "}
            </MenuItem>
          </Link>
          {rollName === "Accountant" ? (
            <>
              <Link to="/concession">
                <MenuItem>
                  <FaDiceD20></FaDiceD20> Concession
                </MenuItem>
              </Link>
              {/* <Link to="/concession/student">
                <MenuItem>
                  <FaDiceD20></FaDiceD20> Special Concession
                </MenuItem>
              </Link> */}
              {/* <Link to="/barcode">
                <MenuItem>
                  <FaBarcode></FaBarcode> Barcode{" "}
                </MenuItem>
              </Link> */}
            </>
          ) : (
            ""
          )}
          <SubMenu label="Hostel" className="sidebar-submenu" prefix={hostel}>
            <div className="sub-menu-content">
              <div>
                {rollName !== "Admin" ? (
                  <>
                    <Link to="/hostel-setting">
                      <MenuItem>Hostel setting</MenuItem>
                    </Link>
                    {/* <Link to="/individual-hostel-setting">
                              <MenuItem>Individaul Hostel setting</MenuItem>
                            </Link> */}
                  </>
                ) : (
                  ""
                )}
                <Link to="/hostel-defaulters-report">
                  <MenuItem>Hostel Report</MenuItem>
                </Link>
              </div>
            </div>
          </SubMenu>
          <div>
            <SubMenu
              label="Pre-registration "
              className="sidebar-submenu"
              prefix={hostel}
            >
              <div className="sub-menu-content">
                <div>
                  {rollName !== "Admin" ? (
                    <>
                      <Link to="/pre-registration-List">
                        <MenuItem> Pre Registration List</MenuItem>
                      </Link>
                      <Link to="/pre-registration-Report">
                        <MenuItem>Pre-Registration Report</MenuItem>
                      </Link>
                      <Link to="/admission-fee-report">
                        <MenuItem>Admission Fee Report</MenuItem>
                      </Link>
                      <Link to="/student-payment-type-report">
                        <MenuItem>Student Payment Type Report</MenuItem>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </SubMenu>
            <SubMenu
              label={
                rollName === "TransportAdmin"
                  ? "Transport settings"
                  : "Miscellaneous"
              }
              className="sidebar-submenu"
              prefix={icon}
            >
              <div className="sub-menu-content">
                {rollName === "Accountant" ? (
                  <div>
                    <Link to="/miscellaneous-setting">
                      <MenuItem>Miscellaneous fee</MenuItem>
                    </Link>{" "}
                    <Link
                      to="/miscellaneous-collection"
                      onClick={() => {
                        if (location.pathname != "/miscellaneous-collection") {
                          dispatch(setDefaultFeeHead());
                        }
                      }}
                    >
                      <MenuItem>Miscellaneous collection</MenuItem>
                    </Link>
                    <Link to="/miscellaneous-report">
                      <MenuItem>Miscellaneous Report</MenuItem>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                {rollName === "TransportAdmin" ? (
                  <>
                    <Link to="/transport-fee-setting">
                      <MenuItem>Individual Transport Fee</MenuItem>
                    </Link>
                    <Link to="/transport-setting">
                      <MenuItem>Transport settings</MenuItem>
                    </Link>
                    <Link to="/transport-class-fee-setting">
                      <MenuItem>Class Transport Fee</MenuItem>
                    </Link>
                  </>
                ) : (
                  ""
                )}
                {loginTypeId === "12" ? (
                  <Link to="/hostel-setting">
                    <MenuItem>Hostel settings</MenuItem>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </SubMenu>
          </div>
          <SubMenu
            label="Fee Settings"
            className="sidebar-submenu"
            prefix={icon}
          >
            <div className="sub-menu-content">
              <Link to="/add-fee-head">
                <MenuItem>Add Fee Head</MenuItem>
              </Link>

              <Link to="/add-fee-settings">
                <MenuItem>Add Fee Settings</MenuItem>
              </Link>
            </div>
          </SubMenu>
          <label className="sidebar-label">Reports</label>
          {rollName === "Accountant" || rollName === "Admin" ? (
            <>
              <Link to="/reports">
                <MenuItem>
                  <FaFileAlt></FaFileAlt> Reports{" "}
                </MenuItem>
              </Link>
            </>
          ) : (
            ""
          )}
          <div>
            <SubMenu
              label="DCB Reports"
              className="sidebar-submenu"
              prefix={hostel}
            >
              <div className="sub-menu-content">
                <div>
                  <Link to="/academic-detailed-dcb-report">
                    <MenuItem>Academic DCB </MenuItem>
                  </Link>
                  <Link to="/transport-detailed-dcb-report">
                    <MenuItem>Transport DCB </MenuItem>
                  </Link>
                  <Link to="/hostel-detailed-dcb-report">
                    <MenuItem>Hostel DCB </MenuItem>
                  </Link>
                  <Link to="/term-wise-report">
                    <MenuItem>Term-Wise Report </MenuItem>
                  </Link>
                </div>
              </div>
            </SubMenu>
          </div>
          <Link to="/consolidated-report">
            <MenuItem>
              <FaFileAlt></FaFileAlt> Duplicate Reciepts{" "}
            </MenuItem>
          </Link>
          <Link to="/transport-defaulters-report">
            <MenuItem>
              <FaFileAlt></FaFileAlt> Transport Reports{" "}
            </MenuItem>
          </Link>
          {/* <div>
            <label className="sidebar-label">Hostel</label>
            
          </div> */}
          {/* <label className="sidebar-label"> Pre-Registration</label> */}

          {rollName === "TransportAdmin" ||
          // rollName === "TransportManager" ||
          rollName === "Admin" ? (
            <div>
              <label className="sidebar-label">Transport</label>
              <SubMenu
                label="Transport"
                className="sidebar-submenu"
                prefix={transport}
              >
                <div className="sub-menu-content">
                  <Link to="/transport-list">
                    <MenuItem>
                      <FaBus></FaBus> Vehicle List
                    </MenuItem>
                  </Link>
                  <Link to="/transport-student-list">
                    <MenuItem>
                      <FaUserGraduate></FaUserGraduate> Student List
                    </MenuItem>
                  </Link>
                  <Link to="/driver-list">
                    <MenuItem>
                      <TbSteeringWheel></TbSteeringWheel> Driver List
                    </MenuItem>
                  </Link>
                  <Link to="/pickup-point-list">
                    <MenuItem>
                      <FaMapMarkerAlt></FaMapMarkerAlt> Pickup Point List
                    </MenuItem>
                  </Link>
                  <Link to="/route-list">
                    <MenuItem>
                      <FaRoute></FaRoute> Route List
                    </MenuItem>
                  </Link>
                  <Link to="/fuel-list">
                    <MenuItem>
                      <FaGasPump></FaGasPump> Fuel List
                    </MenuItem>
                  </Link>
                  <Link to="/repair-list">
                    <MenuItem>
                      <GiAutoRepair></GiAutoRepair> Repair List
                    </MenuItem>
                  </Link>
                </div>
              </SubMenu>
            </div>
          ) : (
            ""
          )}
          {
            // rollName === "TransportAdmin" ||
            rollName === "Accountant" ||
            !reports_only ||
            rollName === "Admin" ? (
              <>
                {rollName === "Accountant" || rollName === "TransportAdmin" ? (
                  <div>
                    {/* <label className="sidebar-label">Settings</label> */}
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )
          }
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  );
}
