import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Select, { OptionsOrGroups } from "react-select";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  DIVISION_LIST,
} from "../../../config/BaseUrl";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import {
  getAcademicYearApi,
  getClassListApi,
  getDivisionListApi,
} from "./services";
import { Button } from "react-bootstrap";

interface FeeSettingsHeaderProps {
  classId: string;
  setClassId: React.Dispatch<React.SetStateAction<string>>;
  divisionId: string;
  setDivisionId: React.Dispatch<React.SetStateAction<string>>;
  year: string | null;
  setYear: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: () => void;
  clearForm: () => void;
}
const FeeSettingsHeader: React.FC<FeeSettingsHeaderProps> = ({
  classId,
  setClassId,
  divisionId,
  setDivisionId,
  year,
  setYear,
  onSubmit,
  clearForm,
}) => {
  const [yearOptions, setYearOptions] = useState([]);
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);

  const options = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
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

  const handleYear = (e: any) => {
    setYear(e.value);
  };
  const handleClass = (e: any) => {
    setClassId(e.value);
  };
  const handleDivision = (e: any) => {
    setDivisionId(e.value);
  };

  useEffect(() => {
    getClassListApi().then(setClassList).catch(console.error);

    getDivisionListApi().then(setDivisionList).catch(console.error);

    getAcademicYearApi().then(setYearOptions).catch(console.error);
  }, []);

  return (
    <div className="header-items">
      <Select
        options={options}
        placeholder="Select year"
        styles={customStyles}
        onChange={handleYear}
        value={options.filter((option) => option.value === year)}
      />

      <Select
        options={classOptions}
        placeholder="Class"
        styles={customStyles}
        onChange={handleClass}
      />
      <Select
        options={divisionOptions}
        placeholder="Division"
        styles={customStyles}
        onChange={handleDivision}
      />
    </div>
  );
};

export default FeeSettingsHeader;
