import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  ADD_TRANSPORT_FUEL,
  FUEL_DELETE,
} from "../../../config/BaseUrl";
import { tryFetchFuelListData } from "../../../slices/transport/transportSlice";
import EditFuel from "../AddFuel/EditFuel";

function FuelList() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const fuelListData: any = useSelector((state: any) => state.transport);
  useEffect(() => {
    dispatch(tryFetchFuelListData());
  }, []);
  const [editModal, setEditModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [editValues, seteditValues]: any = useState({
    academic_year: "",
    date: "",
    vehicle_id: "",
    driver_id: "",
    driver_name: "",
    agency_name: "",
    fuel_qty: "",
    amount: "",
    meter_reading: "",
  });

  const handleChangeEdit = (e: any) => {
    const newData = { ...editValues };
    newData[e.target.name] = e.target.value;
    seteditValues(newData);
  };

  const handleChangeYear = (e: any) => {
    const newData = { ...editValues, academic_year: e.value };
    seteditValues(newData);
  };
  const handleChangeDriver = (e: any) => {
    const newData = { ...editValues, driver_name: e.label, driver_id: e.value };
    seteditValues(newData);
  };
  useEffect(() => {
    getAcademicYear();
  }, [editValues]);

  const handleEditModal = (row: any) => {
    console.log("row fuel fata", row);
    setItemId(row.id);
    setEditModal(true);
    seteditValues(row);
  };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
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
      bodyFormData.append("fuel_qty", editValues.fuel_qty);
      bodyFormData.append("amount", editValues.amount);
      bodyFormData.append("meter_reading", editValues.meter_reading);
      bodyFormData.append("edit_maintenance_fuel", itemId);

      let resp: any = await apiPost(ADD_TRANSPORT_FUEL, bodyFormData);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        clearDatas();
        toast.success("Fuel Details Updated Succefully");
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
    setShow(!show);
    setTarget(event.target);
    setItemId(id);
  };
  async function handleDelete(id: any) {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("maintenance_fuel_id", id);

      let resp: any = await apiPost(FUEL_DELETE, bodyFormData);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        dispatch(tryFetchFuelListData());
        toast.error("Fuel Details Deleted");
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
      date: "",
      vehicle_id: "",
      driver_id: "",
      driver_name: "",
      agency_name: "",
      fuel_qty: "",
      amount: "",
      meter_reading: "",
    });
    setEditModal(false);
    dispatch(tryFetchFuelListData());
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
      name: "Meter Reading",
      selector: (row: any) => row.meter_reading,
      sortable: true,
    },
    {
      name: "Fuel Quantity (Litres)",
      selector: (row: any) => row.fuel_qty,
      sortable: true,
    },
    // {
    //   name: "Usage",
    //   selector: (row: any) => row.type_of_use,
    //   sortable: true,
    // },
    {
      name: "Amount",
      button: true,
      cell: (row: any) => row.amount,
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
        <h2>Fuel List</h2>
        {/* <button className="btn-view" role="button" onClick={handleModel}>
          <span>Add new vehicle</span>
        </button> */}
      </div>
    );
  }, []);
  return (
    <div className="page-inner-content" ref={ref}>
      <ToastContainer />

      <DataTable
        columns={columns}
        data={fuelListData.fuelListData}
        subHeader
        subHeaderComponent={headerComponent}
        subHeaderAlign={Alignment.LEFT}
        pagination
      />
      <EditFuel
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

export default FuelList;
