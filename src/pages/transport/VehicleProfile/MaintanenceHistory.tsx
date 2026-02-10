import React, { useMemo } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useSelector } from "react-redux";
import { downloadCSV, Export } from "../../../components/ExportCsv/ExcelExport";

function MaintanenceHistory() {
  const data = useSelector(
    (state: any) => state.transport?.vehicleProfileData.repair
  );
  const columns: any = [
    {
      name: "Sl NO",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Date",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "Agency",
      selector: (row: any) => row.agency_name,
      sortable: true,
    },
    {
      name: "Driver Name",
      selector: (row: any) => row.driver_name,
      sortable: true,
    },

    {
      name: "Description",
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: "Service Type",
      selector: (row: any) => row.service_type,
      sortable: true,
    },
    {
      name: "Tax",
      selector: (row: any) => row.tax,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => row.amount,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row: any) => row.total_amount,
      sortable: true,
    },
  ];
  // const actionsMemo = React.useMemo(
  //   () => <Export onExport={() => downloadCSV(data?.repair)} />,
  //   [data.repair]
  // );
  const tableData = {
    columns,
    data,
  };
  return (
    // <DataTableExtensions {...tableData}>
    <DataTable
      // noHeader
      // // defaultSortField="id"
      // defaultSortFieldId={}
      // defaultSortAsc={false}
      pagination
      columns={columns}
      data={data}
      // actions={actionsMemo}
    />
    // </DataTableExtensions>
  );
}

export default MaintanenceHistory;
