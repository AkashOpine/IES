import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../config/apiConfig";
import { HOSTEL_ID_DEACTIVATE } from "../../../config/BaseUrl";
import { useParams } from "react-router-dom";
import { tryFetchSingleHostelerDetails } from "../../../slices/hostel/hostelSlice";

function HostelSettingTable() {
  const HostelSettingData: any = useSelector((state: any) => state.hostel);
  const TransportLists: any = useSelector((state: any) => state.transport);
  const dispatch = useDispatch();
  const params = useParams();
  const ref = useRef(null);
  const [editModal, setEditModal]: any = useState(false);
  const [editRowData, setEditRowData]: any = useState(null);
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleModel = async (row: any) => {
    console.log("monthid", row);
    console.log("studentid", params.id);
    var studentId: any = params.id;
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("student_id", studentId);
      bodyFormData.append("month", row.month_id);
      bodyFormData.append("status", row.status);
      let resp: any = await apiPost(HOSTEL_ID_DEACTIVATE, bodyFormData);
      console.log("SingleHostelerDetails", resp);
      if (resp.response.data.status === 200) {
        dispatch(tryFetchSingleHostelerDetails(studentId));
        toast.success(resp.response.data.status_message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
    // setEditRowData(row);
    // setEditModal(true);
  };
  const handleDeleteModal = (event: any, id: any) => {
    console.log("row month", id);
    setShow(true);
    setTarget(event.target);
    setItemId(id);
  };
  //   async function handleDelete(id: any) {
  //     console.log("delete initiated");
  //     try {
  //       var token = localStorage.getItem("token") as string;
  //       var bodyFormData = new FormData();
  //       bodyFormData.append("Authorization", token);
  //       bodyFormData.append(
  //         "id",
  //         transportSettingData.transportSettingTableData?.id
  //       );
  //       bodyFormData.append("month", id);

  //       let resp: any = await apiPost(TRANSPORT_MONTH_DELETE, bodyFormData);
  //       console.log("DELETE transport setting datas  is ", resp);
  //       if (resp.response.data.status === 200 && resp.response.data.data) {
  //         setShow(false);
  //         dispatch(
  //           tryFetchTransportSettingTableData(
  //             transportSettingData.transportSettingTableData?.student_id
  //           )
  //         );
  //         toast.error("Transport Details Deleted");
  //       } else {
  //         alert("Something happened please try again");
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.log("error message: ", error.message);
  //         return error.message;
  //       } else {
  //         console.log("unexpected error: ", error);
  //         return "An unexpected error occurred";
  //       }
  //     }
  //   }
  const columns = [
    {
      name: "Month",
      selector: (row: any) => row.month,
      sortable: true,
    },
    // {
    //   name: "Ways",
    //   selector: (row: any) =>
    //     row.transport_type === "1" ? "One-Way" : "Two-way",
    //   sortable: true,
    // },
    {
      name: "Admission Fee",
      selector: (row: any) => row.admission_fee,
      sortable: true,
    },
    {
      name: "Caution Deposit",
      selector: (row: any) => row.caution_deposit,
      sortable: true,
    },
    {
      name: "Establishment Fee",
      selector: (row: any) => row.establishment_fee,
      sortable: true,
    },
    {
      name: "Hostel Fee",
      selector: (row: any) => row.hostel_fee,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => (row.status === 1 ? "Active" : "Inactive"),
      sortable: true,
    },

    {
      name: "Action",
      cell: (row: any) => (
        <div className="settingsButtonsContainer">
          <div
            className="tbl-btn"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => handleModel(row)}
          >
            {row.status === 1 ? "Deactivate" : "Activate"}
            {/* <FaPencilAlt size={12} /> */}
          </div>
          {/* <div
            className="settings-btn deleteBtn"
            onClick={(e) => handleDeleteModal(e, row.month_id)}
          >
            <FaTrash size={12} />
          </div> */}
          {/* <div className="settings-btn viewBtn">
            <FaEye size={12} />
          </div> */}
        </div>
      ),
    },
  ];
  useEffect(() => {
    // dispatch(tryFetchRouteListData());
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          data={HostelSettingData.singleHostelerDetails?.settings}
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
              Are you sure you want to delete fee for this month?
              <div className="d-flex gap-3 mt-3">
                <button className="btn-view" onClick={() => setShow(false)}>
                  No
                </button>
                <button
                  className="btn-view"
                  //   onClick={() => handleDelete(itemId)}
                >
                  Yes
                </button>
              </div>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  );
}

export default HostelSettingTable;
