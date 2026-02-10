import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { tryFetchTransportListData } from "../../../slices/transport/transportSlice";
import FuelReportHeader from "../headerComponents/FuelReportHeader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
function TransportFuelReport() {
  const transportFuelReport: any = useSelector(
    (state: any) => state.transportreport
  );
  const gridRef: any = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "date",
      headerName: "Date",
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: "vehicle_reg_no",
      headerName: "Vehicle Reg No",
      headerTooltip: "Vehicle Reg no",
    },

    {
      field: "vehicle_fuel_type",
      headerName: "Fuel Type",
      headerTooltip: "Fuel Type",
    },
    {
      field: "fuel_qty",
      headerName: "Fuel Qunatity",
      headerTooltip: "Fuel quantity",
    },
    {
      field: "amount",
      headerName: "Total Amount",
      headerTooltip: "Amount",
    },
    {
      field: "agency_name",
      headerName: "Agency",
      headerTooltip: "Agency Name",
    },
    {
      field: "meter_reading",
      headerName: "Meter Reading",
      headerTooltip: "Meter Reading",
    },
    {
      field: "driver_name",
      headerName: "Driver",
      headerTooltip: "Driver Name",
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
      return transportFuelReport.transportFuelReportData;
    },
    [transportFuelReport.transportFuelReportData]
  );
  useEffect(() => {}, [transportFuelReport.transportFuelReportData]);
  const onBtExport = useCallback(() => {
    if (transportFuelReport.transportFuelReportData.length > 0) {
      gridRef.current.api.exportDataAsExcel();
    }
  }, [transportFuelReport.transportFuelReportData]);
  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <FuelReportHeader />
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
                rowData={transportFuelReport.transportFuelReportData}
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

export default TransportFuelReport;
