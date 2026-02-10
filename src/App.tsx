import React from "react";
import logo from "./logo.svg";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import "./App.scss";
import { HomeLayout } from "./components/layout/homeLayout";
import { ProtectedLayout } from "./components/layout/protectedLayout";
import { LandingPage } from "./pages/landingPage";
import Dashboard from "./pages/dashboard/dashboard";

import FeeHistory from "./pages/students/FeeHistory";
import ClassWiseSearchList from "./pages/students/ClassWiseSearchList";

import MainDashBoard from "./pages/dashboard/MainDashBoard";
import PaymentReport from "./pages/Reports/PaymentReport";
import CautionDeposit from "./pages/Reports/DailySummary";
import PaymentMode from "./pages/Reports/PaymentMode";
import DCB from "./pages/Reports/DCB";
import Concession from "./pages/Reports/Concession";
import DetailedFeeCollection from "./pages/Reports/DetailedFeeCollection";
import HeadWise from "./pages/Reports/HeadWise";
import Defaulters from "./pages/Reports/Defaulters";
import DailySummary from "./pages/Reports/DailySummary";
import TransportSettings from "./pages/settings/TransportSettings";
import HostelSettings from "./pages/hostel/HostelSettings";
import MainDashBoardFee from "./pages/dashboard/MainDashboardFee";
import TransportList from "./pages/transport/TransportList";
import { ForgotPassword } from "./pages/forgotpassword/ForgotPassword";
import TransportDefaultersReport from "./pages/Reports/TransportReports/TransportDefaultersReport";
import TransportStudentList from "./pages/transport/studentlist/TransportStudentList";
import DriverList from "./pages/transport/driverlist/DriverList";
import HostelDefaultersReport from "./pages/Reports/HostelReports/HostelDefaultersReport";
import ConcessionList from "./pages/fees/concession/ConcessionList";
import PickUpPointList from "./pages/transport/PickUpPoints/PickUpPointList";
import RoutesList from "./pages/transport/Routes/RouteList";
import MiscellaneousSettings from "./pages/settings/miscellaneousfee/MiscellaneousSettings";
import MiscellaneousCollection from "./pages/settings/miscellaneousfee/MiscellaneousCollection";
import BarcodeGenerator from "./pages/barcode/Barcode";
import FuelList from "./pages/transport/Listings/FuelList";
import RepairList from "./pages/transport/Listings/RepairList";
import TransportFuelReport from "./pages/Reports/TransportReports/TransportFuelReport";
import TransportMaintanenceReport from "./pages/Reports/TransportReports/TransportMaintanenceReport";
import VehicleProfile from "./pages/transport/VehicleProfile";
import DriverProfile from "./pages/transport/driverlist/Profile/DriverProfile";
import NewDefaulters from "./pages/Reports/NewDefaulters";
import TransportFeeSettings from "./pages/settings/TransportFeeSettings/TransportFeeSettings";
import ConsolidatedReport from "./pages/Reports/consolidatedreportcomponents/ConsolidatedReport";
import TransportClassFeeSettings from "./pages/settings/TransportFeeSettings/TransportClassFeeSettings";
import TransportListReport from "./pages/Reports/TransportReports/TransportListReport";
import MiscellaneousReport from "./pages/Reports/MiscellaneousReport";
import ConsolidatedReportMain from "./pages/Reports/consolidated_report_main";
import HostelListReport from "./pages/Reports/HostelReports/HostelListReport";
import IndividualHostelSettings from "./pages/Reports/HostelSettings/IndividualHostelSettings";
import TransportFeeCollectionReport from "./pages/Reports/TransportReports/TransportFeeCollectionReport";
import DailyFeeCollection from "./pages/Reports/DailyFeeCollection";
import PreBooking from "./pages/preBooking/PreBooking";
import PreBookingList from "./pages/preBooking/PreBookingList";
import PreRegistrationReport from "./pages/preBooking/PreRegisterationReport";
import AdmissionFeeReport from "./pages/preBooking/AdmissionFeeReport";
import StudentPaymentTypeReport from "./pages/preBooking/StudentPaymentTypeReport";
import Main from "./pages/admissionForm/Main";
import CodeTest from "./pages/admissionForm/Codetest";
import TermwiseReport from "./pages/Reports/TermwiseReport";
import ConcessionStudentWise from "./pages/fees/concession/ConcessionStudentWise";
import BCBTable from "./pages/Reports/AcademicBCB";
import AcademicBCB from "./pages/Reports/AcademicBCB";
import AcademicDetailedDCB from "./pages/Reports/dcbReports/AcademicDCBReports/AcademicDetailedDCB";
import AcademicClassWiseDCB from "./pages/Reports/dcbReports/AcademicDCBReports/AcademicClassWiseDCB";
import AcademicConsolidatedDCB from "./pages/Reports/dcbReports/AcademicDCBReports/AcademicConsolidatedDCB";
import TransportDetailedDCB from "./pages/Reports/dcbReports/TransportDCBReports/TransportDetailedDCB";
import TransportRouteWiseDCB from "./pages/Reports/dcbReports/TransportDCBReports/TransportRouteWiseDCB";
import TransportConsolidatedDCB from "./pages/Reports/dcbReports/TransportDCBReports/TransportConsolidatedDCB";
import HostelDetailedDcb from "./pages/Reports/dcbReports/HostelDCBReports/HostelDetailedDcb";
import HostelTypeWiseDcb from "./pages/Reports/dcbReports/HostelDCBReports/HostelTypeWiseDcb";
import HostelConsolidatedDcb from "./pages/Reports/dcbReports/HostelDCBReports/HostelConsolidatedDcb";
import AcademicDefaulters from "./pages/Reports/dcbReports/AcademicDCBReports/AcademicDefaulters";
import AddFeeHead from "./pages/feeSettings/addFeeHead/AddFeeHead";
import AddFeeSettings from "./pages/feeSettings/addFeeSettings/AddFeeSettings";
// import FuelList from "./pages/transport/Fuel/FuelList";

function App() {
  const userTypeId = localStorage.getItem("roleId");
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admission-form" element={<Main />} />
        {/* <Route path="/admission-test" element={<CodeTest />} /> */}
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<MainDashBoard />} />
        {/* <Route path="/home-fee" element={<MainDashBoardFee />} /> */}
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/dashboard/:id/:year" element={<Dashboard />} />
        <Route path="/:type/:id/:year" element={<Dashboard />} />
        <Route path="/fee-history/:id" element={<FeeHistory />} />
        <Route path="/class-wise-list" element={<ClassWiseSearchList />} />
        <Route
          path="/class-wise-list/:year"
          element={<ClassWiseSearchList />}
        />
        <Route
          path="/transport-student-list"
          element={<TransportStudentList />}
        />
        <Route path="/driver-list" element={<DriverList />} />
        <Route path="/concession/student" element={<ConcessionStudentWise />} />
        <Route
          path="/concession/student/:id"
          element={<ConcessionStudentWise />}
        />
        <Route path="/concession" element={<ConcessionList />} />
        <Route path="/barcode" element={<BarcodeGenerator />} />

        {/* Fee Setting */}
        <Route path="/add-fee-head" element={<AddFeeHead />} />
        <Route path="/add-fee-settings" element={<AddFeeSettings />} />

        {/* Reports */}
        <Route path="/reports" element={<PaymentReport />} />
        <Route path="/daily-summary-report" element={<DailySummary />} />
        <Route path="/payment-mode-report" element={<PaymentMode />} />
        <Route path="/dcb-report" element={<DCB />} />
        <Route path="/concession-report" element={<Concession />} />

        {/* Academic Dcb Reports */}
        <Route
          path="/academic-detailed-dcb-report"
          element={<AcademicDetailedDCB />}
        />
        <Route
          path="/academic-class-wise-dcb-report"
          element={<AcademicClassWiseDCB />}
        />

        <Route
          path="/academic-consolidated-dcb-report"
          element={<AcademicConsolidatedDCB />}
        />
        <Route path="/academic-defaulters" element={<AcademicDefaulters />} />

        {/* Transport Dcb Reports */}
        <Route
          path="/transport-detailed-dcb-report"
          element={<TransportDetailedDCB />}
        />
        <Route
          path="/transport-route-wise-dcb-report"
          element={<TransportRouteWiseDCB />}
        />

        <Route
          path="/transport-consolidated-dcb-report"
          element={<TransportConsolidatedDCB />}
        />
        {/* Hostel Dcb Reports */}
        <Route
          path="/hostel-detailed-dcb-report"
          element={<HostelDetailedDcb />}
        />
        <Route
          path="/hostel-type-wise-dcb-report"
          element={<HostelTypeWiseDcb />}
        />
        <Route
          path="/hostel-consolidated-dcb-report"
          element={<HostelConsolidatedDcb />}
        />

        <Route
          path="/detailed-fee-collection-report"
          element={<DetailedFeeCollection />}
        />
        <Route path="/head-wise-report" element={<HeadWise />} />
        <Route path="/defaulters-report" element={<Defaulters />} />
        <Route
          path="/transport-defaulters-report"
          element={<TransportDefaultersReport />}
        />
        <Route
          path="/transport-fuel-report"
          element={<TransportFuelReport />}
        />
        <Route
          path="/transport-maintanence-report"
          element={<TransportMaintanenceReport />}
        />
        <Route
          path="/transport-list-report"
          element={<TransportListReport />}
        />
        <Route
          path="/hostel-defaulters-report"
          element={<HostelDefaultersReport />}
        />
        <Route path="/hostel-list-report" element={<HostelListReport />} />
        <Route path="/miscellaneous-report" element={<MiscellaneousReport />} />

        <Route path="/defaulters" element={<NewDefaulters />} />
        <Route
          path="/consolidated-report"
          element={<ConsolidatedReportMain />}
        />
        <Route
          path="/transport-fee-collection"
          element={<TransportFeeCollectionReport />}
        />
        <Route path="/daily-fee-collection" element={<DailyFeeCollection />} />

        {/* Settings */}
        <Route path="/transport-setting" element={<TransportSettings />} />
        <Route
          path="/individual-hostel-setting/:id"
          element={<IndividualHostelSettings />}
        />
        <Route
          path="/transport-fee-setting"
          element={<TransportFeeSettings />}
        />
        <Route
          path="/transport-class-fee-setting"
          element={<TransportClassFeeSettings />}
        />
        <Route path="/hostel-setting" element={<HostelSettings />} />
        <Route
          path="/miscellaneous-setting"
          element={<MiscellaneousSettings />}
        />
        <Route
          path="/miscellaneous-collection"
          element={<MiscellaneousCollection />}
        />
        <Route path="/add-pre-registration" element={<PreBooking />} />
        <Route path="/pre-registration-List" element={<PreBookingList />} />
        <Route
          path="/pre-registration-Report"
          element={<PreRegistrationReport />}
        />
        <Route path="/admission-fee-report" element={<AdmissionFeeReport />} />
        <Route path="/term-wise-report" element={<TermwiseReport />} />
        <Route
          path="/student-payment-type-report"
          element={<StudentPaymentTypeReport />}
        />
        {/* Transport */}
        <Route path="/transport-list" element={<TransportList />} />
        <Route path="/pickup-point-list" element={<PickUpPointList />} />
        <Route path="/route-list" element={<RoutesList />} />
        <Route path="/vehicle-profile/:id" element={<VehicleProfile />} />
        <Route path="/driver-profile/:id" element={<DriverProfile />} />
        <Route path="/fuel-list" element={<FuelList />} />
        <Route path="/repair-list" element={<RepairList />} />
      </Route>
    </Routes>
  );
}

export default App;
