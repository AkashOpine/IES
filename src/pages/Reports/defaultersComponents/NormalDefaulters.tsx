import { AgGridReact } from "ag-grid-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { onBtExport } from "../headerComponents/ExportExcel";
import { CustomHeader } from "./customeHeader";

function NormalDefaulters() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [gridApi, setGridApi] = useState(null);
  // const columnDefs = paymentReport.newDefaultersReportData?.heads?.map((items: any) => {
  //   return {
  //     headerName: items,
  //   };
  // });
  // const columnDefs = [
  //   {
  //     headerName: "Sl.No",
  //     valueGetter: (params: any) => params.node.rowIndex + 1,
  //     width: 120,
  //     headerCheckboxSelection: true,
  //     checkboxSelection: true,
  //     headerTooltip: "Serial Number",
  //   },
  //   {
  //     headerName: "Student Name",
  //     field: "student_name",
  //   },
  //   {
  //     headerName: "ADMN No",
  //     field: "old_admission_no",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Class",
  //     valueGetter: (params: any) =>
  //       params.data.class + " " + params.data.division,
  //     headerTooltip: "Class",
  //     width: 90,
  //   },
  //   {
  //     headerName: "June",
  //     width: 100,
  //     field: "June_balance",
  //     // cellRenderer: renderColumn2,

  //     // valueGetter: (params: any) => getCellValue(params),
  //     // cellStyle: (params: any) => getCellStyle(params),
  //   },
  //   {
  //     headerName: "July",
  //     width: 100,
  //     field: "July_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "August",
  //     field: "August_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "September",
  //     field: "September_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "October",
  //     field: "October_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "November",
  //     field: "November_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "December",
  //     field: "December_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "January",
  //     field: "January_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "Febraury",
  //     field: "February_balance",
  //   },
  //   {
  //     width: 100,
  //     headerName: "March",
  //     field: "March_balance",
  //   },
  //   // {
  //   //   width: 100,
  //   //   headerName: "Previous",
  //   //   field: "old_admission_no",
  //   // },
  //   {
  //     width: 100,
  //     headerName: "Total",
  //     field: "bal_amt",
  //   },
  //   // {
  //   //   headerName: "Mobile No",
  //   //   field: "old_admission_no",
  //   // },
  // ];
  function renderColumn2(params: any) {
    if (params.value === null || params.value === 0 || params.value === "") {
      return null;
    } else {
      return <span>{params.value}</span>;
    }
  }
  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    []
  );
  // const getCellValue = (params: any) => {
  //   const value = params.value;
  //   return value !== null && value !== undefined && value !== "" && value !== 0
  //     ? value
  //     : "";
  // };
  // const getCellStyle = (params: any) => {
  //   return { display: params.value === "" ? "none" : "initial" };
  // };
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
  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };
  // useEffect(() => {
  //   console.log("normal defaulteres report", paymentReport);
  // }, [paymentReport.newDefaultersReportData]);
  const getRowStyle = useCallback((params: any) => {
    if (params.node.rowPinned) {
      return {
        "font-weight": "bold",
      };
    }
  }, []);
  // const footerData = [paymentReport.newDefaultersReportData?.foot]?.map(
  //   (footerRow) => {
  //     return {
  //       totalLabel: "Total",
  //       ...paymentReport?.newDefaultersReportData?.heads?.reduce(
  //         (rowData: any, field: any, index: any) => {
  //           rowData[field] = footerRow[field];
  //           return rowData;
  //         },
  //         {}
  //       ),
  //     };
  //   }
  // )[0];
  const createData = (count: any) => {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        mobile: paymentReport.newDefaultersReportData?.foot ? "Total" : "",
        fee_amt: paymentReport.newDefaultersReportData?.foot?.["fee_amt"],
        extra_concession:
          paymentReport.newDefaultersReportData?.foot?.["extra_concession"],
        demand_amt: paymentReport.newDefaultersReportData?.foot?.["demand_amt"],
        paid_amt: paymentReport.newDefaultersReportData?.foot?.["paid_amt"],
        bal_amt: paymentReport.newDefaultersReportData?.foot?.["bal_amt"],
        May_bal: paymentReport.newDefaultersReportData?.foot?.["May_bal"],
        June_bal: paymentReport.newDefaultersReportData?.foot?.["June_bal"],
        August_bal: paymentReport.newDefaultersReportData?.foot?.["August_bal"],
        July_bal: paymentReport.newDefaultersReportData?.foot?.["July_bal"],
        September_bal:
          paymentReport.newDefaultersReportData?.foot?.["September_bal"],
        October_bal:
          paymentReport.newDefaultersReportData?.foot?.["October_bal"],
        November_bal:
          paymentReport.newDefaultersReportData?.foot?.["November_bal"],
        December_bal:
          paymentReport.newDefaultersReportData?.foot?.["December_bal"],
        January_bal:
          paymentReport.newDefaultersReportData?.foot?.["January_bal"],
        February_bal:
          paymentReport.newDefaultersReportData?.foot?.["February_bal"],
        March_bal: paymentReport.newDefaultersReportData?.foot?.["March_bal"],
        April_bal: paymentReport.newDefaultersReportData?.foot?.["April_bal"],
        Demand_May: paymentReport.newDefaultersReportData?.foot?.["Demand_May"],
        Paid_May: paymentReport.newDefaultersReportData?.foot?.["Paid_May"],
        Bal_May: paymentReport.newDefaultersReportData?.foot?.["Bal_May"],
        Demand_June:
          paymentReport.newDefaultersReportData?.foot?.["Demand_June"],
        Paid_June: paymentReport.newDefaultersReportData?.foot?.["Paid_June"],
        Bal_June: paymentReport.newDefaultersReportData?.foot?.["Bal_June"],
        Demand_August:
          paymentReport.newDefaultersReportData?.foot?.["Demand_August"],
        Paid_August:
          paymentReport.newDefaultersReportData?.foot?.["Paid_August"],
        Bal_August: paymentReport.newDefaultersReportData?.foot?.["Bal_August"],
        Demand_July:
          paymentReport.newDefaultersReportData?.foot?.["Demand_July"],
        Paid_July: paymentReport.newDefaultersReportData?.foot?.["Paid_July"],
        Bal_July: paymentReport.newDefaultersReportData?.foot?.["Bal_July"],
        Demand_September:
          paymentReport.newDefaultersReportData?.foot?.["Demand_September"],
        Paid_September:
          paymentReport.newDefaultersReportData?.foot?.["Paid_September"],
        Bal_September:
          paymentReport.newDefaultersReportData?.foot?.["Bal_September"],
        Demand_October:
          paymentReport.newDefaultersReportData?.foot?.["Demand_October"],
        Paid_October:
          paymentReport.newDefaultersReportData?.foot?.["Paid_October"],
        Bal_October:
          paymentReport.newDefaultersReportData?.foot?.["Bal_October"],
        Demand_November:
          paymentReport.newDefaultersReportData?.foot?.["Demand_November"],
        Paid_November:
          paymentReport.newDefaultersReportData?.foot?.["Paid_November"],
        Bal_November:
          paymentReport.newDefaultersReportData?.foot?.["Bal_November"],
        Demand_December:
          paymentReport.newDefaultersReportData?.foot?.["Demand_December"],
        Paid_December:
          paymentReport.newDefaultersReportData?.foot?.["Paid_December"],
        Bal_December:
          paymentReport.newDefaultersReportData?.foot?.["Bal_December"],
        Demand_January:
          paymentReport.newDefaultersReportData?.foot?.["Demand_January"],
        Paid_January:
          paymentReport.newDefaultersReportData?.foot?.["Paid_January"],
        Bal_January:
          paymentReport.newDefaultersReportData?.foot?.["Bal_January"],
        Demand_February:
          paymentReport.newDefaultersReportData?.foot?.["Demand_February"],
        Paid_February:
          paymentReport.newDefaultersReportData?.foot?.["Paid_February"],
        Bal_February:
          paymentReport.newDefaultersReportData?.foot?.["Bal_February"],
        Demand_March:
          paymentReport.newDefaultersReportData?.foot?.["Demand_March"],
        Paid_March: paymentReport.newDefaultersReportData?.foot?.["Paid_March"],
        Bal_March: paymentReport.newDefaultersReportData?.foot?.["Bal_March"],
        Demand_April:
          paymentReport.newDefaultersReportData?.foot?.["Demand_April"],
        Paid_April: paymentReport.newDefaultersReportData?.foot?.["Paid_April"],
        Bal_April: paymentReport.newDefaultersReportData?.foot?.["Bal_April"],
      });
    }
    return result;
  };
  const pinnedBottomRowData = useMemo(() => {
    return createData(1);
  }, [paymentReport.newDefaultersReportData?.foot]);
  return (
    <Row className="tab-content">
      {!paymentReport.isLoading ? (
        <Col md={12}>
          <div className="ag-theme-alpine dcb-grid-table">
            <div className="btn-export mt-2">
              <button
                onClick={() =>
                  onBtExport(paymentReport.newDefaultersReportExcel)
                }
                disabled={paymentReport.newDefaultersReportExcel === ""}
              >
                <FaDownload /> <span>Export to excel</span>
              </button>
            </div>
            <AgGridReact
              columnDefs={paymentReport.newDefaultersReportData?.header?.map(
                (heading: string, index: number) => ({
                  headerName: heading,
                  field: paymentReport.newDefaultersReportData?.heads[index],
                })
              )}
              rowData={
                paymentReport.newDefaultersReportData?.result
                  ? paymentReport.newDefaultersReportData?.result
                  : []
              }
              // columnDefs={paymentReport.newDefaultersReportData?.heads?.map(
              //   (heading: string, index: number) => ({
              //     headerName:
              //       paymentReport.newDefaultersReportData?.header[index], // Match header with corresponding heading
              //     field: heading, // Use the heading as the field name
              //   })
              // )}
              // rowData={
              //   paymentReport.newDefaultersReportData?.result
              //     ? paymentReport.newDefaultersReportData?.result.map(
              //         (dataItem: any) => {
              //           // Map the data fields to match the column definitions
              //           return paymentReport.newDefaultersReportData?.heads.map(
              //             (fieldName: string) => dataItem[fieldName]
              //           );
              //         }
              //       )
              //     : []
              // }
              onGridReady={onGridReady}
              ref={gridRef}
              animateRows={true}
              suppressRowClickSelection={true}
              defaultColDef={defaultColDef}
              sideBar={sideBar}
              getRowStyle={getRowStyle}
              rowClassRules={{
                "total-row": (params) => {
                  return params.node.rowPinned === "bottom";
                },
              }}
              pinnedBottomRowData={pinnedBottomRowData}
              // pinnedBottomRowData={[footerData]}
            />
          </div>
        </Col>
      ) : (
        <Col md={12} className="loaderContainer">
          <Spinner animation="grow" variant="primary" />
        </Col>
      )}
    </Row>
  );
}

export default NormalDefaulters;
