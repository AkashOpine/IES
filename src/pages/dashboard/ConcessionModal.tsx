// ConcessionModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { Modal, Table, Form, Button, Badge, Row, Col } from "react-bootstrap";

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

type ConcessionModalProps = {
  show: boolean;
  onHide: () => void;
  feeRows: FeeRow[];
  onSave: (edited: EditedCellPayload[]) => void;
  stdClass: string;
  admissionType: string;
  setAdmissionType: (value: string) => void;
  remarks: string;
  setRemarks: (value: string) => void;
};

const MONTHS: { key: MonthKey; label: string }[] = [
  { key: "may", label: "May" },
  { key: "jun", label: "Jun" },
  { key: "jul", label: "Jul" },
  { key: "aug", label: "Aug" },
  { key: "sep", label: "Sep" },
  { key: "oct", label: "Oct" },
  { key: "nov", label: "Nov" },
  { key: "dec", label: "Dec" },
  { key: "jan", label: "Jan" },
  { key: "feb", label: "Feb" },
  { key: "mar", label: "Mar" },
  { key: "apr", label: "Apr" },
];

const ConcessionModal: React.FC<ConcessionModalProps> = ({
  show,
  onHide,
  feeRows,
  onSave,
  stdClass,
  admissionType,
  setAdmissionType,
  remarks,
  setRemarks,
}) => {
  // Local editable copy
  const [rows, setRows] = useState<FeeRow[]>([]);

  // Months whose amounts can be edited
  const [selectedMonths, setSelectedMonths] = useState<MonthKey[]>([]);
  const toggleMonth = (key: MonthKey) => {
    setSelectedMonths((prev) => {
      const isSelected = prev.includes(key);

      setEditedCells((prevEdited) => {
        const next = { ...prevEdited };

        rows.forEach((row) => {
          const cell = row.months[key];
          const originalRow = originalRowsRef.current.find(
            (r) => r.id === row.id,
          );
          const originalCell = originalRow?.months[key];

          if (!cell || !originalCell) return;
          if (!cell.monthId) return;
          if (cell.status !== "Pending" && cell.status !== "Due") return;

          const payloadKey = `${row.id}-${key}`;

          if (!isSelected) {
            // ✅ checkbox turned ON → initialize payload
            next[payloadKey] = {
              fee_settings_id: row.id,
              month_id: cell.monthId,
              amount: originalCell.amount ?? 0,
            };
          } else {
            // ❌ checkbox turned OFF → remove payload
            delete next[payloadKey];
          }
        });

        return next;
      });

      return isSelected ? prev.filter((m) => m !== key) : [...prev, key];
    });
  };

  const [editedCells, setEditedCells] = useState<
    Record<string, EditedCellPayload>
  >({});

  // original data to compare with
  const originalRowsRef = useRef<FeeRow[]>(feeRows || []);

  useEffect(() => {
    setRows(feeRows || []);
    originalRowsRef.current = feeRows || [];
  }, [feeRows]);

  const handleAmountChange = (
    rowId: FeeRow["id"],
    monthKey: MonthKey,
    value: string,
  ) => {
    const amount = Number(value) || 0;

    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              months: {
                ...row.months,
                [monthKey]: {
                  ...row.months[monthKey],
                  amount,
                },
              },
            }
          : row,
      ),
    );

    const originalRow = originalRowsRef.current.find((r) => r.id === rowId);
    const originalCell = originalRow?.months[monthKey];
    const originalAmount = originalCell?.amount ?? 0;
    const monthId = originalCell?.monthId;

    const key = `${rowId}-${monthKey}`;

    setEditedCells((prev) => {
      const next = { ...prev };

      if (!monthId) return next;

      if (amount === originalAmount) {
        delete next[key];
      } else {
        next[key] = {
          fee_settings_id: rowId,
          month_id: monthId,
          amount,
        };
      }

      return next;
    });
  };

  const handleSaveClick = () => {
    const payload = Object.values(editedCells);

    // only edited cells
    onSave(payload);
    onHide(); // 👈 send to parent
  };

  const getTotalConcession = () => {
    let total = 0;

    rows.forEach((row) => {
      MONTHS.forEach((m) => {
        const cell = row.months[m.key];

        if (
          cell &&
          selectedMonths.includes(m.key) &&
          (cell.status === "Pending" || cell.status === "Due")
        ) {
          total += Number(cell.amount) || 0;
        }
      });
    });

    return total;
  };

  const handleCancel = () => {
    // Reset everything to original state
    setRows(originalRowsRef.current);
    setSelectedMonths([]);
    setEditedCells({});

    // Close modal
    onHide();
  };

  useEffect(() => {
    if (show) {
      setSelectedMonths([]);
      setEditedCells({});
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="concession-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>Fee Concession</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3">
        <div className="table-responsive">
          <Table bordered hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ minWidth: 220 }}>Fee Headsss</th>
                {MONTHS.map((m) => (
                  <th key={m.key} className="text-center bold p-4">
                    <span className="mb-1">{m.label}</span>
                    <Form.Check
                      type="checkbox"
                      checked={selectedMonths.includes(m.key)}
                      onChange={() => toggleMonth(m.key)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="fw-semibold p-4">{row.label}</td>

                  {MONTHS.map((m) => {
                    const cell = row.months[m.key];

                    if (
                      !cell ||
                      (cell.status !== "Pending" && cell.status !== "Due")
                    ) {
                      return (
                        <td key={m.key} className="text-center text-muted">
                          <span className="small">None</span>
                        </td>
                      );
                    }

                    const isEditable = selectedMonths.includes(m.key);

                    return (
                      <td key={m.key} className="text-center p-4">
                        <div
                          className={`d-flex flex-column align-items-center gap-1 bold fee-tile ${
                            cell.status === "Due" ? "due" : "pending"
                          }`}
                        >
                          {isEditable ? (
                            <Form.Control
                              type="number"
                              size="sm"
                              className="text-center"
                              value={cell.amount}
                              onChange={(e) =>
                                handleAmountChange(
                                  row.id,
                                  m.key,
                                  e.target.value,
                                )
                              }
                            />
                          ) : (
                            <div>{cell.amount}</div>
                          )}

                          <span
                            className={`small ${
                              cell.status === "Due"
                                ? "text-warning"
                                : "text-danger"
                            }`}
                          >
                            {cell.status}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={1 + MONTHS.length} className="text-center py-4">
                    No fees to show.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="mt-4 d-flex gap-4">
          <div className="pay-type">
            <input
              type="radio"
              name="admissionType"
              value="Special"
              checked={admissionType === "Special"}
              onChange={(e) => setAdmissionType(e.target.value)}
            />
            <label className="ms-1">Special</label>
          </div>

          <div className="pay-type">
            <input
              type="radio"
              name="admissionType"
              value="Late Admission"
              checked={admissionType === "Late Admission"}
              onChange={(e) => setAdmissionType(e.target.value)}
            />
            <label className="ms-1">Late Admission</label>
          </div>
        </div>
        <Row>
          <Col md={6} className="mt-4">
            <textarea
              rows={4}
              placeholder="Remarks"
              aria-label="Search"
              className="w-100 input-textarea"
              onChange={(e) => setRemarks(e.target.value)}
              // value={search}
            ></textarea>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="border-0 d-flex justify-content-between align-items-center">
        <div className="fw-bold">
          Total Concession Amount: ₹ {getTotalConcession()}
        </div>

        <div>
          <Button
            variant="outline-secondary"
            onClick={handleCancel}
            className="me-2"
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save Concession
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConcessionModal;
