import axios from "axios";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  DELETE_FEE_SETTINGS,
  DIVISION_LIST,
  FEE_HEAD_LIST,
  FEE_SETTINGS_LIST,
  FEE_STATUS,
  SUB_DIV_LIST,
} from "../../../config/BaseUrl";

const token = localStorage.getItem("token") as string;

export const getFeeStatusApi = async () => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    const resp: any = await apiPost(FEE_STATUS, bodyFormData);
    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }
    return []; // ✅ safe fallback
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getSubDivListApi = async () => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    const resp: any = await apiPost(SUB_DIV_LIST, bodyFormData);
    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }
    return []; // ✅ safe default
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getFeeHeadListApi = async () => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);

    const resp: any = await apiPost(FEE_HEAD_LIST, bodyFormData);

    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }

    return []; // ✅ fallback
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getClassListApi = async () => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);

    const resp: any = await apiPost(CLASS_LIST, bodyFormData);

    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getDivisionListApi = async () => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);

    const resp: any = await apiPost(DIVISION_LIST, bodyFormData);

    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getAcademicYearApi = async () => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);

    const resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);

    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getFeeSettingsListApi = async (
  academicYear: string,
  classId: string,
  divisionId: string
) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", academicYear);
    bodyFormData.append("class_id", classId);
    bodyFormData.append("division_id", divisionId);

    const resp: any = await apiPost(FEE_SETTINGS_LIST, bodyFormData);

    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteFeeSettingsApi = async (
  academicYear: string,
  Id: string
) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", academicYear);
    bodyFormData.append("fee_settings_id", Id);

    const resp: any = await apiPost(DELETE_FEE_SETTINGS, bodyFormData);

    if (resp?.response?.data?.status === 200) {
      return resp.response.data.data;
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
