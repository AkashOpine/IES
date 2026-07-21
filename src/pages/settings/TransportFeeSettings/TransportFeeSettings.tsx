import axios from "axios";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "../../../config/apiConfig";
import {
  PICKUP_POINT_DELETE,
  TRANSPORT_DISCONTINUE,
} from "../../../config/BaseUrl";
import { tryFetchTransportSettingFeeListData } from "../../../slices/settings/transportSettingSlice";
import { setDefaultPickupPoint } from "../../../slices/transport/transportSlice";
import AddTransportFeeModal from "./AddTransportFee";
import { ToastContainer, toast } from "react-toastify";

function TransportFeeSettings() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const gridRef: any = useRef();
  const transportSettingData: any = useSelector(
    (state: any) => state.transportsetting,
  );
  const [openModal, setOpenModal]: any = useState(false);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleModel = () => {
    setOpenModal(true);
    dispatch(setDefaultPickupPoint());
  };

  useEffect(() => {
    dispatch(tryFetchTransportSettingFeeListData());
  }, []);
  useEffect(() => {
    setFilteredData(transportSettingData?.transportSettingFeeListData);
  }, [transportSettingData?.transportSettingFeeListData]);

  async function handleDelete(id: any) {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("pickup_point_id", id);

      let resp: any = await apiPost(PICKUP_POINT_DELETE, bodyFormData);
      console.log("DELETE setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
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

  const handleDiscontinueModal = (event: any, id: any) => {
    console.log("discontinue std id is", id);
    setShow(true);
    setTarget(event.target);
    setItemId(id);
  };
  async function handleDiscontinue(id: any) {
    console.log("Discontinue initiated");
    console.log("student_id", itemId);

    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("student_id", itemId);

      let resp: any = await apiPost(TRANSPORT_DISCONTINUE, bodyFormData);
      console.log("discontinued transportation data is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        dispatch(tryFetchTransportSettingFeeListData());
        toast.success("Transportation Discontinued Successfully");
      } else {
        // alert("Something happened please try again");
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
      <div className="d-flex align-items-center gap-2">
        <div
          className="button-datatable pad-2"
          onClick={(e) => handleDiscontinueModal(e, row.student_id)}
        >
          <span>Discontinue</span>
        </div>
      </div>
    );
  };

  const columnDefs: any = [
    {
      headerName: "SL.No",
      valueGetter: (params: any) =>
        params.node ? params.node.rowIndex + 1 : null,
      width: 100,
      sortable: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      sortable: true,
    },
    {
      field: "old_admission_no",
      headerName: "Admission No",
      sortable: true,
    },
    {
      headerName: "Class Name",
      valueGetter: (params: any) =>
        `${params.data.class_name} - ${params.data.division_name}`,
      sortable: true,
    },
    {
      field: "remark",
      headerName: "Remark",
      sortable: true,
    },
    {
      field: "route",
      headerName: "Route",
      sortable: true,
    },
    {
      field: "pick_up_point",
      headerName: "Pickup Point",
      sortable: true,
    },
    {
      field: "fee_amount",
      headerName: "Fee Amount",
      sortable: true,
    },
    
    {
      headerName: "Action",
      field: "action",
      pinned: "right" as const,
      lockPinned: true,
      width: 180,
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

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    console.log("search text", searchValue);
    const filteredResults =
      transportSettingData?.transportSettingFeeListData.filter(
        (row: any) =>
          row.student_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          row.old_admission_no
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
      );

    setFilteredData(filteredResults);
  };

  const headerComponent = useMemo(() => {
    return (
      <div className="tableTopSection">
        <h2>Students List</h2>
        <div className="main-search">
          <input
            type="text"
            placeholder="Search by Name or admission number"
            value={searchTerm}
            className="search-input"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add Bus Fee</span>
        </button>
      </div>
    );
  }, [searchTerm]);

  const onGridReady = useCallback(
    (params: any) => {
      return filteredData;
    },
    [filteredData],
  );

  return (
    <>
      <ToastContainer />
      <div className="page-inner-content" ref={ref}>
        {headerComponent}
        <div className="ag-theme-alpine grid-table mt-2">
          <AgGridReact
            ref={gridRef}
            rowData={filteredData}
            columnDefs={columnDefs}
            animateRows={true}
            defaultColDef={defaultColDef}
            pagination
            onGridReady={onGridReady}
          />
        </div>
        <AddTransportFeeModal modalOpen={openModal} setOpen={setOpenModal} />
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
              Are you sure you want to discontinue Transportation for this
              student ?
              <div className="d-flex gap-3 mt-3">
                <button className="btn-view" onClick={() => setShow(false)}>
                  No
                </button>
                <button
                  className="btn-view"
                  onClick={() => handleDiscontinue(itemId)}
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

export default TransportFeeSettings;