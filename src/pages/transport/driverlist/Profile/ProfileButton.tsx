import React, { useState } from "react";
import EditDriverDetails from "./EditDriverDetails";

function ProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="button-details">
      <button className="m_button btn-print">
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
  );
}

export default ProfileButton;
