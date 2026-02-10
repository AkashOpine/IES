import { useMemo } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { onBtExport } from "../../Reports/headerComponents/ExportExcel";

function TransportStudentList() {
  const transportData: any = useSelector((state: any) => state.transport);

  const columns: any = [
    // {
    //   name: "Image",
    //   button: true,
    //   cell: (row: { vehicle_photo_path: string }) => (
    //     <div className="tableimg">
    //       <img
    //         src={
    //           row.vehicle_photo_path
    //             ? row.vehicle_photo_path
    //             : "https://img.indianautosblog.com/2022/02/01/scania-interlink-bus-front-left-d665.jpg"
    //         }
    //         alt=""
    //       />
    //     </div>
    //   ),
    // },
    {
      name: "Sl NO",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row: any) => row.student_name,
      sortable: true,
    },
    {
      name: "Admn NO",
      selector: (row: any) => row.old_admission_no,
      sortable: true,
    },
    {
      name: "Vehicle No",
      selector: (row: any) => row.vehicle_no,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row: any) => row.class_name + " " + row.division_name,
      sortable: true,
    },

    {
      name: "Route",
      selector: (row: any) => row.route,
      sortable: true,
    },
    {
      name: "Pick Up",
      selector: (row: any) => row.pick_up_point,
      sortable: true,
    },
    {
      name: "Fee",
      selector: (row: any) => row.fee_amount,
      sortable: true,
    },
    // {
    //   name: "Action",
    //   button: true,
    //   cell: (row: any) => (
    //     <div className="tablebtn">
    //       <Link to="#">
    //         <button className="button-70" role="button">
    //           <span>View</span>
    //         </button>
    //       </Link>
    //     </div>
    //   ),
    // },
  ];

  const headerComponent = useMemo(() => {
    return <h2>Transport Student List</h2>;
  }, []);
  return (
    <div className="page-inner-content">
      <div className="btn-export">
        <button
          onClick={() => onBtExport(transportData?.transportStudentListExcel)}
          disabled={transportData?.transportStudentListExcel === ""}
        >
          <FaDownload /> <span>Export to excel</span>
        </button>
      </div>
      <DataTable
        columns={columns}
        data={transportData?.transportStudentListData}
        subHeader
        subHeaderComponent={headerComponent}
        subHeaderAlign={Alignment.LEFT}
        pagination
      />
    </div>
  );
}

export default TransportStudentList;
