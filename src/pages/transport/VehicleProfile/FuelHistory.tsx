import React, { useMemo } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { useSelector } from "react-redux";

function FuelHistory() {
  const data = useSelector((state: any) => state.transport?.vehicleProfileData);
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
      name: "Meter Reading",
      selector: (row: any) => row.meter_reading,
      sortable: true,
    },
    {
      name: "Fuel Quantity (Litres)",
      selector: (row: any) => row.fuel_qty + "L",
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => row.amount,
      sortable: true,
    },
  ];

  return <DataTable columns={columns} data={data.fuel} pagination />;
}

export default FuelHistory;
