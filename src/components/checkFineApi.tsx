import axios from "axios";
import { apiPost } from "../config/apiConfig";
import { CHECK_FINE } from "../config/BaseUrl";

export async function handleCalculateFine(
  feesData: {
    feeData: {
      academic_year: string | Blob;
      student_details: { student_id: string | Blob };
    };
    hostel_details: { fee_settings_id: string | Blob };
  },
  academicCombinedArray: { toString: () => string | Blob },
  busFeeCombinedArray: { toString: () => string | Blob },
  hostelFeeCombinedArray: { toString: () => string | Blob },

  diaryFeeCombinedArray: { toString: () => string | Blob }
) {
  var fine = 0;
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", feesData.feeData?.academic_year);
    bodyFormData.append(
      "student_id",
      feesData.feeData.student_details?.student_id
    );
    bodyFormData.append("month_arr", academicCombinedArray.toString());
    bodyFormData.append("tmonth_arr", busFeeCombinedArray.toString());
    bodyFormData.append("hmonth_arr", hostelFeeCombinedArray.toString());
    bodyFormData.append("emonth_arr", diaryFeeCombinedArray.toString());
    bodyFormData.append(
      "hostel_feesettings",
      feesData.hostel_details ? feesData.hostel_details.fee_settings_id : ""
    );

    let resp: any = await apiPost(CHECK_FINE, bodyFormData);

    if (resp.response.data.status === 200) {
      fine = resp.response.data.data.Fine;
      // setFine(resp.response.data.data.Fine);
      // setShow(true);
    }
    console.log("RESPONSE FINE", resp);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // setIsLoading(false);
      console.log("error message: ", error.message);
      return error.message;
    } else {
      // setIsLoading(false);
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
  console.log("fine is", fine);
  return fine;
}
