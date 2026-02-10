import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditDriverDetails from "./EditDriverDetails";
import { useReactToPrint } from "react-to-print";

function GeneralDetails() {
  const data = useSelector((state: any) => state.transport?.driverProfileData);
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
          <span>Name</span>
          <span>{data.driver_name}</span>
        </div>
        <div className="general-contents">
          <span>Address</span>
          <span>{data.address}</span>
        </div>
        {/* <div className="general-contents">
        <span>Designation</span>
        <span>{data.designation}</span>
      </div> */}
        <div className="general-contents">
          <span>Description</span>
          <span>{data.description}</span>
        </div>
        <div className="general-contents">
          <span>Date of birth</span>
          <span>{data.dob}</span>
        </div>
        <div className="general-contents">
          <span>Blood Group</span>
          <span>{data.blood_group}</span>
        </div>
        <div className="general-contents">
          <span>Phone Number</span>
          <span>{data.phone}</span>
        </div>
        <div className="general-contents">
          <span>Mobile Number</span>
          <span>{data.mobile}</span>
        </div>
        <div className="general-contents">
          <span>Experience</span>
          <span>{data.experience}</span>
        </div>
        <div className="general-contents">
          <span>Emergency Contact Name</span>
          <span>{data.emergency_contact_name}</span>
        </div>
        <div className="general-contents">
          <span>Emergency Contact Number</span>
          <span>{data.emergency_contact_phone}</span>
        </div>
        <div className="general-contents">
          <span>Emergency Contact relation</span>
          <span>{data.emergency_contact_relationship}</span>
        </div>
        <div className="general-contents">
          <span>Assistant Name</span>
          <span>{data.driver_assistant_name}</span>
        </div>
        <div className="general-contents">
          <span>Licence Number</span>
          <span>{data.liscence_no}</span>
        </div>
      </div>
      <div className="button-details">
        <button className="m_button btn-print" onClick={handlePrint}>
          <span>Print</span>
        </button>
        <button className="m_button btn-edit" onClick={handleEditModalOpen}>
          <span>Edit</span>
        </button>
        <EditDriverDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
}

export default GeneralDetails;
