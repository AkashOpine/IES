import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable, { Alignment } from "react-data-table-component";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { apiPost, apiPostBase64File, apiPostPdf } from "../../config/apiConfig";
import { PRINT_DUE_CLEARANCE_FORM } from "../../config/BaseUrl";
import axios from "axios";

function ClassWiseSearchList() {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [idData, setIdData] = useState({
    year: "",
    classId: "",
    divisionId: "",
  });
  const idsRef = useRef<{
    year: string;
    classId: string;
    divisionId: string;
  } | null>(null);

  const Ids = useSelector((state: any) => {
    return state.classWise;
  });

  useEffect(() => {
    if (Ids?.year && Ids?.classId && Ids?.divisionId) {
      idsRef.current = Ids;
    }
  }, [Ids]);

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
      cell: (row: any) =>
        row?.id ? (
          <Link to={`/dashboard/${row.id}/${Ids?.year}`}>
            <button className="button-70">View</button>
          </Link>
        ) : null,
    },
  ];

  const searchResult = useSelector((state: any) => {
    return state.classWiseList;
  });

  async function handlePrintDueClearanceForm() {
    const ids = idsRef.current;

    if (!ids) {
      console.warn("Ids not ready from ref");
      return;
    }

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token") as string;
      const bodyFormData = new FormData();

      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", ids.year);
      bodyFormData.append("class_id", ids.classId);
      bodyFormData.append("division_id", ids.divisionId);
      bodyFormData.append("student_id", "");

      const resp = await apiPostPdf(PRINT_DUE_CLEARANCE_FORM, bodyFormData);

      const pdfBlob = new Blob([resp.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Fee_Due_Form.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const headerComponent = useMemo(() => {
    return (
      <div className="d-flex justify-content-between w-100">
        <h2>Class wise search result</h2>

        <div>
          <div className="btn-export">
            <button
              style={{ width: "200px" }}
              onClick={handlePrintDueClearanceForm}
              disabled={isLoading}
            >
              <FaDownload /> <span>Print Due Clearence Form</span>
            </button>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="page-inner-content">
      <DataTable
        columns={columns}
        data={searchResult?.classList ?? []}
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
