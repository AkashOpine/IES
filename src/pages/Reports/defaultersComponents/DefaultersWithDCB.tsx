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
import { CustomHeader } from "./customeHeader";
import { onBtExport } from "../headerComponents/ExportExcel";

function DefaultersWithDCB() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const gridRef: any = useRef();
  const [gridApi, setGridApi] = useState(null);
  // const columns = [
  //   {
  //     header: "student_name",
  //   },
  //   {
  //     header: "adminssion number",
  //   },
  //   {
  //     header: "June",
  //     children: [
  //       {
  //         header: "Demand",
  //       },
  //       {
  //         header: "Collection",
  //       },
  //       {
  //         header: "Balance",
  //       },
  //     ],
  //   },
  //   {
  //     header: "July",
  //     children: [
  //       {
  //         header: "Demand",
  //       },
  //       {
  //         header: "Collection",
  //       },
  //       {
  //         header: "Balance",
  //       },
  //     ],
  //   },
  // ];
  // const columnDefs = [
  //   {
  //     headerName: "Sl.no",
  //     valueGetter: (params: any) => {
  //       return params.node ? params.node.rowIndex + 1 : null;
  //     },
  //     width: 110,
  //     headerCheckboxSelection: true,
  //     checkboxSelection: true,
  //     headerTooltip: "Serial Number",
  //   },
  //   {
  //     headerName: "Student Name",
  //     field: "student_name",
  //   },
  //   {
  //     headerName: "Adm No",
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
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "June_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "June_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "June_balance",
  //         width: 100,
  //       },
  //     ],
  //   },
  //   {
  //     headerName: "July",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "July_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "July_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "July_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "August",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "August_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "August_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "August_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "September",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "September_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "September_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "September_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "October",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "October_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "October_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "October_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "November",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "November_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "November_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "November_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "December",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "December_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "December_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "December_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "January",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "January_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "January_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "January_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "Febraury",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "February_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "February_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "February_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   {
  //     headerName: "March",
  //     children: [
  //       {
  //         headerName: "Demand",
  //         field: "March_demand",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Collection",
  //         field: "March_collection",
  //         width: 100,
  //       },
  //       {
  //         headerName: "Balance",
  //         field: "March_balance",
  //         width: 100,
  //       },
  //     ],
  //     gridLineDash: [3, 3],
  //     gridLineDashColor: "#ddd",
  //   },
  //   // {
  //   //   headerName: "Parent Name",
  //   //   field: "parent_name",
  //   // },
  //   // {
  //   //   headerName: "Mobile No",
  //   //   field: "mobile_no",
  //   // },
  // ];

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
  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };
  // useEffect(() => {
  //   console.log("payment report", paymentReport);
  // }, [paymentReport.newDefaultersWithDCBReportData]);
  // const onBtExport = useCallback(() => {
  //   if (paymentReport.newDefaultersWithDCBReportData.length > 0) {
  //     gridRef.current.api.exportDataAsExcel();
  //   }
  // }, [paymentReport.newDefaultersWithDCBReportData]);

  const footerData = [paymentReport.newDefaultersReportData?.dcbfoot]?.map(
    (footerRow) => {
      return {
        totalLabel: "Total",
        ...paymentReport.newDefaultersReportData?.dcbheads?.reduce(
          (rowData: any, field: any, index: any) => {
            rowData[field] = footerRow[field];
            return rowData;
          },
          {}
        ),
      };
    }
  )[0];
  const getRowStyle = useCallback((params: any) => {
    if (params.node.rowPinned) {
      return {
        "font-weight": "bold",
      };
    }
  }, []);
  return (
    <Row className="tab-content">
      {!paymentReport.isLoading ? (
        <Col md={12}>
          <div className="ag-theme-alpine dcb-grid-table">
            <div className="btn-export mt-2">
              <button
                onClick={() =>
                  onBtExport(paymentReport.newDefaultersWithDCBReportData.excel)
                }
              >
                <FaDownload /> <span>Export to excel</span>
              </button>
            </div>
            <AgGridReact
              // columnDefs={columnDefs}
              // rowData={paymentReport.newDefaultersWithDCBReportData}
              // columnDefs={columns?.map((item: any) => ({
              //   headerName: item.header,
              //   children: item.children?.map((items: any) => ({
              //     headerName: items.header,
              //   })),
              // }))}
              columnDefs={paymentReport.newDefaultersReportData?.dcbheader?.map(
                (heading: string, index: number) => ({
                  headerName: heading,
                  field: paymentReport.newDefaultersReportData?.dcbheads[index],
                })
              )}
              rowData={
                paymentReport.newDefaultersReportData?.dcbresult
                  ? paymentReport.newDefaultersReportData?.dcbresult
                  : []
              }
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

export default DefaultersWithDCB;
