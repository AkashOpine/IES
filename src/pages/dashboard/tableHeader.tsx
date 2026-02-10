import React, { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { FaCoins } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import FeeHistoryModal from "./FeeHistoryModal";
import ConcessionModal from "./ConcessionModal";
import { apiPost } from "../../config/apiConfig";
import { SET_CONCESSION } from "../../config/BaseUrl";
import { toast } from "react-toastify";
import { tryFetchFeeTableData } from "../../slices/feetable/feeTableSlice";

type MonthKey =
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec"
  | "jan"
  | "feb"
  | "mar"
  | "apr";

type MonthCell = {
  amount: number;
  status: string; // "Pending" | "None" | "Paid" etc
  monthId?: number; // 👈 NEW
};

type FeeRow = {
  id: number; // this is fee_settings_id
  label: string;
  months: Record<MonthKey, MonthCell>;
};
type EditedCellPayload = {
  fee_settings_id: number;
  month_id: number;
  amount: number;
};

// map API month_name -> our MonthKey
const monthNameToKey: Record<string, MonthKey> = {
  Jan: "jan",
  Feb: "feb",
  Mar: "mar",
  Apr: "apr",
  May: "may",
  Jun: "jun",
  Jul: "jul",
  Aug: "aug",
  Sep: "sep",
  Oct: "oct",
  Nov: "nov",
  Dec: "dec",
};

const getTodayDateFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function TableHeader() {
  const dispatch = useDispatch();
  const params = useParams();
  const feesData: any = useSelector((state: any) => state.feeTable);
  const [show, setShow]: any = useState(false);
  const [admissionType, setAdmissionType] = useState<string>("Special");
  const [remarks, setRemarks]: any = useState("");

  const [headerComponent, setHearderComponent] = useState([
    {
      name: "Demand",
      icon: <FaCoins size={20} />,
      color: "#E1F0FF",
      iconColor: "#3699FF",
    },
    {
      name: "Collection",
      icon: <FaCoins size={20} />,
      color: "#FFE2E5",
      iconColor: "#F64E60",
    },
    {
      name: "Balance",
      icon: <FaCoins size={20} />,
      color: "#EEE5FF",
      iconColor: "#8950FC",
    },
  ]);

  const handleCollection = (item: any) => {
    if (item.name === "Collection") {
      setShow(true);
      // history(`/fee-history/${feesData.feeData.student_details?.student_id}`);
    }
  };
  const [showConcessionModal, setShowConcessionModal] = useState(false);
  const [feeRows, setFeeRows] = useState<FeeRow[]>([]);

  useEffect(() => {
    // 👇 make sure the full path exists
    const feeDetailsObj = feesData?.feeData?.fee_details;
    if (!feeDetailsObj || typeof feeDetailsObj !== "object") {
      console.warn("fee_details not found in API response", feesData);
      return;
    }
    const createEmptyMonths = (): Record<MonthKey, MonthCell> => ({
      may: { amount: 0, status: "None", monthId: undefined },
      jun: { amount: 0, status: "None", monthId: undefined },
      jul: { amount: 0, status: "None", monthId: undefined },
      aug: { amount: 0, status: "None", monthId: undefined },
      sep: { amount: 0, status: "None", monthId: undefined },
      oct: { amount: 0, status: "None", monthId: undefined },
      nov: { amount: 0, status: "None", monthId: undefined },
      dec: { amount: 0, status: "None", monthId: undefined },
      jan: { amount: 0, status: "None", monthId: undefined },
      feb: { amount: 0, status: "None", monthId: undefined },
      mar: { amount: 0, status: "None", monthId: undefined },
      apr: { amount: 0, status: "None", monthId: undefined },
    });
    console.log("feeDetailsObj", feeDetailsObj);

    const mappedRows: FeeRow[] = Object.values(feeDetailsObj).map(
      (head: any, index) => {
        const months = createEmptyMonths();

        // in your screenshot this array is named `fee`
        const lines: any[] = head.fee || head.paid || [];

        lines.forEach((item) => {
          // allow both Pending and Due
          if (item.status !== "Pending" && item.status !== "Due") return;

          const key = monthNameToKey[item.month_name];
          if (!key) return;

          months[key] = {
            amount: Number(item.bal_to_be_paid ?? item.amt ?? 0),
            status: item.status, // 👈 use actual status from API
            monthId: item.month_id,
          };
        });

        return {
          id: Number(head.fee_settings_id ?? index + 1), // fee_settings_id
          label:
            head.dlbFeeheadName || (head.feehead_name || "").replace(/'/g, ""),
          months,
        };
      },
    );

    setFeeRows(mappedRows);
  }, [feesData]);

  const handleConcessionSave = async (edited: EditedCellPayload[]) => {
    const concessionDate = getTodayDateFormatted();
    var token = localStorage.getItem("token") as string;

    // edited comes from ConcessionModal: only changed cells
    if (!edited || edited.length === 0) {
      // nothing to send
      setShowConcessionModal(false);
      return;
    }

    const bodyFormData = new FormData();

    try {
      // set your constant fields
      bodyFormData.append("Authorization", token);
      bodyFormData.append(
        "student_id",
        feesData.feeData.student_details?.student_id || "",
      );
      bodyFormData.append(
        "academic_year",
        feesData.feeData.academic_year || "",
      );
      bodyFormData.append("date", concessionDate);
      bodyFormData.append("concession_type", admissionType);
      bodyFormData.append("remarks", remarks);

      const grouped: Record<number, EditedCellPayload[]> = {};
      edited.forEach((cell) => {
        if (!grouped[cell.fee_settings_id]) {
          grouped[cell.fee_settings_id] = [];
        }
        grouped[cell.fee_settings_id].push(cell);
      });

      Object.entries(grouped).forEach(([feeIdStr, cells]) => {
        const feeId = Number(feeIdStr);
        cells.forEach((cell, index) => {
          bodyFormData.append(
            `month_arr[${feeId}][${index}]`,
            String(cell.month_id),
          );
          bodyFormData.append(
            `concession_amt[${feeId}][${cell.month_id}]`,
            String(cell.amount),
          );
        });
      });
      let resp: any;
      resp = await apiPost(SET_CONCESSION, bodyFormData);
      console.log("resp concession ", resp);

      if (resp.response.data.status === 200) {
        toast.success(resp.response.data.status_message || "Concession saved");
        setShowConcessionModal(false);
        dispatch(
          tryFetchFeeTableData({
            academicYear: feesData.feeData.academic_year || "",
            studentId: feesData.feeData.student_details?.student_id,
          }),
        );
        setFeeRows([]);
      } else {
        toast.error(resp.response.data.status_message);
      }
    } catch (error) {
      console.error("Error saving concession:", error);
      toast.error("Error saving concession");
    }
  };

  useEffect(() => {
    console.log("admissionType", admissionType);
  }, [admissionType]);

  return (
    <>
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
              {feesData.feeData.student_details?.name}
            </span>
            {feesData.feeData.student_details?.class +
              " " +
              feesData.feeData.student_details?.division +
              " "}
            {feesData.feeData.student_details?.sub_division
              ? feesData.feeData.student_details?.sub_division
              : ""}
          </div>
          <div className="student-class">
            <span className="mb-2 student-detail-font">
              {feesData.feeData.student_details?.old_admission_no} -{" "}
              {feesData.feeData?.academic_year}
              {feesData.feeData?.display_message}
            </span>
            <div className="privilage">
              <span
                className=" student-detail-font "
                style={{
                  color: "yellow",
                  fontWeight: "bold",
                  WebkitTextStroke: "0.05px black",
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
              >
                {feesData.feeData.student_details?.student_status?.replace(
                  /\s+/g,
                  "",
                ) === "Suspended"
                  ? "Inactive"
                  : ""}
              </span>
              <span className="student-privilage">
                {feesData.feeData.student_details?.concession_type
                  ? feesData.feeData.student_details?.concession_type
                  : "No special privilage"}
              </span>
            </div>
          </div>
          <div>
            <button
              className="button-70"
              role="submit"
              onClick={() => setShowConcessionModal(true)}
            >
              <span>Concession</span>
            </button>
          </div>
        </Col>
        {params.type ? (
          ""
        ) : (
          <Col md={6} className="fee-overview">
            <Row>
              {headerComponent.map((item) => {
                return (
                  <Col
                    md={4}
                    className="overview"
                    style={{
                      cursor: item.name === "Collection" ? "pointer" : "",
                    }}
                    onClick={() => handleCollection(item)}
                  >
                    <div
                      className="overview-icon"
                      style={{ background: item.color, color: item.iconColor }}
                    >
                      {item.icon}
                    </div>
                    <div className="overview-details">
                      <span className="bold mb-1">
                        {item.name === "Demand"
                          ? feesData.feeData?.demand_amt
                            ? feesData.feeData?.demand_amt
                            : "0"
                          : item.name === "Collection"
                            ? feesData.feeData?.paid_amt
                              ? feesData.feeData?.paid_amt
                              : "0"
                            : item.name === "Balance"
                              ? feesData.feeData?.balance_amt
                                ? feesData.feeData?.balance_amt
                                : "0"
                              : "0"}
                      </span>
                      <span className="overview-title student-detail-font">
                        {item.name}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        )}
      </Row>
      <Row>
        <Col md={12} className="history-modal">
          <FeeHistoryModal show={show} setShow={setShow} />
        </Col>

        <ConcessionModal
          show={showConcessionModal}
          onHide={() => setShowConcessionModal(false)}
          feeRows={feeRows}
          onSave={handleConcessionSave}
          stdClass={feesData?.feeData?.student_details?.class}
          admissionType={admissionType}
          setAdmissionType={setAdmissionType}
          remarks={remarks}
          setRemarks={setRemarks}
        />
      </Row>
    </>
  );
}

export default TableHeader;
