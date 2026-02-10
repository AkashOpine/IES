import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import PaymentReportHeader from "./headerComponents/PaymentReportHeader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import Loader from "../../components/layout/aggrid/Loader";
import PaymentModeReportHeader from "./headerComponents/PaymentModeReportHeader";
import HeadWiseReportHeader from "./headerComponents/HeadWiseReportHeader";
import { FaDownload, FaEye, FaTrash } from "react-icons/fa";
import { onBtExport } from "./headerComponents/ExportExcel";
import MiscellaneousCollectionReceiptModal from "./MiscellaneousCollectionReceiptModal";

function MiscellaneousReport() {
  const miscReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi]: any = useState(null);
  const [receiptModal, setReceiptModal] = useState(false);
  const [receiptModalData, setReceiptModalData] = useState(null);

  // const [columnDefs, setColumnDefs] = useState([
  //   {
  //     headerName: "Sl.no",
  //     valueGetter: (params: any) => {
  //       return params.node ? params.node.rowIndex + 1 : null;
  //     },
  //     width: 125,
  //     headerCheckboxSelection: true,
  //     checkboxSelection: true,
  //     headerTooltip: "Serial Number",
  //   },

  //   {
  //     field: "student_name",
  //     headerName: "Name",
  //     headerTooltip: "Fee Head Name",
  //   },
  //   {
  //     field: "adm_no",
  //     headerName: "ADMN_No",
  //     headerTooltip: "Admission Number",
  //   },
  //   {
  //     field: "class_div",
  //     headerName: "Class-Div",
  //     headerTooltip: "Class",
  //   },

  //   {
  //     field: "fee_head_name",
  //     headerName: "Fee Head",
  //     headerTooltip: "Fee Head",
  //   },
  //   {
  //     field: "fee_amount",
  //     headerName: "Fee Amount",
  //     headerTooltip: "Fee Amount",
  //   },
  //   {
  //     field: "fine",
  //     headerName: "Fine",
  //     headerTooltip: "Fine",
  //   },
  //   {
  //     field: "payment_mode",
  //     headerName: "Payment Mode",
  //     headerTooltip: "Payment Mode",
  //   },
  //   {
  //     field: "total_fee_amount",
  //     headerName: "Total Amount",
  //     headerTooltip: "Total Amount",
  //   },
  //   {
  //     field: "remarks",
  //     headerName: "Remarks",
  //     headerTooltip: "Remarks",
  //   },
  // ]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    [],
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


  const actionCellRenderer = useCallback(
    (params: any) => {
      if (params.node.rowPinned === "bottom") {
        return null;
      }
      return (
        <div className="d-flex justify-content-around">
          <div
            className="roundbtn"
            onClick={() => {
              setReceiptModal(true);
              setReceiptModalData(params.data);
            }}
          >
            <FaEye color="#556EE6" />
          </div>
        </div>
      );
    },
    [miscReport],
  );

  const columnDefs = useMemo(() => {
    const columns =
      miscReport.miscellaneousReport?.head?.map(
        (heading: any, index: string | number) => ({
          headerName: heading,
          headerTooltip: heading,
          field: miscReport.miscellaneousReport?.headers[index],
          width: "200px",
        }),
      ) || [];
    // Add actions column
    columns.push({
      headerName: "ACTIONS",
      field: "actions",
      cellRendererFramework: actionCellRenderer,
      pinned: "right",
    });
    return columns;
  }, [miscReport.miscellaneousReport, actionCellRenderer]);

  const onFirstDataRendered = useCallback((params: any) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback(
    (params: any) => {
      return miscReport.miscellaneousReport;
    },
    [miscReport.miscellaneousReport],
  );
  useEffect(() => {
    console.log(
      "miscReport?.miscellaneousReport",
      miscReport?.miscellaneousReport,
    );
  }, [miscReport.miscellaneousReport]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <HeadWiseReportHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!miscReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(miscReport?.miscellaneousReportExcel)
                  }
                  disabled={miscReport?.miscellaneousReportExcel === ""}
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={
                  miscReport?.miscellaneousReport?.data
                    ? miscReport?.miscellaneousReport?.data
                    : []
                }
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                onFirstDataRendered={onFirstDataRendered}
                sideBar={sideBar}
                minColWidth={180}
                pagination
                onGridReady={onGridReady}
              />
            </div>
          </Col>
        ) : (
          <Col md={12} className="loaderContainer">
            <Spinner animation="grow" variant="primary" />
          </Col>
        )}
      </Row>
      <MiscellaneousCollectionReceiptModal
          openModal={receiptModal}
          setOpenModal={setReceiptModal}
          closeModal={() => setReceiptModal(false)}
          receiptData={receiptModalData}
        />
    </>
  );
}

export default MiscellaneousReport;
