import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import FeeSettingsHeader from "./FeeSettingsHeader";
import { BsPlus, BsTrash } from "react-icons/bs";
import { apiPost } from "../../../config/apiConfig";
import {
  FEE_HEAD_LIST,
  FEE_STATUS,
  SET_FEE_SETTINGS,
  SUB_DIV_LIST,
} from "../../../config/BaseUrl";
import axios from "axios";
import Select, { OptionsOrGroups } from "react-select";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import {
  deleteFeeSettingsApi,
  getFeeHeadListApi,
  getFeeSettingsListApi,
  getFeeStatusApi,
  getSubDivListApi,
} from "./services";
import { toast } from "react-toastify";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

type MonthKey =
  | "apr"
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
  | "mar";

export const MONTHS: {
  label: string;
  key: MonthKey;
  num: number; // API month number
}[] = [
  { label: "Apr", key: "apr", num: 4 },
  { label: "May", key: "may", num: 5 },
  { label: "Jun", key: "jun", num: 6 },
  { label: "Jul", key: "jul", num: 7 },
  { label: "Aug", key: "aug", num: 8 },
  { label: "Sep", key: "sep", num: 9 },
  { label: "Oct", key: "oct", num: 10 },
  { label: "Nov", key: "nov", num: 11 },
  { label: "Dec", key: "dec", num: 12 },
  { label: "Jan", key: "jan", num: 1 },
  { label: "Feb", key: "feb", num: 2 },
  { label: "Mar", key: "mar", num: 3 },
];

interface FeeRow {
  id: number;
  feeHead: string;
  subDivision: string;
  feeStatus: string;
  months: Record<MonthKey, string>;
}

const createEmptyRow = (id: number): FeeRow => ({
  id,
  feeHead: "",
  subDivision: "",
  feeStatus: "",
  months: MONTHS.reduce(
    (acc, m) => {
      acc[m.key] = "";
      return acc;
    },
    {} as Record<MonthKey, string>,
  ),
});

function AddFeeSettings() {
  const currentYear = localStorage.getItem("year");
  const [rows, setRows] = useState<FeeRow[]>([createEmptyRow(1)]);
  const [nextId, setNextId] = useState(2);
  const [feeHeadList, setFeeHeadList] = useState([]);
  const [subDivList, setSubDivList] = useState([]);
  const [feeStatusList, setFeeStatusList] = useState([]);
  const [classId, setClassId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [year, setYear] = useState(currentYear);
  const [feeSettingsList, setFeeSettingsList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getFeeStatusApi().then(setFeeStatusList).catch(console.error);
    getSubDivListApi().then(setSubDivList).catch(console.error);
    getFeeHeadListApi().then(setFeeHeadList).catch(console.error);
  }, []);

  useEffect(() => {
    if (!year) return;

    getFeeSettingsListApi(year, classId, divisionId)
      .then(setFeeSettingsList)
      .catch(console.error);
  }, [year, classId, divisionId]);

  useEffect(() => {
    console.log("classId", classId);
  }, [classId]);

  const feeHeadOptions: any = feeHeadList.map((items: any) => {
    return {
      value: items.feehead_id,
      label: items.feehead_name,
    };
  });

  const feeStatusOptions: any = feeStatusList.map((items: any) => {
    return {
      value: items.value,
      label: items.name,
    };
  });

  const subDivOptions: any = subDivList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });

  const updateRowField = (rowId: number, field: string, value: any) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)),
    );
  };

  const updateMonth = (id: number, month: MonthKey, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              months: { ...row.months, [month]: value },
            }
          : row,
      ),
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, createEmptyRow(nextId)]);
    setNextId((prev) => prev + 1);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };
  const mapApiItemToRow = (item: any, index: number): FeeRow => {
    const months: Record<MonthKey, string> = {} as Record<MonthKey, string>;

    MONTHS.forEach((m) => {
      const apiMonthKey = `fee_${m.num}`; // fee_1 ... fee_12
      months[m.key] = item[apiMonthKey] ?? "";
    });

    return {
      id: item.id,
      feeHead: item.feehead_id ?? "",
      subDivision: item.sub_division_id ?? "",
      feeStatus: item.fee_status ?? item.status ?? "",
      months,
    };
  };
  useEffect(() => {
    if (feeSettingsList && feeSettingsList.length > 0) {
      const mappedRows = feeSettingsList.map((item: any, index: number) =>
        mapApiItemToRow(item, index),
      );

      setRows(mappedRows);
    } else {
      // fallback if no data
      setRows([createEmptyRow(1)]);
    }
  }, [feeSettingsList]);
  const handleConfirmDelete = async () => {
    if (!rowToDelete) return;

    try {
      setIsDeleting(true);

      // 🔥 API call
      await deleteFeeSettingsApi(year!, String(rowToDelete));

      // ✅ remove row locally after success
      setRows((prev) => prev.filter((row) => row.id !== rowToDelete));

      setShowDeleteModal(false);
      setRowToDelete(null);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsDeleting(false);
    }
  };
  const handleCancelDelete = () => {
    if (isDeleting) return;
    setShowDeleteModal(false);
    setRowToDelete(null);
  };
  const monthTotals = MONTHS.reduce<Record<string, number>>((acc, m) => {
    acc[m.key] = rows.reduce(
      (sum, row) => sum + Number(row.months[m.key] || 0),
      0,
    );
    return acc;
  }, {});

  const handleSubmit = async () => {
    const token = localStorage.getItem("token") as string;

    const bodyFormData = new FormData();

    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", year || "");
    bodyFormData.append("class_id", classId);
    bodyFormData.append("division_id", divisionId);

    rows.forEach((row, index) => {
      // Fee head, subdivision, status
      bodyFormData.append(`fee[${index}][feehead_id]`, row.feeHead);
      bodyFormData.append(
        `fee[${index}][sub_division_id]`,
        row.subDivision || "0",
      );
      bodyFormData.append(`fee[${index}][fee_status]`, row.feeStatus);

      // Months (1–12)
      MONTHS.forEach((month) => {
        bodyFormData.append(
          `fee[${index}][${month.num}]`,
          row.months[month.key] || "",
        );
      });
    });

    const resp: any = await apiPost(SET_FEE_SETTINGS, bodyFormData);
    if (resp.response.status === 200) {
      setRows([createEmptyRow(1)]);
      setDivisionId("");
      setClassId("");
      toast.success(resp.response.data.status_message);
    }

    console.log("Submitting Fee Settings response:", resp);
  };

  const clearForm = () => {
    setRows([createEmptyRow(1)]);
    setDivisionId("");
    setClassId("");
  };
  return (
    <div>
      <div>
        <Row>
          <Col md={12} className="report-header">
            <FeeSettingsHeader
              classId={classId}
              setClassId={setClassId}
              divisionId={divisionId}
              setDivisionId={setDivisionId}
              year={year}
              setYear={setYear}
              onSubmit={handleSubmit}
              clearForm={clearForm}
            />
          </Col>
        </Row>
      </div>
      <div className="page-inner-content ">
        <div className="table-responsive" style={{ height: "65vh" }}>
          <Table bordered hover className="mb-0 align-middle ">
            <thead className="table-light">
              <tr>
                <th
                  className="text-left bold p-2"
                  style={{ minWidth: "180px" }}
                >
                  Fee Head
                </th>
                <th
                  className="text-left bold p-2"
                  style={{ minWidth: "150px" }}
                >
                  Sub Division
                </th>
                <th
                  className="text-left bold p-2"
                  style={{ minWidth: "120px" }}
                >
                  Status
                </th>
                {MONTHS.map((m) => (
                  <th className="text-left bold p-2" key={m.key}>
                    {m.label}
                  </th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* ================= DATA ROWS ================= */}
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Select
                      options={feeHeadOptions}
                      placeholder="Select"
                      styles={customStyles}
                      value={feeHeadOptions.find(
                        (opt: any) => opt.value === row.feeHead,
                      )}
                      onChange={(e) =>
                        updateRowField(row.id, "feeHead", e?.value)
                      }
                    />
                  </td>

                  <td>
                    <Select
                      options={subDivOptions}
                      placeholder="Select"
                      styles={customStyles}
                      value={subDivOptions.find(
                        (opt: any) => opt.value === row.subDivision,
                      )}
                      onChange={(e) =>
                        updateRowField(row.id, "subDivision", e?.value)
                      }
                    />
                  </td>

                  <td>
                    <Select
                      options={feeStatusOptions}
                      placeholder="Select"
                      styles={customStyles}
                      value={feeStatusOptions.find(
                        (opt: any) => opt.value === row.feeStatus,
                      )}
                      onChange={(e) =>
                        updateRowField(row.id, "feeStatus", e?.value)
                      }
                    />
                  </td>

                  {MONTHS.map((m) => (
                    <td key={m.key}>
                      <Form.Control
                        type="number"
                        value={row.months[m.key]}
                        onChange={(e) =>
                          updateMonth(row.id, m.key, e.target.value)
                        }
                        style={{ width: "90px" }}
                      />
                    </td>
                  ))}

                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setRowToDelete(row.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <BsTrash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}

              {/* ================= ADD ROW BUTTON ================= */}
              <tr>
                <td colSpan={3 + MONTHS.length} className="text-start fw-bold p-3">
                  <Button variant="success" size="sm" onClick={addRow}>
                    <BsPlus size={16} /> Add New Fee Head
                  </Button>
                </td>
              </tr>

              {/* ================= TOTAL ROW ================= */}
              <tr className="table-secondary  fw-bold">
                <td colSpan={3}>Total</td>

                {MONTHS.map((m) => (
                  <td key={m.key} className="p-3">
                    ₹ {monthTotals[m.key].toLocaleString()}
                  </td>
                ))}

                <td />
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-end mt-3 px-4  ">
          <div className="d-flex  gap-4">
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outline-secondary" onClick={clearForm}>
              Clear
            </Button>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        open={showDeleteModal}
        title="Delete Fee Setting"
        message="Are you sure you want to delete this fee setting? This action cannot be undone."
        loading={isDeleting}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default AddFeeSettings;
