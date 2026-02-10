import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { tryFetchTransportListData } from "../../../slices/transport/transportSlice";
import FuelReportHeader from "../headerComponents/FuelReportHeader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import TranspoetFeeCollectionHeader from "../headerComponents/TransportFeeCollectionHeader";
import { tryFetchReceiptData } from "../../../slices/receipt/receiptSlice";
import FeeReceiptModal from "../../receipt/FeeReceiptModal";
import { useParams } from "react-router-dom";
function TransportFeeCollectionReport() {
  const transportFuelReport: any = useSelector(
    (state: any) => state.transportreport
  );
  const dispatch = useDispatch();
  const gridRef: any = useRef();
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  function receiptModal(row: any) {
    console.log("row reciept modal", row.fee_collection_id);
    setReceiptId(row.fee_collection_id);
    // dispatch(tryFetchReceiptData(row.fee_collection_id));
    dispatch(
      tryFetchReceiptData({
        academicYear: "",
        data: row.fee_collection_id,
      })
    );
    setReceiptModalOpen(true);
  }
  // useEffect(() => {
  //   console.log("params", params.year);
  // }, [params]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "sl_no",
      headerName: "Sl.No",
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      headerTooltip: "Student Name",
    },

    {
      field: "old_admission_no",
      headerName: "Admission.No",
      headerTooltip: "Admission.No",
    },
    {
      field: "class_id",
      headerName: "Class",
      headerTooltip: "Class",
    },
    {
      field: "payment_type",
      headerName: "Payment Type",
      headerTooltip: "Payment Type",
    },
    {
      field: "fee_month",
      headerName: "Fee Month",
      headerTooltip: "Fee Month",
    },
    {
      field: "paid_amt",
      headerName: "Total Amount",
      headerTooltip: "Amount",
    },
    // {
    //   headerName: "Actions",
    //   cellRendererFramework: (props: any) => (
    //     <div className="roundbtn" onClick={() => receiptModal(props.data)}>
    //       <FaEye color="#556EE6" />
    //     </div>
    //   ),
    //   width: 150,
    //   sortable: false,
    //   filter: false,
    // },
  ]);
  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    []
  );
  const sideBar: any = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        minWidth: 225,
        maxWidth: 225,
        width: 225,
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: "right",
    defaultToolPanel: "",
  };
  const generateReceipt = useCallback((row: any) => {
    // dispatch(tryFetchReceiptData(row.receipt_no));
    dispatch(
      tryFetchReceiptData({
        academicYear: "",
        data: row.receipt_no,
      })
    );
    console.log("Generating receipt for row:", row.receipt_no);
  }, []);
  const onGridReady = useCallback(
    (params: any) => {
      return transportFuelReport.transportFeeCollectionReportData;
    },
    [transportFuelReport.transportFeeCollectionReportData]
  );
  useEffect(() => {}, [transportFuelReport.transportFeeCollectionReportData]);
  const onBtExport = useCallback(() => {
    if (transportFuelReport.transportFeeCollectionReportData.length > 0) {
      gridRef.current.api.exportDataAsExcel();
    }
  }, [transportFuelReport.transportFeeCollectionReportData]);
  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <TranspoetFeeCollectionHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!transportFuelReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button onClick={onBtExport}>
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={transportFuelReport.transportFeeCollectionReportData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                sideBar={sideBar}
                pagination
                onGridReady={onGridReady}
              />
            </div>
            <FeeReceiptModal
              show={receiptModalOpen}
              setShow={setReceiptModalOpen}
              slipId={receiptId}
            />
          </Col>
        ) : (
          <Col md={12} className="loaderContainer">
            <Spinner animation="grow" variant="primary" />
          </Col>
        )}
      </Row>
    </>
  );
}

export default TransportFeeCollectionReport;
