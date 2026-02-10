import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import DcbReportHeader from "../headerComponents/DcbReportHeader";
import { FaDownload } from "react-icons/fa";
import { tryFetchTransportListData } from "../../../slices/transport/transportSlice";
import TransportListHeader from "../headerComponents/TransportListHeader";
import { onBtExport } from "../headerComponents/ExportExcel";

function TransportListReport() {
  const dispatch = useDispatch();
  const transportDefaultersReport: any = useSelector(
    (state: any) => state.transportreport
  );
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Sl.No",
      field: "slno",
      // valueGetter: (params: any) => params.node.rowIndex + 1,
      width: 125,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerTooltip: "Serial Number",
    },
    {
      field: "old_admission_no",
      headerName: "Admission.no",
      headerTooltip: "Admission.no",
    },
    {
      field: "student_name",
      headerName: "Student Name",
      headerTooltip: " Student Name",
    },
    {
      field: "class_name",
      headerName: "Class ",
      headerTooltip: "Class Name",
    },
    {
      field: "division_name",
      headerName: "Division",
      headerTooltip: "Division",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      headerTooltip: "Mobile",
    },
    {
      field: "route",
      headerName: "Route",
      headerTooltip: "Route",
    },
    {
      field: "pick_up_point",
      headerName: "Pick up Point",
      headerTooltip: "Pick up Point",
    },
    {
      field: "fee_amount",
      headerName: "Amount",
      headerTooltip: "Amount",
    },
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

  const onGridReady = useCallback(
    (params: any) => {
      return transportDefaultersReport.transportListReportData?.data?.details;
    },
    [transportDefaultersReport.transportListReportData?.data?.details]
  );
  useEffect(() => {}, [
    transportDefaultersReport.transportListReportData?.data?.details,
  ]);
  // const onBtExport = useCallback(() => {
  //   if (transportDefaultersReport.transportListReportData?.data?.details.length > 0) {
  //     gridRef.current.api.exportDataAsExcel();
  //   }
  // }, [transportDefaultersReport.transportListReportData?.data?.details]);

  const createData = (count: any) => {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        "Sl.No": "Total",
        pick_up_point: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total
          ? "Total"
          : "",
        fee_amount:
          transportDefaultersReport?.transportListReportData?.data?.grand_total
            ?.fee_amount,
        May: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.May,
        Jun: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Jun,
        Jul: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Jul,
        Aug: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Aug,
        Sep: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Sep,
        Oct: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Oct,
        Nov: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Nov,
        Dec: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Dec,
        Jan: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Jan,
        Feb: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Feb,
        Mar: transportDefaultersReport?.transportListReportData?.data
          ?.grand_total?.Mar,
      });
      // console.log("result", result);
    }
    return result;
  };
  const pinnedBottomRowData = useMemo(() => {
    return createData(1);
  }, [transportDefaultersReport.transportListReportData?.data?.grand_total]);
  const getRowStyle = useCallback((params: any) => {
    if (params.node.rowPinned) {
      return {
        "font-weight": "bold",
      };
    }
  }, []);
  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <TransportListHeader />
        </Col>
      </Row>
      <Row className="mt-2">
        {!transportDefaultersReport.isLoading ? (
          <Col md={12}>
            <div className="ag-theme-alpine grid-table">
              <div className="btn-export">
                <button
                  onClick={() =>
                    onBtExport(
                      transportDefaultersReport?.transportListReportData?.excel
                    )
                  }
                >
                  <FaDownload /> <span>Export to excel</span>
                </button>
              </div>
              <AgGridReact
                ref={gridRef}
                rowData={
                  transportDefaultersReport?.transportListReportData?.data
                    ?.details
                    ? transportDefaultersReport?.transportListReportData?.data
                        ?.details
                    : []
                }
                // columnDefs={columnDefs}
                columnDefs={transportDefaultersReport.transportListReportData?.data?.header?.map(
                  (heading: string, index: number) => ({
                    headerName: heading,
                    field:
                      transportDefaultersReport.transportListReportData?.data
                        ?.heads[index],
                  })
                )}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                defaultColDef={defaultColDef}
                getRowStyle={getRowStyle}
                sideBar={sideBar}
                pagination
                onGridReady={onGridReady}
                pinnedBottomRowData={pinnedBottomRowData}
              />
            </div>
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

export default TransportListReport;
