import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import PaymentReportHeader from "./headerComponents/PaymentReportHeader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/layout/aggrid/Loader";
import PaymentModeReportHeader from "./headerComponents/PaymentModeReportHeader";
import HeadWiseReportHeader from "./headerComponents/HeadWiseReportHeader";
import { FaDownload, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { onBtExport } from "./headerComponents/ExportExcel";
import MiscellaneousCollectionReceiptModal from "./MiscellaneousCollectionReceiptModal";
import { useNavigate } from "react-router-dom";
import {
  DELETE_MISCELLANEOUS_COLLECTION,
  MISCELLANEOUS_COLLECTION_DETAILS_BY_ID,
} from "../../config/BaseUrl";
import { apiPost } from "../../config/apiConfig";
import { tryFetchMiscellaneousSettingList } from "../../slices/settings/miscellaneousSettingSlice";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tryFetchMiscellaneousReportData } from "../../slices/reports/paymentReportSlice";
import DeleteModal from "../../components/delete modal/DeleteModal";

function MiscellaneousReport() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const miscReport: any = useSelector((state: any) => state.paymentreport);
  const miscFilters = useSelector(
    (state: any) => state.paymentreport.miscFilters,
  );
  const gridRef: any = useRef();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi]: any = useState(null);
  const [receiptModal, setReceiptModal] = useState(false);
  const [receiptModalData, setReceiptModalData] = useState(null);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [itemId, setItemId] = useState("");
  const [misCollectionValues, setMisCollectionValues] = useState<any>(null);

  const handleDeleteModal = (event: any, id: any) => {
    event.stopPropagation(); // important if inside table row
    setItemId(id);
    setShow(true);
  };
  const handleReceiptView = (event: any, id: any) => {
    setReceiptModal(true);
    getItemById(id);
  };
  useEffect(() => {
    console.log(
      "miscReport?.miscellaneousReport?",
      miscReport?.miscellaneousReport,
    );
  }, [miscReport?.miscellaneousReport]);

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
  const getItemById = async (id: any) => {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("mis_id", id);

      let resp: any = await apiPost(
        MISCELLANEOUS_COLLECTION_DETAILS_BY_ID,
        bodyFormData,
      );
      console.log(" setting datas by id  is ", resp);
      if (resp.response.data.status === 200) {
        setMisCollectionValues(resp.response.data.data);
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
  };
  const columnDefs = useMemo(() => {
    const cols =
      miscReport?.miscellaneousReport?.head?.map(
        (heading: string, index: number) => ({
          headerName: heading,
          field: miscReport?.miscellaneousReport?.headers[index],
          sortable: true,
          wrapText: true,
          autoHeight: true,
        }),
      ) || [];

    // ✅ ACTIONS column
    cols.push({
      headerName: "ACTIONS",
      field: "actions",
      cellRenderer: (params: any) => {
        // ✅ hide for pinned bottom row
        if (params.node.rowPinned) return null;

        const row = params.data;

        return (
          <div className="d-flex justify-content-around gap-2 me-4">
            <div
              className="roundbtn"
              onClick={(e) => handleReceiptView(e, row.id)}
            >
              <FaEye color="#556EE6" />
            </div>

            <div
              className="roundbtn"
              onClick={() => {
                navigate(`/miscellaneous-collection/${row.id}`);
              }}
            >
              <FaEdit size={18} color="#556EE6" />
            </div>

            <div
              className="round-btn-group delete"
              onClick={(e) => handleDeleteModal(e, row.id)}
            >
              <FaTrash size={15} color="#fff" />
            </div>
          </div>
        );
      },
      sortable: false,
      filter: false,
    });
    return cols;
  }, [miscReport]);
  const createData = (count: number) => {
    // Map through the head_res array and match the footer data accordingly
    const result = [];

    for (let i = 0; i < count; i++) {
      const row = miscReport?.miscellaneousReport.headers?.reduce(
        (rowData: any, field: string) => {
          if (field === "sl_no") {
            rowData[field] = "Total";
          } else if (
            miscReport?.miscellaneousReport.footer?.hasOwnProperty(field)
          ) {
            rowData[field] = miscReport?.miscellaneousReport.footer[field];
          } else {
            // If no match, set empty string as fallback
            rowData[field] = "";
          }
          return rowData;
        },
        {},
      );

      result.push(row);
    }

    return result;
  };
  const pinnedBottomRowData = useMemo(() => {
    return createData(1);
  }, [miscReport?.miscellaneousReport.footer]);
  const getRowStyle = useCallback((params: any) => {
    if (params.node.rowPinned) {
      return {
        "font-weight": "bold",
      };
    }
    // if (params.node.lastChild) {
    //   return {
    //     "font-weight": "bold",
    //   };
    // }
    // if (params.node.rowPinned) {
    //   return { background: "#babfc7" };
    // }
  }, []);
  async function handleDelete(id: any) {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("id", id);

      let resp: any = await apiPost(
        DELETE_MISCELLANEOUS_COLLECTION,
        bodyFormData,
      );

      if (resp.response.data.status === 200 && resp.response.data.data) {
        setShow(false);

        // call again with same filters
        dispatch(tryFetchMiscellaneousReportData(miscFilters));
      } else {
        alert("Something happened please try again");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onFirstDataRendered = useCallback((params: any) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback(
    (params: any) => {
      return miscReport.miscellaneousReport;
    },
    [miscReport.miscellaneousReport],
  );

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
            <div className="ag-theme-alpine grid-table" ref={ref}>
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
                // columnDefs={miscReport?.miscellaneousReport?.head?.map(
                //   (heading: string, index: number) => ({
                //     headerName: heading,
                //     field: miscReport?.miscellaneousReport?.headers[index],
                //   }),
                // )}

                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                // onFirstDataRendered={onFirstDataRendered}
                sideBar={sideBar}
                pagination
                paginationPageSize={10}
                getRowStyle={getRowStyle}
                onGridReady={onGridReady}
                pinnedBottomRowData={pinnedBottomRowData}
              />
              {/* <div
                style={{
                  height: "500px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1, overflowY: "auto" }}>
                  <DataTable
                    columns={columns}
                    data={miscReport?.miscellaneousReport?.data || []}
                    pagination
                    highlightOnHover
                    responsive
                  />
                </div>

                <FooterRow
                  columns={columns}
                  footer={miscReport?.miscellaneousReport?.footer}
                />
              </div>
              <Overlay
                show={show}
                target={target}
                placement="left"
                container={ref}
                containerPadding={20}
              >
                <Popover id="popover-basic">
                  <Popover.Header as="h3">Confirm Delete?</Popover.Header>
                  <Popover.Body>
                    Are you sure you want to delete?
                    <div className="d-flex gap-3 mt-3">
                      <button
                        className="btn-view"
                        onClick={() => setShow(false)}
                      >
                        No
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => handleDelete(itemId)}
                      >
                        Yes
                      </button>
                    </div>
                  </Popover.Body>
                </Popover>
              </Overlay> */}
            </div>
          </Col>
        ) : (
          <Col md={12} className="loaderContainer">
            <Spinner animation="grow" variant="primary" />
          </Col>
        )}
      </Row>
      <DeleteModal
        show={show}
        onClose={() => setShow(false)}
        onConfirm={() => handleDelete(itemId)}
      />
      <MiscellaneousCollectionReceiptModal
        openModal={receiptModal}
        setOpenModal={setReceiptModal}
        closeModal={() => setReceiptModal(false)}
        receiptData={misCollectionValues}
      />
    </>
  );
}

export default MiscellaneousReport;
