import axios from "axios";
import { indexOf } from "lodash";
import { useEffect, useMemo, useState, useRef } from "react";
import { Col, Overlay, Popover, Row } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  EDIT_PICKUP_POINT,
  PICKUP_POINT_DELETE,
} from "../../../config/BaseUrl";
import {
  clearPickupPoint,
  setDefaultPickupPoint,
  tryFetchPickupPointListData,
} from "../../../slices/transport/transportSlice";
import AddPickupPointModal from "./AddPickupPoint/AddPickupPoint";
import EditPickupPoint from "./AddPickupPoint/EditPickupPoint";
import Header from "./Header";
import { onBtExport } from "../../Reports/headerComponents/ExportExcel";

function PickUpPointList() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const transportData: any = useSelector((state: any) => state.transport);
  console.log("transportData", transportData);
  const [openModal, setOpenModal]: any = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [editValues, seteditValues]: any = useState({
    id: "",
    academic_year: "2022-2023",
    route_id: "",
    pick_up_point: "",
    pick_up_fee: "",
    pick_up_time: "",
    drop_time: "",
    description: "",
  });
  const handleChangeEdit = (e: any) => {
    const newData = { ...editValues };
    newData[e.target.name] = e.target.value;
    seteditValues(newData);
    console.log("values", editValues);
  };

  const handleChangeYear = (e: any) => {
    console.log("E", e);
    const newData = { ...editValues, academic_year: e.value };
    seteditValues(newData);
  };
  const handleChangeDriver = (e: any) => {
    console.log("E", e);
    const newData = { ...editValues, driver_name: e.label, driver_id: e.value };
    seteditValues(newData);
  };
  const handleModel = () => {
    setOpenModal(true);
    dispatch(setDefaultPickupPoint());
  };

  useEffect(() => {
    var data = {
      year: transportData?.academicYear,
      route: transportData?.routeId,
    };
    dispatch(tryFetchPickupPointListData(data));
    getAcademicYear();
  }, []);
  useEffect(() => {
    console.log("editValues", editValues);
  }, [editValues]);

  const handleEditModal = (row: any) => {
    console.log("row", row);
    setItemId(row.id);
    setEditModal(true);
    seteditValues(row);
  };
  // const getItemById = async (id: any) => {
  //   try {
  //     var token = localStorage.getItem("token") as string;
  //     var bodyFormData = new FormData();
  //     console.log("items", id);
  //     bodyFormData.append("Authorization", token);
  //     bodyFormData.append("maintenance_id", id);
  //     let resp: any = await apiPost(PICKUP_POINT_BY_ID, bodyFormData);
  //     console.log(" repair data by id is ", resp);
  //     if (resp.response.data?.status === 200) {
  //       seteditValues(resp.response.data.data);
  //     } else {
  //       alert("Something happened please try again");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log("error message: ", error.message);
  //       return error.message;
  //     } else {
  //       console.log("unexpected error: ", error);
  //       return "An unexpected error occurred";
  //     }
  //   }
  // };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status === 200) {
        setClassOptions(resp.response.data.data);
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
  async function handleEdit(e: any) {
    e.preventDefault(e);
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      let edit_pickup = "1";
      bodyFormData.append("Authorization", token);
      bodyFormData.append("id", editValues.id);
      bodyFormData.append("academic_year", editValues.academic_year);
      bodyFormData.append("pick_up_point", editValues.pick_up_point);
      bodyFormData.append("pick_up_fee", editValues.pick_up_fee);
      bodyFormData.append("pick_up_time", editValues.pick_up_time);
      bodyFormData.append("drop_time", editValues.drop_time);
      bodyFormData.append("description", editValues.description);
      bodyFormData.append("route_id", editValues.route_id);
      bodyFormData.append("edit_pickup", edit_pickup);
      console.log("editVAalues ", editValues);

      let resp: any = await apiPost(EDIT_PICKUP_POINT, bodyFormData);
      console.log("fuel datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setEditModal(false);
        toast.success("Pickup Point Details Updated Succefully");

        clearDatas();
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
  const handleDeleteModal = (event: any, id: any) => {
    console.log("event", event);
    setShow(!show);
    setTarget(event.target);
    setItemId(id);
  };
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
        var data = {
          year: transportData?.academicYear,
          route: transportData?.routeId,
        };
        dispatch(tryFetchPickupPointListData(data));
        toast.error("Pickup Point Details Deleted");
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
  const clearDatas = () => {
    setEditModal(false);

    seteditValues({
      id: "",
      academic_year: "2022-2023",
      route_id: "",
      pick_up_point: "",
      pick_up_fee: "",
      pick_up_time: "",
      drop_time: "",
      description: "",
    });
    var data = {
      year: transportData?.academicYear,
      route: transportData?.routeId,
    };
    dispatch(tryFetchPickupPointListData(data));
    // dispatch(clearPickupPoint());
  };
  function convertTime(time24: any) {
    const [hours, minutes, seconds] = time24.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    const time12 = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date);
    return time12;
  }
  const columns: any = [
    //
    {
      name: "Sl NO",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Academic Year",
      selector: (row: any) => row.academic_year,
      sortable: true,
    },
    {
      name: "Pick Up",
      selector: (row: any) => row.pick_up_point,
      sortable: true,
    },
    {
      name: "Fee",
      selector: (row: any) => row.pick_up_fee,
      sortable: true,
    },
    {
      name: "Pick Up Time",
      selector: (row: any) =>
        row.pick_up_time !== null
          ? convertTime(row.pick_up_time)
          : row.pick_up_time,
      sortable: true,
    },
    {
      name: "Drop Time",
      selector: (row: any) =>
        row.drop_time !== null ? convertTime(row.drop_time) : row.drop_time,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
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
        <h2>Pickup Point List</h2>
        <button
          className="btn-view"
          type="button"
          onClick={handleModel}
          disabled={!transportData?.routeId}
        >
          <span>Add Pickup Point</span>
        </button>
      </div>
    );
  }, [transportData?.routeId]);
  return (
    <>
      <ToastContainer />

      <Row>
        <Col md={12} className="report-header">
          <Header />
        </Col>
      </Row>
      <div className="page-inner-content" ref={ref}>
        <div className="btn-export">
          <button
            onClick={() =>
              onBtExport(transportData?.pickupPointListData?.excel)
            }
            disabled={transportData?.pickupPointListData?.excel === ""}
          >
            <FaDownload /> <span>Export to excel</span>
          </button>
        </div>
        <DataTable
          columns={columns}
          data={transportData?.pickupPointListData?.data || []}
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
        />
        <AddPickupPointModal modalOpen={openModal} setOpen={setOpenModal} />
        <EditPickupPoint
          modalOpen={editModal}
          setOpen={setEditModal}
          handle={handleChangeEdit}
          handleChangeYear={handleChangeYear}
          handleChangeDriver={handleChangeDriver}
          editValues={editValues}
          handleEdit={handleEdit}
          // id={itemId}
          classOptions={classOptions}
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

export default PickUpPointList;
