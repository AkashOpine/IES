let baseUrl = "https://www.educationerp.in/IES/index.php/m_api/";
// let baseUrl = "https://www.educationerp.in/TEST/index.php/m_api/";
// let baseUrl = "https://www.educationerp.in/MSV/index.php/m_api/";

// let baseUrl = "https://educationerp.in/bvbponnani/index.php/m_api/";
// let baseUrl = "https://educationerp.in/bhavans/index.php/m_api/";
// let baseUrl = "https://educationerp.in/pottore/index.php/m_api/";
// let baseUrl = "https://educationerp.in/harisri/index.php/m_api/";
// let baseUrl = "https://educationerp.in/svn/index.php/m_api/";

export const LOGIN = baseUrl + "api_c/login";
export const FORGOT_PASSWORD_MAIL_SEND = baseUrl + "api_c/forget_password";
export const CLASS_LIST = baseUrl + "fee_c/class_list";
export const DIVISION_LIST = baseUrl + "fee_c/division_list";
export const CHECK_FINE = baseUrl + "fee_c/check_fine";
export const FEE_TABLE_DATA = baseUrl + "fee_c/fee_data";
export const STUDENT_LIST = baseUrl + "fee_c/student_list";
export const CLASS_WISE_STUDENT_LIST = baseUrl + "fee_c/classwise_student_list";
export const CLASS_WISE_STUDENT_LIST_UPDATED =
  baseUrl + "fee_c/classwise_student_list_dcb";
export const PAY_FEES = baseUrl + "fee_c/save_feecollection";
export const GENERATE_SLIP = baseUrl + "fee_c/generate_payslip";
export const AUTOCOMPLTE_SEARCH = baseUrl + "fee_c/student_list_new";
export const FEE_HISTORY = baseUrl + "fee_c/payment_history";
export const ACADEMIC_YEAR = baseUrl + "fee_c/academic_year";
export const PAYMENT_REPORT = baseUrl + "fee_c/payment_report";
export const DCB_REPORT = baseUrl + "fee_c/dcb_report";
export const DEFAULTERS_REPORT = baseUrl + "fee_c/defaulters_list";
export const SUMMARY_REPORT = baseUrl + "fee_c/summery_report";
export const STANDARD_REPORT = baseUrl + "fee_c/standared_report";
export const DETAILED_REPORT = baseUrl + "fee_c/detailed_report";
export const TRANSPORT_SETTING = baseUrl + "fee_c/transport_settings_edit";
export const UPDATE_TRANSPORT_SETTING =
  baseUrl + "fee_c/save_transport_settings_edit";
export const TRANSPORT_SETTING_ROUTE_LIST = baseUrl + "fee_c/route_list";
export const TRANSPORT_SETTING_PICKUP_LIST = baseUrl + "fee_c/pickup_list";
export const MANAGEMENT_DASHBOARD = baseUrl + "manager_c/generate_dashboard";
export const MANAGEMENT_DASHBOARD_NEW =
  baseUrl + "manager_c/generate_fee_dashboard";
export const MANAGEMENT_DASHBOARD_BACKEND_API =
  baseUrl + "manager_c/academic_fee_dashboard";
export const TRANSPORT_LIST = baseUrl + "transport_c/vehicle_list";
export const FUEL_TYPE_LIST = baseUrl + "admin_c/vehicle_fuel_type_list";
export const VEHICLE_CATEGORY_LIST = baseUrl + "admin_c/vehicle_category_list";
export const VEHICLE_TYPE_LIST = baseUrl + "admin_c/vehicle_type_list";
export const VEHICLE_USAGE_TYPE_LIST =
  baseUrl + "admin_c/vehicle_usage_type_list";
export const ADD_VEHICLE = baseUrl + "transport_c/add_vehicle";
export const PAYMENT_MODE_REPORT = baseUrl + "fee_c/payment_mode_report";
export const HEAD_WISE_REPORT = baseUrl + "fee_c/headwise_report";
export const DETAILED_FEE_REPORT = baseUrl + "fee_c/deatiled_fee_report";
export const TRANSPORT_STUDENT_LIST = baseUrl + "fee_c/transport_list";
export const TRANSPORT_DEFAULTERS_REPORT =
  baseUrl + "fee_c/trans_defaulters_list";
export const HOSTEL_DEFAULTERS_REPORT =
  baseUrl + "fee_c/hostel_defaulters_list";
export const DRIVER_LIST = baseUrl + "transport_c/driver_list/";
export const ADD_DRIVER = baseUrl + "transport_c/add_driver/";
export const STUDENT_CONCESSION_LIST =
  baseUrl + "fee_c/list_concession_students";
export const CONCESSION_TYPE_LIST = baseUrl + "fee_c/concession_type_list";
export const ADD_STUDENT_CONCESSION = baseUrl + "fee_c/add_concession";
export const ADD_TRANSPORT_FUEL = baseUrl + "transport_c/add_maintenance_fuel";
export const ADD_TRANSPORT_REPAIR =
  baseUrl + "transport_c/add_maintenance_repair";
export const PICKUP_POINT_LIST = baseUrl + "transport_c/pickup_point_list";
export const ADD_PICKUP_POINT = baseUrl + "transport_c/add_pickup_point";
export const EDIT_PICKUP_POINT = baseUrl + "transport_c/edit_pickup_point";
export const ROUTE_LIST = baseUrl + "transport_c/route_list";
export const ADD_ROUTE = baseUrl + "transport_c/add_route";
export const ROUTE_BY_ID = baseUrl + "transport_c/route_details";
export const MISCELLANEOUS_SETTING_LIST = baseUrl + "fee_c/mis_fee_list";
export const ADD_MISCELLANEOUS_SETTING = baseUrl + "fee_c/add_miss_feesettings";
export const ADD_MISCELLANEOUS_COLLECTION =
  baseUrl + "fee_c/save_mis_fee_collection";
export const DELETE_MISCELLANEOUS_SETTING =
  baseUrl + "fee_c/delete_miss_feesettings";
export const MISCELLANEOUS_SETTING_BY_ID =
  baseUrl + "fee_c/miss_feesettings_byid";
export const EDIT_MISCELLANEOUS_SETTING =
  baseUrl + "fee_c/update_miss_feesettings";
export const GENERATE_MISCELLANEOUS_COLLECTION_RECEIPT =
  baseUrl + "fee_c/mis_receipt_details";
export const MISCELLANEOUS_COLLECTION_DETAILS_BY_ID =
  baseUrl + "fee_c/miss_fee_details";
export const DELETE_MISCELLANEOUS_COLLECTION =
  baseUrl + "fee_c/delete_mis_fee_collection";
export const UPDATE_MISCELLANEOUS_COLLECTION =
  baseUrl + "fee_c/update_miss_feecollection";
export const TRANSPORT_FUEL_FILLING_REPORT =
  baseUrl + "transport_c/vehicle_fuel_filling_report";
export const TRANSPORT_MAINTANENCE_REPORT =
  baseUrl + "transport_c/vehicle_maintenance_report";
export const TRANSPORT_PROFILE_DATA = baseUrl + "transport_c/vehicle_details";
export const DRIVER_PROFILE_DATA = baseUrl + "transport_c/driver_details";
export const FUEL_LIST_DATA = baseUrl + "transport_c/maintenance_fuel_list";
export const REPAIR_LIST_DATA = baseUrl + "transport_c/maintenance_repair_list";
export const REPAIR_BY_ID = baseUrl + "transport_c/maintenance_repair_details/";

export const NEW_DEFAULTER_REPORT = baseUrl + "reports_c/defaulters_list_new";
export const NEW_DEFAULTER_REPORT_WITH_DCB =
  baseUrl + "reports_c/defaulters_list_dcb";
export const FUEL_BY_ID = baseUrl + "transport_c/maintenance_fuel_details";
export const VEHICLE_PROFILE_EDIT = baseUrl + "transport_c/edit_vehicle";
export const PICKUP_POINT_BY_ID = baseUrl + "transport_c/pickup_point_details";
export const PICKUP_POINT_DELETE = baseUrl + "transport_c/delete_pickup_point/";
export const ROUTE_DELETE = baseUrl + "transport_c/delete_route/";
export const FUEL_DELETE = baseUrl + "transport_c/delete_maintenance_fuel/";
export const REPAIR_DELETE = baseUrl + "transport_c/delete_maintenance";
export const VEHICLE_DELETE = baseUrl + "transport_c/delete_vehicle/";
export const DRIVER_DELETE = baseUrl + "transport_c/delete_driver/";
export const TRANSPORT_FEE_SETTINGS_LIST = baseUrl + "fee_c/all_transport_list";
export const ADD_TRANSPORT_INDIVIDUAL_FEE =
  baseUrl + "fee_c/add_transport_settings_single";
export const UPDATE_DRIVER = baseUrl + "transport_c/add_driver/";
export const TRANSPORT_DISCONTINUE =
  baseUrl + "transport_c/transport_discontinue";
export const CONSOLIDATED_REPORT =
  baseUrl + "reports_c/consolidation_receipt_report";
export const NEW_DEFAULTER_REPORT_WITH_DATE =
  baseUrl + "reports_c/defaulters_list_of_date";

export const TRANSPORT_MONTH_DELETE =
  baseUrl + "fee_c/delete_transport_settings_edit";
export const TRANSPORT_LIST_REPORT =
  baseUrl + "transport_c/transport_list_report";

export const FEE_DEFAULTERS = baseUrl + "reports_c/fee_defaulters_monthwise";
export const CONCESSION_STUDENT_DELETE =
  baseUrl + "fee_c/concession_student__delete";
export const CONCESSION_REPORT =
  baseUrl + "staff_concession_c/staff_concession_report";
export const MISCELLANEOUS_REPORT = baseUrl + "fee_c/mis_report";
export const DAILY_FEE_COLLECTION_REPORT =
  baseUrl + "fee_c/daily_fee_collecion";
export const CONSOLIDATED_PAYMENT_HISTORY_REPORT =
  baseUrl + "reports_c/consolidation_payment_history";
export const HOSTEL_STUDENT_LIST =
  baseUrl + "hostel_c/std_list_hostel_settings";
export const HOSTEL_SETTING_LIST =
  baseUrl + "hostel_c/list_hostel_settings_bytype";
export const HOSTEL_ROOM_TYPE = baseUrl + "hostel_c/room_type";
export const HOSTEL_TYPE_LIST = baseUrl + "hostel_c/hostel_type";
export const ADD_STUDENT_HOSTEL_SETTING =
  baseUrl + "hostel_c/add_std_hostel_settings";
export const EDIT_STUDENT_HOSTEL_SETTING =
  baseUrl + "hostel_c/edit_std_hostel_settings";
export const HOSTEL_LIST_REPORT = baseUrl + "hostel_c/hostel_list_report";
export const HOSTEL_SETTINGS_DETAILS_BY_ID =
  baseUrl + "hostel_c/hostel_settings_details";
export const HOSTEL_ID_DEACTIVATE = baseUrl + "hostel_c/hostel_inactivate";
export const HOSTEL_ID_DISCONTINUE = baseUrl + "hostel_c/hostel_discountinue";
export const CONSOLIDATED_PAYMENT_HISTORY_SEARCH =
  baseUrl + "fee_c/student_list_receipt";
export const TRANSPORT_FEE_COLLECTION_REPORT =
  baseUrl + "fee_c/transport_fee_collecion";
export const PRE_REGISTRATION_LIST =
  baseUrl + "office_admin_c/pending_pre_registration_list";
export const ADD_PRE_REGISTRATION =
  baseUrl + "office_admin_c/save_pre_registration";

export const UPDATE_PRE_REGISTRATION =
  baseUrl + "office_admin_c/update_pre_registration_details";

export const APPROVE_PRE_REGISTRATION =
  baseUrl + "office_admin_c/approve_student_admission";
export const PRE_REGISTRATION_RECIEPT = baseUrl + "office_admin_c/view_receipt";
export const PRE_REGISTRATION_REPORT =
  baseUrl + "office_admin_c/pre_registration_report";
export const ADMISSION_REPORT = baseUrl + "office_admin_c/admission_report";
export const PRE_REGISTRATION_STUDENT_REPORT =
  baseUrl + "office_admin_c/pre_registration_student_report";
export const TERMWISE_SUMMARY = baseUrl + "manager_c/generate_termwise_summary";
export const CONCESSION_LIST = baseUrl + "fee_c/make_concession";
export const ADMISSION_NUMBER = baseUrl + "office_admin_c/get_admission_no";
export const SET_CONCESSION = baseUrl + "fee_c/save_concession_amount";

export const FEE_HEAD_LIST = baseUrl + "fee_c/feehead_list";
export const ADD_FEE_HEAD = baseUrl + "fee_c/save_feehead";
export const EDIT_FEE_HEAD = baseUrl + "fee_c/save_feehead";
export const DELETE_FEE_HEAD = baseUrl + "fee_c/delete_feehead";

export const SUB_DIV_LIST = baseUrl + "common_c/sub_division_list";
export const FEE_SETTINGS_LIST = baseUrl + "fee_c/feesettings_list";
export const FEE_STATUS = baseUrl + "fee_c/fee_status";
export const SET_FEE_SETTINGS = baseUrl + "fee_c/save_fee_settings";
export const DELETE_FEE_SETTINGS = baseUrl + "fee_c/delete_fee_settings";

//dcb reports

export const ACADEMIC_DETAIL_DCB = baseUrl + "reports_c/academic_fee_dcb";
export const ACADEMIC_CLASS_WISE_DCB =
  baseUrl + "reports_c/classwise_academic_fee_dcb";
export const ACADEMIC_CONSOLIDATED_DCB =
  baseUrl + "reports_c/termwise_academic_fee_dcb";
export const ACADEMIC_DEFAULTERS =
  baseUrl + "reports_c/academic_fee_defaulters";

export const TRANSPORT_DETAIL_DCB = baseUrl + "reports_c/transport_fee_dcb";
export const TRANSPORT_ROUTE_WISE_DCB =
  baseUrl + "reports_c/routewise_transport_fee_dcb";
export const TRANSPORT_CONSOLIDATED_DCB =
  baseUrl + "reports_c/termwise_transport_fee_dcb";

export const HOSTEL_DETAIL_DCB = baseUrl + "reports_c/hostel_fee_dcb";
export const HOSTEL_TYPE_WISE_DCB =
  baseUrl + "reports_c/typewise_hostel_fee_dcb";
export const HOSTEL_CONSOLIDATED_DCB =
  baseUrl + "reports_c/termwise_hostel_fee_dcb";

export const HOSTEL_FEE_TYPES = baseUrl + "reports_c/getHotelFeeHeads";

export const PRINT_DUE_CLEARANCE_FORM = baseUrl + "fee_c/due_certificate";


export const PAY_FEES_PARTIAL = baseUrl + "fee_c/save_feecollection_new";
