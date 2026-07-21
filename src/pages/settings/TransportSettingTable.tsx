import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../config/apiConfig";
import { TRANSPORT_MONTH_DELETE } from "../../config/BaseUrl";
import { tryFetchTransportSettingTableData } from "../../slices/settings/transportSettingSlice";
import TransportEditModal from "./TransportEditModal";
import {
  tryFetchPickupPointListData,
  tryFetchRouteListData,
} from "../../slices/transport/transportSlice";
function TransportSettingTable() {
  const transportSettingData: any = useSelector(
    (state: any) => state.transportsetting,
  );
  const TransportLists: any = useSelector((state: any) => state.transport);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const gridRef: any = useRef();
  const [editModal, setEditModal]: any = useState(false);
  const [editRowData, setEditRowData]: any = useState(null);
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleModel = (row: any) => {
    // var data = {
    //   year: transportSettingData.transportSettingTableData?.academic_year,
    //   route: row?.route_id,
    // };
    // dispatch(tryFetchPickupPointListData(data));
    setEditRowData(transportSettingData?.transportSettingTableData);
    setEditModal(true);
  };
  const handleDeleteModal = (event: any, id: any) => {
    console.log("row month", id);
    setShow(true);
    setTarget(event.target);
    setItemId(id);
  };
  async function handleDelete(id: any) {
    console.log("delete initiated");
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append(
        "id",
        transportSettingData?.transportSettingTableData?.id,
      );
      bodyFormData.append("month", id);

      let resp: any = await apiPost(TRANSPORT_MONTH_DELETE, bodyFormData);
      console.log("DELETE transport setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        dispatch(
          tryFetchTransportSettingTableData(
            transportSettingData?.transportSettingTableData?.student_id,
          ),
        );
        console.log("resp.response.data", resp.response.data);

        toast.error(resp.response.data.status_message);
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

  // Cell renderer for the sticky Action column
  const ActionCellRenderer = (params: any) => {
    const row = params.data;
    return (
      <div className="settingsButtonsContainer">
        <div className="settings-btn editBtn" onClick={() => handleModel(row)}>
          <FaPencilAlt size={12} />
        </div>
        <div
          className="settings-btn deleteBtn"
          onClick={(e) => handleDeleteModal(e, row.month_id)}
        >
          <FaTrash size={12} />
        </div>
        {/* <div className="settings-btn viewBtn">
          <FaEye size={12} />
        </div> */}
      </div>
    );
  };

  const columnDefs: any = [
    {
      field: "month",
      headerName: "Month",
      sortable: true,
    },
    {
      headerName: "Ways",
      valueGetter: (params: any) =>
        params.data.transport_type === "1" ? "One-Way" : "Two-way",
      sortable: true,
    },
    {
      field: "remark",
      headerName: "Remarks",
      sortable: true,
    },
    {
      field: "route_name",
      headerName: "Route",
      sortable: true,
    },

    {
      field: "pick_up_name",
      headerName: "Pickup Point",
      sortable: true,
    },
    {
      field: "fee",
      headerName: "Fee",
      sortable: true,
    },
    {
      field: "akash",
      headerName: "Tuition Fee",
      sortable: true,
    },

    {
      headerName: "Action",
      field: "action",
      pinned: "right" as const,
      lockPinned: true,
      width: 120,
      sortable: false,
      filter: false,
      resizable: false,
      suppressMenu: true,
      cellRenderer: ActionCellRenderer,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      resizable: true,
      sortable: true,
    }),
    [],
  );

  useEffect(() => {
    dispatch(tryFetchRouteListData());
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="page-inner-content" ref={ref}>
        <div className="ag-theme-alpine grid-table">
          <AgGridReact
            ref={gridRef}
            rowData={transportSettingData?.transportSettingTableData?.settings}
            columnDefs={columnDefs}
            animateRows={true}
            defaultColDef={defaultColDef}
          />
        </div>

        <TransportEditModal
          modalOpen={editModal}
          setOpen={setEditModal}
          datas={editRowData}
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
                  onClick={() => handleDelete(itemId)}
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

export default TransportSettingTable;
