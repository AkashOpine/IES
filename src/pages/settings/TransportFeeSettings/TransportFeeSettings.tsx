import axios from "axios";
import { useEffect, useMemo, useState, useRef } from "react";
import { Overlay, Popover, Row } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_PICKUP_POINT,
  PICKUP_POINT_BY_ID,
  PICKUP_POINT_DELETE,
  TRANSPORT_DISCONTINUE,
} from "../../../config/BaseUrl";
import { tryFetchTransportSettingFeeListData } from "../../../slices/settings/transportSettingSlice";
import {
  clearPickupPoint,
  setDefaultPickupPoint,
} from "../../../slices/transport/transportSlice";
import AddTransportFeeModal from "./AddTransportFee";
import { ToastContainer, toast } from "react-toastify";

function TransportFeeSettings() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const transportSettingData: any = useSelector(
    (state: any) => state.transportsetting
  );
  console.log("transportData", transportSettingData);
  const [openModal, setOpenModal]: any = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [editValues, seteditValues]: any = useState({
    academic_year: "2022-2023",
    route_id: "",
    pick_up_point: "",
    pick_up_fee: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
    dispatch(tryFetchTransportSettingFeeListData());
  }, []);
  useEffect(() => {
    setFilteredData(transportSettingData?.transportSettingFeeListData);
  }, [transportSettingData?.transportSettingFeeListData]);

  const handleEditModal = (row: any) => {
    console.log("row", row);
    setItemId(row.id);
    setEditModal(true);
    seteditValues(row);
  };
  const getItemById = async (id: any) => {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      console.log("items", id);
      bodyFormData.append("Authorization", token);
      bodyFormData.append("maintenance_id", id);
      let resp: any = await apiPost(PICKUP_POINT_BY_ID, bodyFormData);
      console.log(" repair data by id is ", resp);
      if (resp.response.data?.status === 200) {
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
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
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
  function handleEdit(e: any) {
    e.preventDefault(e);
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      let edit_pickup = "1";
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", editValues.academic_year);
      bodyFormData.append("pick_up_point", editValues.pick_up_point);
      bodyFormData.append("pick_up_fee", editValues.pick_up_fee);
      bodyFormData.append("pick_up_time", editValues.pick_up_time);
      bodyFormData.append("drop_off_time", editValues.drop_off_time);
      bodyFormData.append("description", editValues.description);
      bodyFormData.append("route_id", editValues.route_id);
      // bodyFormData.append("edit_pickup", edit_pickup);
      console.log("editVAalues ", editValues);

      let resp: any = apiPost(ADD_PICKUP_POINT, bodyFormData);
      console.log("fuel datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
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
        // var data = {
        //   year: transportData.academicYear,
        //   route: transportData.routeId,
        // };
        // dispatch(tryFetchPickupPointListData(data));
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
      route_id: "",
      pick_up_point: "",
      pick_up_fee: "",
      description: "",
    });

    setEditModal(false);
    dispatch(clearPickupPoint());
    // var data = {
    //   year: transportData.academicYear,
    //   route: transportData.routeId,
    // };
    // dispatch(tryFetchPickupPointListData(data));
  };
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
  const columns: any = [
    //
    {
      name: "SL.No",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: "Student Name",
      selector: (row: any) => row.student_name,
      sortable: true,
    },
    {
      name: "Admission No",
      selector: (row: any) => row.old_admission_no,
      sortable: true,
    },
    {
      name: "Class Name",
      selector: (row: any) => `${row.class_name} - ${row.division_name}`,
      sortable: true,
    },
    // {
    //   name: "Division",
    //   selector: (row: any) => row.division_name
    //   sortable: true,
    // },
    // {
    //   name: "Contact",
    //   selector: (row: any) => row.fmobile,
    //   sortable: true,
    // },
    {
      name: "Route",
      selector: (row: any) => row.route,
      sortable: true,
    },
    {
      name: "Pickup Point",
      selector: (row: any) => row.pick_up_point,
      sortable: true,
    },
    {
      name: "Fee Amount",
      selector: (row: any) => row.fee_amount,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (row: any) => (
        <div className="d-flex align-items-center gap-2">
          <div
            className="button-datatable pad-2"
            onClick={(e) => handleDiscontinueModal(e, row.student_id)}
          >
            {/* <FaTrash size={12} color="#ffffff" /> */}
            <span>Discontinue</span>
          </div>
        </div>
      ),
      width: "180px",
    },
    // {
    //   name: "Action",
    //   button: true,
    //   cell: (row: any) => (
    //     <>
    //       <div className="d-flex align-items-center gap-2">
    //         <div
    //           className="round-btn-group edit"
    //           onClick={() => handleEditModal(row)}
    //         >
    //           <FaEdit size={15} color="#fff" />
    //         </div>

    //         <div
    //           className="round-btn-group delete"
    //           onClick={(e) => handleDeleteModal(e, row.id)}
    //         >
    //           <FaTrash size={15} color="#fff" />
    //         </div>
    //       </div>
    //     </>
    //   ),
    //   width: "300px",
    // },
  ];
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    console.log("search text", searchValue);
    const filteredResults =
      transportSettingData?.transportSettingFeeListData.filter(
        (row: any) =>
          row.student_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          row.old_admission_no.toLowerCase().includes(searchValue.toLowerCase())
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
        <button
          className="btn-view"
          role="button"
          onClick={handleModel}
          // disabled={!transportData?.routeId}
        >
          <span>Add Bus Fee</span>
        </button>
      </div>
    );
  }, [searchTerm]);
  return (
    <>
      <ToastContainer />
      <Row>
        {/* <Col md={12} className="report-header">
          <Header />
        </Col> */}
      </Row>
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          // data={transportSettingData?.transportSettingFeeListData}
          data={filteredData}
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
        />
        <AddTransportFeeModal modalOpen={openModal} setOpen={setOpenModal} />
        {/* <EditPickupPoint
          modalOpen={editModal}
          setOpen={setEditModal}
          handle={handleChangeEdit}
          handleChangeYear={handleChangeYear}
          handleChangeDriver={handleChangeDriver}
          editValues={editValues}
          handleEdit={handleEdit}
          // id={itemId}
          classOptions={classOptions}
        /> */}
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
