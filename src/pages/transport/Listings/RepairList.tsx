import axios from "axios";
import { useEffect, useMemo, useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_TRANSPORT_REPAIR,
  REPAIR_BY_ID,
  REPAIR_DELETE,
} from "../../../config/BaseUrl";
import { tryFetchRepairListData } from "../../../slices/transport/transportSlice";
import EditRepairModal from "../AddRepair/EditRepair";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RepairList() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const RepairListData: any = useSelector((state: any) => state.transport);
  console.log("RepairListData", RepairListData.repairListData);
  const [openModal, setOpenModal]: any = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [editValues, seteditValues]: any = useState({
    academic_year: "",
    date: "",
    vehicle_id: "",
    driver_id: "",
    driver_name: "",
    agency_name: "",
    service_type: "",
    amount: 0,
    tax: 0,
    total_amount: 0,
    description: "",
  });

  const handleChangeEdit = (e: any) => {
    const newData = { ...editValues };
    newData[e.target.name] = e.target.value;
    seteditValues(newData);
  };

  const handleChangeYear = (e: any) => {
    console.log("E", e);
    const newData = { ...editValues, academic_year: e.value };
    // newData[e.name] = e.value;
    seteditValues(newData);
  };
  const handleChangeDriver = (e: any) => {
    console.log("E", e);
    const newData = { ...editValues, driver_name: e.label, driver_id: e.value };
    // newData[e.name] = e.value;
    seteditValues(newData);
  };
  useEffect(() => {
    console.log("editValues", editValues.academic_year);
  }, [editValues]);

  const handleEditModal = (row: any) => {
    seteditValues(row);
    setItemId(row.id);
    setEditModal(true);
  };
  useEffect(() => {
    dispatch(tryFetchRepairListData());
    getAcademicYear();
    console.log("id", itemId);
    seteditValues({ ...editValues, academic_year: "2022-2023" });
  }, [itemId]);

  const getItemById = async (id: any) => {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      console.log("items", id);
      bodyFormData.append("Authorization", token);
      bodyFormData.append("maintenance_id", id);
      let resp: any = await apiPost(REPAIR_BY_ID, bodyFormData);
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
  const customStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: "16px",
        fontWeight: "400",
      };
    },
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      fontSize: "14px",
      background: "white",
      borderRadius: "6px",
      //   minHeight: 0,
      //   height: "2em",
      borderColor: "#f3f6f9",

      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#" : "#",
      },
    }),
    menu: (base: any) => ({
      ...base,

      borderRadius: 0,

      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      fontSize: "13px",
      padding: 0,
    }),
    option: (base: any) => ({
      ...base,
      width: "100%",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#3699FF",
      "&:hover": {
        color: "#3699FF",
      },
    }),
  };
  async function handleEdit(e: any) {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", editValues.academic_year);
      bodyFormData.append("date", editValues.date);
      bodyFormData.append("vehicle_id", editValues.vehicle_id);
      bodyFormData.append("driver_id", editValues.driver_id);
      bodyFormData.append("driver_name", editValues.driver_name);
      bodyFormData.append("agency_name", editValues.agency_name);
      bodyFormData.append("service_type", editValues.service_type);
      bodyFormData.append("amount", editValues.amount);
      bodyFormData.append("tax", editValues.tax);
      bodyFormData.append("total_amount", editValues.total_amount);
      bodyFormData.append("description", editValues.description);
      bodyFormData.append("edit_maintenance", itemId);

      let resp: any = await apiPost(ADD_TRANSPORT_REPAIR, bodyFormData);
      console.log("repair datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        toast.success("Maintanence Updated Succefully");
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
  function clearDatas() {
    seteditValues({
      academic_year: "",
      date: "",
      vehicle_id: "",
      driver_id: "",
      driver_name: "",
      agency_name: "",
      service_type: "",
      amount: "",
      tax: "",
      total_amount: "",
      description: "",
    });
    setEditModal(false);
    dispatch(tryFetchRepairListData());
  }
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
      bodyFormData.append("maintenance_id", id);

      let resp: any = await apiPost(REPAIR_DELETE, bodyFormData);
      console.log("DELETE setting datas  is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        dispatch(tryFetchRepairListData());
        toast.error("Repair Details Deleted");
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
      name: "Agency Name",
      selector: (row: any) => row.agency_name,
      sortable: true,
    },
    {
      name: "Driver Name",
      selector: (row: any) => row.driver_name,
      sortable: true,
    },
    {
      name: "Vehicle Id",
      selector: (row: any) => row.vehicle_id,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: "Service Type",
      selector: (row: any) => row.service_type,
      sortable: true,
    },
    {
      name: "Tax",
      selector: (row: any) => row.tax,
      sortable: true,
    },
    {
      name: "Amount",
      button: true,
      cell: (row: any) => row.total_amount,
      // width: "300px",
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
        <h2>Repair List</h2>
        {/* <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add new vehicle</span>
        </button> */}
      </div>
    );
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          data={RepairListData.repairListData}
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
        />
        {/* <AddVehicleModal modalOpen={openModal} setOpen={setOpenModal} /> */}

        <EditRepairModal
          modalOpen={editModal}
          setOpen={setEditModal}
          handle={handleChangeEdit}
          handleChangeYear={handleChangeYear}
          handleChangeDriver={handleChangeDriver}
          editValues={editValues}
          seteditValues={seteditValues}
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

export default RepairList;
