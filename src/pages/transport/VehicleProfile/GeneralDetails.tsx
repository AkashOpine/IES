import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditVehicleDetails from "./EditVehicleDetails";
import { useReactToPrint } from "react-to-print";
function GeneralDetails() {
  const data = useSelector((state: any) => state.transport?.vehicleProfileData);
  const componentRef: any = React.useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsModalOpen(true);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-btn",
    pageStyle: "margin:50px",
  });
  return (
    <>
      <div className="general-tab-content" ref={componentRef}>
        <div className="general-contents">
          <span>Vehicle Number</span>
          <span>{data.vehicle_no}</span>
        </div>
        <div className="general-contents">
          <span>Register Number</span>
          <span>{data.vehicle_reg_no}</span>
        </div>
        <div className="general-contents">
          <span>Description</span>
          <span>{data.description}</span>
        </div>
        <div className="general-contents">
          <span>Vehicle Type</span>
          <span>{data.vehicle_type_name}</span>
        </div>
        <div className="general-contents">
          <span>Fuel Type</span>
          <span>{data.fuel_type_name}</span>
        </div>
        <div className="general-contents">
          <span>Type of Use</span>
          <span>{data.type_of_use_name}</span>
        </div>
        <div className="general-contents">
          <span>Category</span>
          <span>{data.category_name}</span>
        </div>
        {/* <div className="general-contents">
        <span>Model</span>
        <span>{data.model}</span>
      </div>
      <div className="general-contents">
        <span>No. of seats</span>
        <span>{data.no_of_seats}</span>
      </div> */}
        <div className="general-contents">
          <span>Ownership</span>
          <span>{data.ownership}</span>
        </div>
      </div>
      <div className="button-details">
        <button className="m_button btn-print" onClick={handlePrint}>
          <span>Print</span>
        </button>
        <button className="m_button btn-edit" onClick={handleEditModalOpen}>
          <span>Edit</span>
        </button>
        <EditVehicleDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
}

export default GeneralDetails;
