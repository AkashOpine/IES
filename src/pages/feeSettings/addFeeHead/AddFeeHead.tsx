import React, { useEffect, useMemo, useRef, useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import EditMiscellaneousModal from "../../settings/miscellaneousfee/EditMiscellaneousModal";
import AddMiscellaneousModal from "../../settings/miscellaneousfee/AddMiscellaneousModal";
import DataTable, { Alignment } from "react-data-table-component";
import axios from "axios";
import { tryFetchMiscellaneousSettingList } from "../../../slices/settings/miscellaneousSettingSlice";
import {
  DELETE_FEE_HEAD,
  DELETE_MISCELLANEOUS_SETTING,
  EDIT_FEE_HEAD,
  EDIT_MISCELLANEOUS_SETTING,
  MISCELLANEOUS_SETTING_BY_ID,
} from "../../../config/BaseUrl";
import { apiPost } from "../../../config/apiConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AddFeeHeadModal from "./AddFeeHeadModal";
import { getFeeHeadListApi } from "../addFeeSettings/services";

function AddFeeHead() {
  const dispatch = useDispatch();

  const miscellaneousData: any = useSelector(
    (state: any) => state.miscellaneousSetting,
  );

  const [openModal, setOpenModal]: any = useState(false);
  const [show, setShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const [feeHeadList, setFeeHeadList] = useState([]);

  const ref = useRef(null);
  const [editValues, seteditValues]: any = useState([]);

  const handleModel = (row: any) => {
    setOpenModal(true);
    seteditValues([])
  };
  const loadFeeHeadList = () => {
    getFeeHeadListApi().then(setFeeHeadList).catch(console.error);
  };

  useEffect(() => {
    loadFeeHeadList();
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
      selector: (row: any) => row.feehead_name,
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
              onClick={() => handleEditModal(row)}
            >
              <FaEdit size={15} color="#fff" />
            </div>
            <div
              className="round-btn-group delete"
              onClick={(e) => handleDeleteModal(e, row.feehead_id)}
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
        <h2>Fee Head List</h2>
        <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add new</span>
        </button>
      </div>
    );
  }, []);
  const handleEditModal = (row: any) => {
    setItemId(row.feehead_id);
    setOpenModal(true);
    seteditValues(row);
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
      bodyFormData.append("feehead_id", id);

      let resp: any = await apiPost(DELETE_FEE_HEAD, bodyFormData);
      console.log("DELETE setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        loadFeeHeadList();
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

  return (
    <div className="page-inner-content" ref={ref}>
      <DataTable
        columns={columns}
        data={feeHeadList}
        subHeader
        subHeaderComponent={headerComponent}
        subHeaderAlign={Alignment.LEFT}
        pagination
      />
      <AddFeeHeadModal
        modalOpen={openModal}
        setOpen={setOpenModal}
        refreshList={loadFeeHeadList}
        editValues={editValues}
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

export default AddFeeHead;
