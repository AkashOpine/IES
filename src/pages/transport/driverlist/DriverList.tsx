import React, { useEffect, useMemo, useState, useRef } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { tryFetchDriverListData } from "../../../slices/transport/transportSlice";
import AddDriverModal from "./AddDriverModal";
import { FaTrash } from "react-icons/fa";
import { Overlay, Popover } from "react-bootstrap";
import { apiPost } from "../../../config/apiConfig";
import { DRIVER_DELETE } from "../../../config/BaseUrl";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function DriverList() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const transportData: any = useSelector((state: any) => state.transport);
  const [openModal, setOpenModal]: any = useState(false);
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleModel = (row: any) => {
    setOpenModal(true);
  };
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
      bodyFormData.append("driver_id", id);

      let resp: any = await apiPost(DRIVER_DELETE, bodyFormData);
      console.log("DELETE driver datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        dispatch(tryFetchDriverListData());
        toast.error("Driver Details Deleted");
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
      name: "Academic year",
      selector: (row: any) => row.academic_year,
      sortable: true,
      width: "150px",
    },
    {
      name: "Driver",
      selector: (row: any) => row.driver_name,
      sortable: true,
      width: "100px",
    },
    {
      name: "Assistant",
      selector: (row: any) => row.driver_assistant_name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Address",
      selector: (row: any) => row.address,
      sortable: true,
      width: "200px",
    },

    {
      name: "Phone",
      selector: (row: any) => row.phone,
      sortable: true,
      width: "150px",
    },
    {
      name: "Mobile",
      selector: (row: any) => row.mobile,
      sortable: true,
      width: "150px",
    },
    {
      name: "Experience",
      selector: (row: any) => row.experience,
      sortable: true,
      width: "100px",
    },
    // {
    //   name: "Designation",
    //   selector: (row: any) => row.designation,
    //   sortable: true,
    //   width: "150px",
    // },
    {
      name: "Licence No",
      selector: (row: any) => row.liscence_no,
      sortable: true,
      width: "150px",
    },

    {
      name: "Action",
      button: true,
      cell: (row: any) => (
        <>
          <div className="d-flex align-items-center gap-2">
            <Link to={`/driver-profile/${row.id}`}>
              <div className="round-btn-group balance">
                <BsEyeFill size={20} color="#545B62" />
              </div>
            </Link>
            <div
              className="round-btn-group delete"
              onClick={(e) => handleDeleteModal(e, row.id)}
            >
              <FaTrash size={15} color="#fff" />
            </div>
          </div>
        </>
      ),
      // width: "300px",
    },
  ];

  const headerComponent = useMemo(() => {
    return (
      <div className="tableTopSection">
        <h2>Driver List</h2>
        <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add Driver</span>
        </button>
      </div>
    );
  }, []);
  useEffect(() => {
    dispatch(tryFetchDriverListData());
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          data={transportData.driverListData}
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
        />
      </div>
      <AddDriverModal modalOpen={openModal} setOpen={setOpenModal} />
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
    </>
  );
}

export default DriverList;
