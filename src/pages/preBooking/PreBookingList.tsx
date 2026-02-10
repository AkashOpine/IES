import { useEffect, useMemo, useRef, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { tryFetchPreBookingTableData } from "../../slices/receipt/receiptSlice";
import { Link } from "react-router-dom";
import ApproveModal from "./ApproveModal";
import PreBooking from "./PreBooking";
import ReceiptModal from "./RecieptModal";
import { FaEdit, FaTrash } from "react-icons/fa";

function PreBookingList() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const Data: any = useSelector((state: any) => state.receipt);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rowData, setRowData] = useState({});
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isAddOpenModal, setisAddOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const columns: any = [
    {
      name: "Sl.no",
      selector: (row: any, rowIndex: number) => rowIndex + 1,
      width: "100px",
    },
    {
      name: "App.No",
      selector: (row: any) => row.application_no,
      width: "100px",
      sortable: true,
    },
    {
      name: "Student Name",

      sortable: true,
      cell: (row: any) => {
        return (
          <div style={{width:"max-content"}}>{[row.first_name, row.last_name].filter(Boolean).join(" ")}</div>
        );
      },
    },
    {
      name: "Date of birth",
      selector: (row: any) => row.dob,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row: any) => row.class_name,
      sortable: true,
    },
    {
      name: "Date of Registration",
      selector: (row: any) => row.date_of_registration,
      sortable: true,
    },
    {
      name: "Application status",
      selector: (row: any) => row.application_status,
      sortable: true,
    },
    {
      name: "Academic year",
      selector: (row: any) => row.academic_year,
      sortable: true,
    },

    {
      name: "Action",
      button: true,
      cell: (row: any) => (
        <div className="tablebtn gap-4">
          <button
            className="button-datatable"
            role="button"
            onClick={(e) => handleApprove(row)}
            // disabled={row.id === concessionId}
          >
            <span>Approve</span>
          </button>
          <div
            className="round-btn-group edit "
            onClick={() => handleEdit(row)}
          >
            <FaEdit size={15} color="#fff" />
          </div>
        </div>
      ),
      width: "180px",
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Rows per page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const handleApprove = (row: any) => {
    console.log("row data", row);
    setRowData(row);
    setisOpenModal(true);
  };
  const handleEdit = (row: any) => {
    // console.log("row data", row);
    setIsEdit(true);
    setRowData(row);
    setisAddOpenModal(true);
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    // console.log("search text", searchValue);
    const filteredResults = Data?.preBookingTableData?.filter(
      (row: any) =>
        row.application_no?.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.last_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.first_name?.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredData(filteredResults);
  };
  const headerComponent = useMemo(() => {
    return (
      <>
        <div className="tableTopSection">
          <h2>Pre Registration List</h2>
          <div className="main-search">
            <input
              type="text"
              placeholder="Search by name or application number"
              value={searchTerm}
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {/* <Link to="/add-pre-registration"> */}
          <button className="btn-view" onClick={(e) => setisAddOpenModal(true)}>
            <span>Add </span>
          </button>
          {/* </Link> */}
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
    dispatch(tryFetchPreBookingTableData());
  }, []);
  useEffect(() => {
    setFilteredData(Data.preBookingTableData);
    // console.log("pres change data", filteredData);
  }, [Data]);

  return (
    <>
      <div className="page-inner-content" ref={ref}>
        <DataTable
          columns={columns}
          // data={Data?.preBookingTableData}
          data={filteredData}
          // selectableRows
          subHeader
          subHeaderComponent={headerComponent}
          subHeaderAlign={Alignment.LEFT}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
      <ApproveModal
        rowData={rowData}
        modalOpen={isOpenModal}
        setOpen={setisOpenModal}
      />
      <PreBooking
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        modalOpen={isAddOpenModal}
        setOpen={setisAddOpenModal}
        rowData={rowData}
      />
    </>
  );
}

export default PreBookingList;
