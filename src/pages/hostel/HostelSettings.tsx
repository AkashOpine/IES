import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Overlay, Popover } from "react-bootstrap";
import { FaDownload, FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { tryFetchReceiptData } from "../../slices/receipt/receiptSlice";
import {
  tryFetchHostelStudentData,
  tryFetchSingleHostelerDetails,
} from "../../slices/hostel/hostelSlice";
import AddHostelSettingModal from "./AddHostelSettingModal";
import { HOSTEL_ID_DISCONTINUE } from "../../config/BaseUrl";
import { apiPost } from "../../config/apiConfig";
import EditHostelSettingModal from "./EditHostelSettingModal";

function HostelSettings() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const hostelData: any = useSelector((state: any) => state.hostel);
  const [openModal, setOpenModal]: any = useState(false);
  const [openEditModal, setOpenEditModal]: any = useState(false);
  const [concessionId, setConcessionId]: any = useState("");
  // delete overlay
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(
    hostelData.hostelStudentData
  );

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

      let resp: any = await apiPost(HOSTEL_ID_DISCONTINUE, bodyFormData);
      console.log("discontinued hostel data is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        dispatch(tryFetchHostelStudentData());
        toast.error("Hostel Discontinued Successfully");
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
  const handleModel = (row: any) => {
    setOpenModal(true);
  };
  const handleEditModel = (row: any) => {
    console.log(" student_id std id", row.student_id);

    setOpenEditModal(true);
    dispatch(tryFetchSingleHostelerDetails(row.student_id));
  };
  const handleConcession = (row: any) => {
    console.log("row id", row);
    setConcessionId(row);
    // dispatch(tryFetchSingleHostelerDetails(row));
  };
  const columns: any = [
    {
      name: "Sl.no",
      selector: (row: any, rowIndex: number) => rowIndex + 1,
      width: "100px",
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
      name: "Class",
      selector: (row: any) => row.class_id + " " + row.division_id,
      sortable: true,
    },
    {
      name: "Hostel Type",
      selector: (row: any) => row.hostel_type,
      sortable: true,
    },
    {
      name: "Room Type",
      selector: (row: any) => row.room_type,
      sortable: true,
    },
    {
      name: "Room Number",
      selector: (row: any) => row.room_no,
      sortable: true,
    },
    {
      name: "Hostel Fee",
      selector: (row: any) => row.hostel_fee,
      sortable: true,
    },
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
      name: "Store Deposit",
      selector: (row: any) => row.store_deposit,
      sortable: true,
    },
    {
      name: "Establishment Fee",
      selector: (row: any) => row.establishment_fee,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (row: any) => (
        <div className="d-flex align-items-center gap-2">
          <Link
            to={`/individual-hostel-setting/${row.student_id}`}
            role="button"
            className="round-btn-group balance"
            onClick={(e) => handleConcession(row.student_id)}
            // disabled={row.id === concessionId}
          >
            <FaEye color="#556EE6" size={15} />
          </Link>
          <div
            className="settings-btn editBtn round-btn-group balance "
            onClick={() => handleEditModel(row)}
          >
            <FaPencilAlt size={15} />
          </div>
          <div
            className="button-datatable pad-2"
            onClick={(e) => handleDiscontinueModal(e, row.student_id)}
          >
            {/* <FaTrash size={12} color="#ffffff" /> */}
            <span className="text-nowrap">Discontinue</span>
          </div>
        </div>
      ),
      width: "180px",
    },
  ];

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue.toLowerCase());
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const filteredResults = hostelData.hostelStudentData.filter(
      (row: any) =>
        row.student_name.toLowerCase().endsWith(lowerCaseSearchValue) ||
        row.old_admission_no.toLowerCase().endsWith(lowerCaseSearchValue)
    );
    setFilteredData(filteredResults);
  };
  useEffect(() => {
    console.log("Filtered results___:", filteredData);
  }, [filteredData]);

  const headerComponent = useMemo(() => {
    return (
      <>
        <div className="tableTopSection">
          <h2>Hostel Student List</h2>
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
            <span>Add Student Setting</span>
          </button>
        </div>
        {/* <div className="btn-export">
          <button onClick={() => onBtExport(concessionData.excel)}>
            <FaDownload /> <span>Export to excel</span>
          </button>
        </div> */}
      </>
    );
  }, [searchTerm]);
  useEffect(() => {
    dispatch(tryFetchHostelStudentData());
  }, []);
  useEffect(() => {
    setFilteredData(hostelData.hostelStudentData);
  }, [hostelData]);
  useEffect(() => {
    setFilteredData(
      hostelData.hostelStudentData.filter(
        (row: any) =>
          row.student_name.toLowerCase().includes(searchTerm) ||
          row.old_admission_no.toLowerCase().includes(searchTerm)
      )
    );
  }, [hostelData.hostelStudentData, searchTerm]);
  return (
    <>
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          // data={hostelData.hostelStudentData}
          data={filteredData}
          selectableRows
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
        />
      </div>
      <AddHostelSettingModal modalOpen={openModal} setOpen={setOpenModal} />
      <EditHostelSettingModal
        modalOpen={openEditModal}
        setOpen={setOpenEditModal}
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
            Are you sure you want to discontinue Hostel for this student ?
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
    </>
  );
}

export default HostelSettings;
