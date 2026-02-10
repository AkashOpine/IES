import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Col, Overlay, Popover, Row } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_ROUTE,
  // ROUTE_BY_ID,
  ROUTE_DELETE,
} from "../../../config/BaseUrl";
import { tryFetchRouteListData } from "../../../slices/transport/transportSlice";
import AddRouteModal from "./AddRoutes/AddRoute";
// import AddRoutesModal from "./AddRoutes/AddRoute";
import EditRouteModal from "./EditRoute";
// import Header from "./Header";

function RoutesList() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const transportData: any = useSelector((state: any) => state.transport);
  const [openModal, setOpenModal]: any = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [editValues, seteditValues]: any = useState({
    academic_year: "",
    route: "",
    description: "",
    bus_no: "",
  });
  const handleChangeEdit = (e: any) => {
    const newData = { ...editValues };
    newData[e.target.name] = e.target.value;
    seteditValues(newData);
  };

  const handleChangeEditYear = (e: any) => {
    console.log("E", e);
    const newData = { ...editValues, academic_year: e.value };
    // newData[e.name] = e.value;
    seteditValues(newData);
  };

  const handleModel = (row: any) => {
    setOpenModal(true);
    // dispatch(setDefaultDocument());
  };
  useEffect(() => {
    dispatch(tryFetchRouteListData());
  }, []);
  // edit
  const handleEditModal = (id: any) => {
    seteditValues(id);
    console.log("id", id);
    // getItemById(id);
    setItemId(id.id);
    setEditModal(true);
  };

  // async function getItemById(id: any) {
  //   try {
  //     var token = localStorage.getItem("token") as string;
  //     var bodyFormData = new FormData();
  //     bodyFormData.append("Authorization", token);
  //     bodyFormData.append("route_id", id);
  //     let resp: any = await apiPost(ROUTE_BY_ID, bodyFormData);
  //     console.log(" Route data by id is ", resp);
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
  // }
  async function handleEdit(e: any) {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", editValues.academic_year);
      bodyFormData.append("route", editValues.route);
      bodyFormData.append("description", editValues.description);
      bodyFormData.append("bus_no", editValues.bus_no);
      bodyFormData.append("edit_route", itemId);
      console.log("academic year: ", editValues.academic_year);
      let resp: any = await apiPost(ADD_ROUTE, bodyFormData);

      console.log("Route datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        toast.success("Route Updated Succefully");
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
    seteditValues({
      academic_year: "",
      route: "",
      description: "",
    });
    setEditModal(false);
    dispatch(tryFetchRouteListData());
  };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      // console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
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
  useEffect(() => {
    getAcademicYear();
    console.log("modal  editValues", editValues);
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
      bodyFormData.append("route_id", id);

      let resp: any = await apiPost(ROUTE_DELETE, bodyFormData);
      console.log("DELETE setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        var data = {
          year: transportData.academicYear,
          route: transportData.routeId,
        };
        dispatch(tryFetchRouteListData());
        toast.error("Route Deleted");
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
      name: "Academic Year",
      selector: (row: any) => row.academic_year,
      sortable: true,
    },
    {
      name: "Route",
      selector: (row: any) => row.route,
      sortable: true,
    },
    {
      name: "Bus.No",
      selector: (row: any) => row.bus_no,
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
        <h2>Route List</h2>
        <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add Route</span>
        </button>
      </div>
    );
  }, []);

  return (
    <>
      {" "}
      <ToastContainer />
      <Row>
        <Col md={12} className="report-header">
          {/* <Header /> */}
        </Col>
      </Row>
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          data={transportData.routeListData}
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
        />
        <AddRouteModal modalOpen={openModal} setOpen={setOpenModal} />
        <EditRouteModal
          modalOpen={editModal}
          setOpen={setEditModal}
          handle={handleChangeEdit}
          handleYear={handleChangeEditYear}
          editValues={editValues}
          handleEdit={handleEdit}
          id={itemId}
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

export default RoutesList;
