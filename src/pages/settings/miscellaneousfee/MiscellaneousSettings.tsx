import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GiAutoRepair, GiGasPump, GiSpeedometer } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { tryFetchMiscellaneousSettingList } from "../../../slices/settings/miscellaneousSettingSlice";
import AddMiscellaneousModal from "./AddMiscellaneousModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import axios from "axios";
import { apiPost } from "../../../config/apiConfig";
import {
  DELETE_MISCELLANEOUS_SETTING,
  EDIT_MISCELLANEOUS_SETTING,
  MISCELLANEOUS_SETTING_BY_ID,
} from "../../../config/BaseUrl";
import EditMiscellaneousModal from "./EditMiscellaneousModal";

function MiscellaneousSettings() {
  const dispatch = useDispatch();

  const miscellaneousData: any = useSelector(
    (state: any) => state.miscellaneousSetting
  );

  const [openModal, setOpenModal]: any = useState(false);
  const [vehicleId, setVehicleId]: any = useState("");
  const [show, setShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const ref = useRef(null);
  const [editValues, seteditValues]: any = useState({
    fee_head_name: "",
    fee_amount: "",
    remarks: "",
  });
  
  const handleChangeEdit = (e: any) => {
    const newData = { ...editValues };
    newData[e.target.name] = e.target.value;
    seteditValues(newData);
  };
  const handleModel = (row: any) => {
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(tryFetchMiscellaneousSettingList());
  }, []);

  const columns: any = [
    {
      name: "Sl NO",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Fee Head",
      selector: (row: any) => row.fee_head_name,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => row.fee_amount,
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row: any) => (row.remarks ? row.remarks : "No remarks added"),
      sortable: true,
    },

    {
      name: "Action",
      button: true,
      cell: (row: any) => (
        <>
          <div className="d-flex align-items-center gap-2">
            <div
              className="round-btn-group edit"
              onClick={() => handleEditModal(row.id)}
            >
              <FaEdit size={15} color="#fff" />
            </div>
            <div
              className="round-btn-group delete"
              onClick={(e) => handleDeleteModal(e, row.id)}
            >
              <FaTrash size={15} color="#fff" />
            </div>
          </div>
        </>
      ),
      width: "300px",
    },
  ];

  const headerComponent = useMemo(() => {
    return (
      <div className="tableTopSection">
        <h2>Miscellaneous Settings List</h2>
        <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add new</span>
        </button>
      </div>
    );
  }, []);
  const handleEditModal = (id: any) => {
    setItemId(id);
    setEditModal(true);
    getItemById(id);
  };
  const handleDeleteModal = (event: any, id: any) => {
    setShow(!show);
    setTarget(event.target);
    setItemId(id);
  };
  const getItemById = async (id: any) => {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("id", id);

      let resp: any = await apiPost(MISCELLANEOUS_SETTING_BY_ID, bodyFormData);
      console.log(" setting datas by id  is ", resp);
      if (resp.response.data.status === 200) {
        seteditValues(resp.response.data.data);
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
  };
  async function handleDelete(id: any) {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("id", id);

      let resp: any = await apiPost(DELETE_MISCELLANEOUS_SETTING, bodyFormData);
      console.log("DELETE setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        dispatch(tryFetchMiscellaneousSettingList());
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
  async function handleEdit(e: any, id: any) {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("fee_head_name", editValues.fee_head_name);
      bodyFormData.append("fee_amount", editValues.fee_amount);
      bodyFormData.append("id", id);
      bodyFormData.append("remarks", editValues.remarks);

      let resp: any = await apiPost(EDIT_MISCELLANEOUS_SETTING, bodyFormData);
      console.log("DELETE setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setEditModal(false);
        dispatch(tryFetchMiscellaneousSettingList());
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
  useEffect(() => {
    console.log("edit values", editValues);
  }, [editValues]);
  return (
    <div className="page-inner-content" ref={ref}>
      <DataTable
        columns={columns}
        data={miscellaneousData.miscellaneousSettingList}
        subHeader
        subHeaderComponent={headerComponent}
        subHeaderAlign={Alignment.LEFT}
        pagination
      />
      <AddMiscellaneousModal modalOpen={openModal} setOpen={setOpenModal} />
      <EditMiscellaneousModal
        modalOpen={editModal}
        setOpen={setEditModal}
        handle={handleChangeEdit}
        editValues={editValues}
        handleEdit={handleEdit}
        id={itemId}
      />
      <Overlay
        show={show}
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

export default MiscellaneousSettings;
