import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import {
  FaBalanceScale,
  FaEye,
  FaFile,
  FaFileAlt,
  FaTrash,
} from "react-icons/fa";
import { GiAutoRepair, GiGasPump, GiSpeedometer } from "react-icons/gi";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setDefaultDocument,
  tryFetchTransportListData,
} from "../../slices/transport/transportSlice";
import AddFuelModal from "./AddFuel/AddFuelModal";
import AddRepairModal from "./AddRepair/AddRepairModal";
import AddVehicleModal from "./AddVehicleModal";
import { Overlay, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { apiPost } from "../../config/apiConfig";
import axios from "axios";
import { VEHICLE_DELETE } from "../../config/BaseUrl";
import { toast, ToastContainer } from "react-toastify";

function TransportList() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const transportData: any = useSelector((state: any) => state.transport);
  const [openModal, setOpenModal]: any = useState(false);
  const [fuelModal, setFuelModal]: any = useState(false);
  const [repairModal, setRepairModal]: any = useState(false);
  const [vehicleId, setVehicleId]: any = useState("");
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleModel = (row: any) => {
    setOpenModal(true);
    dispatch(setDefaultDocument());
  };
  const handleFuelModal = (row: any) => {
    setVehicleId(row.id);
    setFuelModal(true);
  };
  const handleRepairModal = (row: any) => {
    setVehicleId(row.id);
    setRepairModal(true);
  };
  useEffect(() => {
    dispatch(tryFetchTransportListData());
  }, []);
  const handleDeleteModal = (event: any, id: any) => {
    setShow(!show);
    setTarget(event.target);
    setItemId(id);
  };
  async function handleDelete(id: any) {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("vehicle_id", id);

      let resp: any = await apiPost(VEHICLE_DELETE, bodyFormData);
      console.log("DELETE vehicle datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        toast.error("Vehicle Details Deleted");

        dispatch(tryFetchTransportListData());
      } else {
        alert("Something happened please try again");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  const columns: any = [
    {
      name: "Sl NO",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Vehicle No",
      selector: (row: any) => row.vehicle_no,
      sortable: true,
    },
    {
      name: "Registration",
      selector: (row: any) => row.vehicle_reg_no,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: any) => row.vehicle_type_id,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: any) => row.vehicle_category,
      sortable: true,
    },
    {
      name: "Fuel",
      selector: (row: any) => row.fuel_type,
      sortable: true,
    },
    // {
    //   name: "Usage",
    //   selector: (row: any) => row.type_of_use,
    //   sortable: true,
    // },
    {
      name: "Action",
      button: true,
      cell: (row: any) => (
        <>
          <div className="d-flex align-items-center gap-2">
            <Link to={`/vehicle-profile/${row.id}`}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip`}>View</Tooltip>}
              >
                <div className="round-btn-group balance">
                  <BsEyeFill size={20} color="#545B62" />
                </div>
              </OverlayTrigger>
            </Link>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip`}>Fuel Filling</Tooltip>}
            >
              <div
                className="round-btn-group gas"
                onClick={() => handleFuelModal(row)}
              >
                <GiGasPump size={20} color="#545B62" />
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip`}>Maintanence</Tooltip>}
            >
              <div
                className="round-btn-group repair"
                onClick={() => handleRepairModal(row)}
              >
                <GiAutoRepair size={20} color="#545B62" />
              </div>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip`}>Delete</Tooltip>}
            >
              <div
                className="round-btn-group delete"
                onClick={(e) => handleDeleteModal(e, row.id)}
              >
                <FaTrash size={15} color="#fff" />
              </div>
            </OverlayTrigger>

            {/* <div className="round-btn-group file">
              <FaFileAlt size={20} color="#545B62" />
            </div>
            <div className="round-btn-group balance">
              <FaBalanceScale size={20} color="#545B62" />
            </div>
            <div className="round-btn-group speedometer">
              <GiSpeedometer size={20} color="#545B62" />
            </div> */}
          </div>
        </>
      ),
      width: "300px",
    },
  ];

  const headerComponent = useMemo(() => {
    return (
      <div className="tableTopSection">
        <h2>Vehicle List</h2>
        <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add new vehicle</span>
        </button>
      </div>
    );
  }, []);
  return (
    <div className="page-inner-content" ref={ref}>
      <ToastContainer />

      <DataTable
        columns={columns}
        data={transportData.transportListTableData}
        subHeader
        subHeaderComponent={headerComponent}
        subHeaderAlign={Alignment.LEFT}
        pagination
      />
      <AddVehicleModal modalOpen={openModal} setOpen={setOpenModal} />
      <AddFuelModal
        modalOpen={fuelModal}
        setOpen={setFuelModal}
        vehicleId={vehicleId}
      />
      <AddRepairModal
        modalOpen={repairModal}
        setOpen={setRepairModal}
        vehicleId={vehicleId}
      />
      <Overlay
        show={show}
        onHide={() => setShow(false)}
        rootClose={true}
        target={target}
        placement="left"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-basic">
          <Popover.Header as="h3">Confirm Delete?</Popover.Header>
          <Popover.Body>
            Are you sure you want to delete?
            <div className="d-flex gap-3 mt-3">
              <button className="btn-view" onClick={() => setShow(false)}>
                No
              </button>
              <button className="btn-view" onClick={() => handleDelete(itemId)}>
                Yes
              </button>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default TransportList;
