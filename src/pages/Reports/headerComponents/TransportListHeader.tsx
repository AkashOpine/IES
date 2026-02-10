import { useEffect, useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { tryFetchTransportListReportData } from "../../../slices/reports/transportReportSlice";
import axios from "axios";
import { apiPost } from "../../../config/apiConfig";
import {
  CLASS_LIST,
  DIVISION_LIST,
  TRANSPORT_SETTING_ROUTE_LIST,
} from "../../../config/BaseUrl";
function TransportListHeader() {
  const dispatch = useDispatch();

  // const transportData: any = useSelector((state: any) => state.transport);

  const [classList, setClassList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [className, setClassName] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [route, setRoute] = useState("");
  const [month, setMonth] = useState([]);
  const [notUsed, setNotUsed] = useState(0);

  const handleSearch = () => {
    var data = {
      route: route,
      division: divisionName,
      class: className,
      month: month,
      notUsed: notUsed,
    };
    dispatch(tryFetchTransportListReportData(data));
  };
  const classOptions: any = classList.map((items: any) => {
    return {
      value: items.id,
      label: items.class_name,
    };
  });
  const divisionOptions: any = divisionList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });
  const routeOptions: any = routeList?.map((items: any) => {
    return {
      value: items.id,
      label: items.route,
    };
  });

  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setClassList(resp.response.data.data);
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
  }
  async function getDivisionList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(DIVISION_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setDivisionList(resp.response.data.data);
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
  }
  async function getRouteList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(TRANSPORT_SETTING_ROUTE_LIST, bodyFormData);
      console.log("route data is ", resp);
      if (resp.response.data.status == 200) {
        setRouteList(resp.response.data.data);
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
  }
  const handleClass = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setClassName(selectedValues);
  };
  const handleDivision = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setDivisionName(selectedValues);
  };
  const handleRoute = (e: any) => {
    setRoute(e.value);
  };
  const separater = useMemo(() => {
    return <div className="sep"></div>;
  }, []);
  const arrowDown = useMemo(() => {
    return (
      <div className="arrow">
        <FaChevronRight />
      </div>
    );
  }, []);
  useEffect(() => {
    getClassList();
    getDivisionList();
    getRouteList();
  }, []);

  useEffect(() => {
    console.log("setDivisionName", divisionName);
    console.log("setClassName", className);
  }, [divisionName, className]);
  const monthList = [
    {
      name: "All",
      id: "",
    },
    {
      name: "Apr",
      id: 4,
    },
    {
      name: "May",
      id: 5,
    },
    {
      name: "Jun",
      id: 6,
    },
    {
      name: "Jul",
      id: 7,
    },
    {
      name: "Aug",
      id: 8,
    },
    {
      name: "Sep",
      id: 9,
    },
    {
      name: "Oct",
      id: 10,
    },
    {
      name: "Nov",
      id: 11,
    },
    {
      name: "Dec",
      id: 12,
    },
    {
      name: "Jan",
      id: 1,
    },
    {
      name: "Feb",
      id: 2,
    },
    {
      name: "Mar",
      id: 3,
    },
    {
      name: "Apr",
      id: 13,
    },
    {
      name: "May",
      id: 14,
    },
  ];
  const monthOptions: any = monthList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });
  function handleSelectMonth(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setMonth(selectedValues);
  }

  const handleNotUsedChange = (e: any) => {
    const checked = e.target.checked;
    const newValue = checked ? 1 : 0;
    setNotUsed(newValue);
  };
  useEffect(() => {
    console.log("cehcked", notUsed);
  }, [notUsed]);

  return (
    <div className="header-items">
      <Select
        options={routeOptions}
        placeholder="Route"
        styles={customStyles}
        onChange={handleRoute}
      />
      <Select
        options={classOptions}
        placeholder="Class"
        isMulti
        styles={customStyles}
        onChange={handleClass}
      />
      <Select
        options={divisionOptions}
        placeholder="Division"
        isMulti
        styles={customStyles}
        onChange={handleDivision}
      />
      <Select
        options={monthOptions}
        placeholder="Select Month"
        styles={customStyles}
        isMulti
        onChange={handleSelectMonth}
      />
      <div className="d-flex">
        <input
          type="checkbox"
          name="notUsed"
          id="notUsed"
          style={{ marginRight: "5px" }}
          checked={notUsed === 1}
          onChange={handleNotUsedChange}
        />
        Not used
      </div>

      <button
        className="button-70"
        role="button"
        onClick={handleSearch}
        // disabled={vehicle === ""}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default TransportListHeader;
