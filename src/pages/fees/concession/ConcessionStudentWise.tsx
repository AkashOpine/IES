import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { tryFetchConcessionListData } from "../../../slices/concession/concessionSlice";
import AddStudentConcessionModal from "./AddStudentConcessionModal";
import { Card, Col, Overlay, Popover, Row } from "react-bootstrap";
import { FaDownload, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiPost } from "../../../config/apiConfig";
import axios from "axios";
import { CONCESSION_STUDENT_DELETE } from "../../../config/BaseUrl";
import { onBtExport } from "../../Reports/headerComponents/ExportExcel";
import TableHeader from "../../dashboard/tableHeader";

function ConcessionStudentWise() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const concessionData: any = useSelector((state: any) => state.concession);
  const [openModal, setOpenModal]: any = useState(false);
  const [concessionId, setConcessionId]: any = useState("");
  // delete overlay
  const [itemId, setItemId] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(
    concessionData.concessionList
  );
  const handleDeleteModal = (event: any, id: any) => {
    console.log("id is", id);
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
      bodyFormData.append("student_id", itemId);

      let resp: any = await apiPost(CONCESSION_STUDENT_DELETE, bodyFormData);
      console.log("DELETE datas is ", resp);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);
        toast.error("Concession Deleted");
        dispatch(tryFetchConcessionListData());
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
  const handleModel = (row: any) => {
    setOpenModal(true);
  };
  const handleConcession = (row: any) => {
    setConcessionId(row.id);
  };
  const columns: any = [
    {
      name: "Sl.no",
      selector: (row: any, rowIndex: number) => rowIndex + 1,
      width: "100px",
    },
    {
      name: "Student Name",
      selector: (row: any) =>
        row.first_name + " " + row.middle_name + " " + row.last_name,
      sortable: true,
    },
    {
      name: "Admission No",
      selector: (row: any) => row.old_admission_no,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row: any) => row.class_name + " " + row.division_name,
      sortable: true,
    },
    // {
    //   name: "Division",
    //   selector: (row: any) => row.division_name,
    //   sortable: true,
    // },
    {
      name: "Concession Type",
      selector: (row: any) => row.concession_type,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (row: any) => (
        <div className="tablebtn">
          {/* <button
            className="button-datatable"
            role="button"
            onClick={(e) => handleConcession(row)}
            disabled={row.id === concessionId}
          >
            <span>Set concession</span>
          </button> */}
          <div
            className="settings-btn deleteBtn"
            onClick={(e) => handleDeleteModal(e, row.id)}
          >
            <FaTrash size={12} color="#ffffff" />
          </div>
        </div>
      ),
      width: "180px",
    },
  ];
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    console.log("search text", searchValue);
    const filteredResults = concessionData.concessionList.filter(
      (row: any) =>
        row.student_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.old_admission_no.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  const headerComponent = useMemo(() => {
    return (
      <>
        <div className="tableTopSection py-4">
          <h2>Concession List</h2>
          {/* <div className="main-search">
            <input
              type="text"
              placeholder="Search by Name or admission number"
              value={searchTerm}
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button className="btn-view" role="button" onClick={handleModel}>
            <span>Student Concession</span>
          </button> */}
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
    dispatch(tryFetchConcessionListData());
  }, []);
  useEffect(() => {
    setFilteredData(concessionData.concessionList);
  }, [concessionData.concessionList]);
  return (
    <>
      <div className="page-inner-content" ref={ref}>
        {concessionData.specialConcession.student_name ? (
          <Card className="fees-table-card">
            <Row>
              <Col md={6} className="student-profile-details">
                <div className="student-image">
                  <div className="student-image-container">
                    <img
                      src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="student-details student-detail-font">
                  <span className="bold mb-2">
                    {concessionData.specialConcession?.student_name}
                  </span>
                  {concessionData.specialConcession?.class +
                    " " +
                    concessionData.specialConcession?.division +
                    " "}
                  {concessionData.specialConcession?.sub_division
                    ? concessionData.specialConcession?.sub_division
                    : ""}
                </div>
                <div className="student-class">
                  <span className="mb-2 student-detail-font">
                    {concessionData.specialConcession?.old_admission_no} -{" "}
                    {concessionData.specialConcession?.jyear}
                    {concessionData.specialConcession?.display_message}
                  </span>
                  <div className="privilage">
                    <span className="student-privilage">
                      {concessionData.specialConcession?.concession_type
                        ? concessionData.specialConcession?.concession_type
                        : "No special privilage"}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="mt-4 col-md-12">
                  <table className="table table-responsive"></table>
                </div>
              </Col>
            </Row>
          </Card>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ConcessionStudentWise;
