import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function ClassWiseSearchList() {
  const [studentList, setStudentList] = useState([]);
  const params = useParams();
  const columns: any = [
    // {
    //   name: "Name",
    //   selector: (row: {
    //     first_name: string;
    //     middle_name: string;
    //     last_name: string;
    //   }) => row.first_name + " " + row.middle_name + " " + row.last_name,
    //   sortable: true,
    // },
    {
      name: "Name",
      selector: (row: { student_name: string }) => row.student_name,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row: { class_div: string }) => row.class_div,
      sortable: true,
    },
    // {
    //   name: "Division",
    //   selector: (row: { division_id: string }) => row.division_id,
    //   sortable: true,
    // },
    {
      name: "Admission No.",
      selector: (row: { old_admission_no: string }) => row.old_admission_no,
      sortable: true,
    },
    {
      name: "Demand",
      selector: (row: { demand_amt: string }) => row.demand_amt,
      sortable: true,
    },
    {
      name: "Collected",
      selector: (row: { paid_amt: string }) => row.paid_amt,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row: { bal_amt: string }) => row.bal_amt,
      sortable: true,
    },
    {
      button: true,
      cell: (row: any) => (
        <div className="tablebtn">
          <Link to={`/dashboard/${row.id}/${params.year}`}>
            <button className="button-70" role="button">
              <span>View</span>
            </button>
          </Link>
        </div>
      ),
    },
  ];
  const searchResult = useSelector((state: any) => {
    console.log("search result", state.classWiseList);
    return state.classWiseList;
  });

  const headerComponent = useMemo(() => {
    return <h2>Class wise search result</h2>;
  }, []);

  return (
    <div className="page-inner-content">
      <DataTable
        columns={columns}
        data={searchResult.classList}
        selectableRows
        subHeader
        subHeaderComponent={headerComponent}
        subHeaderAlign={Alignment.LEFT}
        pagination
      />
    </div>
  );
}

export default ClassWiseSearchList;
