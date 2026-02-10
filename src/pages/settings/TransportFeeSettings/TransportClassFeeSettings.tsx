import axios from "axios";
import { useEffect, useMemo, useState, useRef } from "react";
import { Col, Overlay, Popover, Row } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_PICKUP_POINT,
  PICKUP_POINT_BY_ID,
  PICKUP_POINT_DELETE,
} from "../../../config/BaseUrl";
import { tryFetchTransportSettingFeeListData } from "../../../slices/settings/transportSettingSlice";
import {
  clearPickupPoint,
  setDefaultPickupPoint,
} from "../../../slices/transport/transportSlice";
import AddTransportClassFeeModal from "./AddTransportClasssFeeModal";
import AddTransportFeeModal from "./AddTransportFee";
import ClassHeader from "./ClassHeader";
import Header from "./Header";

function TransportClassFeeSettings() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const classList: any = useSelector((state: any) => state.classWiseList);

  console.log("transportData", classList);
  const [openModal, setOpenModal]: any = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [editValues, seteditValues]: any = useState({
    class_id: "",
    division_id: "",
    first_name: "",
    id: "",
    last_name: "",
    middle_name: "",
    old_admission_no: "",
    pickup: "",
    route_name: "",
    fee_amount: "",
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
    // dispatch(setDefaultPickupPoint());
  };

  useEffect(() => {
    // dispatch(tryFetchTransportSettingFeeListData());
    // getAcademicYear();
  }, []);

  const handleEditModal = (row: any) => {
    console.log("row", row);
    setItemId(row.id);
    setOpenModal(true);
    seteditValues(row);
  };
  const handleDeleteModal = (event: any, id: any) => {
    console.log("row month", id);
    setShow(true);
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

  const columns: any = [
    //
    {
      name: "SL.No",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: "Student Name",
      selector: (row: any) => row.first_name + " " + row.last_name,
      sortable: true,
    },
    {
      name: "Admission No",
      selector: (row: any) => row.old_admission_no,
      sortable: true,
    },
    {
      name: "Class Name",
      selector: (row: any) => row.class_div,
      sortable: true,
    },
    // {
    //   name: "Division",
    //   selector: (row: any) => row.division_id,
    //   sortable: true,
    // },
    {
      name: "Route",
      selector: (row: any) => row.route_name,
      sortable: true,
    },
    {
      name: "Pickup Point ",
      selector: (row: any) => row.pickup,
      sortable: true,
    },
    {
      name: "Fee Amount ",
      selector: (row: any) => row.fee_amount,
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
            {/* <div
            className="settings-btn deleteBtn"
            onClick={(e) => handleDeleteModal(e, row.month_id)}
          >
            <FaTrash size={12} />
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
        <h2>Classwise Students List</h2>
        {/* <button
          className="btn-view"
          role="button"
          onClick={handleModel}
          // disabled={!transportData?.routeId}
        >
          <span>Add Bus Fee</span>
        </button> */}
      </div>
    );
  }, []);
  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <ClassHeader />
        </Col>
      </Row>
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          data={classList.classList}
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
        />
        <AddTransportClassFeeModal
          handle={handleChangeEdit}
          handleChangeYear={handleChangeYear}
          handleChangeDriver={handleChangeDriver}
          editValues={editValues}
          // id={itemId}
          classOptions={classOptions}
          modalOpen={openModal}
          setOpen={setOpenModal}
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

export default TransportClassFeeSettings;
