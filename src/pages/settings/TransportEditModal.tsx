import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { apiPost } from "../../config/apiConfig";
import { UPDATE_TRANSPORT_SETTING } from "../../config/BaseUrl";
import { customStyles } from "../../components/inputComponent/SelectStyle";
import {
  tryFetchPickupPointListData,
  tryFetchRouteListData,
} from "../../slices/transport/transportSlice";
import { toast, ToastContainer } from "react-toastify";
import { tryFetchAutoCompleteSearch } from "../../slices/navsearch/ClassWiseSearchSlice";
import { tryFetchTransportSettingTableData } from "../../slices/settings/transportSettingSlice";

function TransportEditModal(props: any) {
  const dispatch = useDispatch();
  const transportSettingData: any = useSelector(
    (state: any) => state.transportsetting.transportSettingTableData,
  );
  const TransportLists: any = useSelector((state: any) => state.transport);

  const [route, setRoute] = useState(parseInt(props.datas?.route_id || 0));
  const [pickup, setPickup] = useState(props.datas?.pick_up);
  const [routeType, setRouteType] = useState(
    props.datas?.transport_type || "1",
  );
  const [tuition, setTuition] = useState(parseInt(props.datas?.akash));
  const [fee, setFee]: any = useState(props.datas?.fee_amount || 0);

  const [tuitionFee, setTuitionFee]: any = useState(
    props.datas?.akash !== 0 ? 1000 : 0,
  );
  const [totalFee, setTotalFee]: any = useState(0.0);
  const [selectedMonth, setSelectedMonth]: any = useState([]);
  const [remarks, setRemarks]: any = useState([]);

  useEffect(() => {
    console.log("props.datas", props.datas);
  }, [props.datas]);

  const [monthDetails, setMonthDetails] = useState([
    { month: "Apr", month_id: 4, isCheckBox: true, feeInput: 0 },
    { month: "May", month_id: 5, isCheckBox: true, feeInput: 0 },
    { month: "Jun", month_id: 6, isCheckBox: true, feeInput: 0 },
    { month: "Jul", month_id: 7, isCheckBox: true, feeInput: 0 },
    { month: "Aug", month_id: 8, isCheckBox: true, feeInput: 0 },
    { month: "Sep", month_id: 9, isCheckBox: true, feeInput: 0 },
    { month: "Oct", month_id: 10, isCheckBox: true, feeInput: 0 },
    { month: "Nov", month_id: 11, isCheckBox: true, feeInput: 0 },
    { month: "Dec", month_id: 12, isCheckBox: true, feeInput: 0 },
    { month: "Jan", month_id: 1, isCheckBox: true, feeInput: 0 },
    { month: "Feb", month_id: 2, isCheckBox: true, feeInput: 0 },
    { month: "Mar", month_id: 3, isCheckBox: true, feeInput: 0 },
    { month: "Apr", month_id: 13, isCheckBox: true, feeInput: 0 },
    { month: "May", month_id: 14, isCheckBox: true, feeInput: 0 },
  ]);
  useEffect(() => {
    if (props?.datas) {
      setMonthDetails([
        { month: "Apr", month_id: 4, isCheckBox: false, feeInput: 0 },
        { month: "May", month_id: 5, isCheckBox: false, feeInput: 0 },
        { month: "Jun", month_id: 6, isCheckBox: false, feeInput: 0 },
        { month: "Jul", month_id: 7, isCheckBox: false, feeInput: 0 },
        { month: "Aug", month_id: 8, isCheckBox: false, feeInput: 0 },
        { month: "Sep", month_id: 9, isCheckBox: false, feeInput: 0 },
        { month: "Oct", month_id: 10, isCheckBox: false, feeInput: 0 },
        { month: "Nov", month_id: 11, isCheckBox: false, feeInput: 0 },
        { month: "Dec", month_id: 12, isCheckBox: false, feeInput: 0 },
        { month: "Jan", month_id: 1, isCheckBox: false, feeInput: 0 },
        { month: "Feb", month_id: 2, isCheckBox: false, feeInput: 0 },
        { month: "Mar", month_id: 3, isCheckBox: false, feeInput: 0 },
        { month: "Apr", month_id: 13, isCheckBox: false, feeInput: 0 },
        { month: "May", month_id: 14, isCheckBox: false, feeInput: 0 },
      ]);
    }
  }, [props.datas, route, pickup, tuition, routeType]);
  const isSeniorClass =
    transportSettingData?.class_name === "XI" ||
    transportSettingData?.class_name === "XII";

  const filteredMonthDetails = isSeniorClass
    ? monthDetails // show everything
    : monthDetails.filter((m) => m.month_id !== 13 && m.month_id !== 14);

  const PickupOptions: any = TransportLists?.pickupPointListData?.data?.map(
    (items: any) => ({
      label: items.pick_up_point,
      value: items.id,
      fee: items.pick_up_fee,
    }),
  );

  const RouteOptions = TransportLists?.routeListData?.map((items: any) => ({
    label: items.route,
    value: items.id,
    academic_year: items.academic_year,
  }));

  const tuitionOptions = [
    { value: 0, label: "NO" },
    { value: 1, label: "YES" },
  ];

  // Update monthDetails when props.datas changes

  useEffect(() => {
    setRoute(props.datas?.route_id);
    setPickup(props.datas?.pick_up);
    setRouteType(props.datas?.transport_type);
    setTuition(props.datas?.akash);
    setFee(props.datas?.fee_amount || 0);
    setTuitionFee(props.datas?.akash !== 1 ? 1000 : 0);
    setTotalFee(
      parseInt(props.datas?.fee_amount || 0) +
        parseInt(props.datas?.akash || 0),
    );

    setSelectedMonth(
      monthDetails
        .filter((month: any) => month.isCheckBox)
        .map((month: any) => month.month_id),
    );
  }, [props.datas]);

  // Fetch pickup points when route_id changes
  useEffect(() => {
    if (props.datas?.route_id && transportSettingData?.academic_year) {
      const data = {
        year: transportSettingData.academic_year,
        route: props.datas.route_id,
      };
      dispatch(tryFetchPickupPointListData(data));
    }
  }, [props.datas?.route_id, transportSettingData?.academic_year, dispatch]);

  // Recalculate totalFee whenever monthDetails change
  useEffect(() => {
    const total = filteredMonthDetails.reduce(
      (acc, month: any) => acc + (month.isCheckBox ? month.feeInput : 0),
      0,
    );

    // Add tuition fee (1000) if it's selected (tuition === "1")
    setTotalFee(total);
  }, [monthDetails, tuition, fee]);

  useEffect(() => {
    if (props?.datas?.pick_up_point) {
      setPickup(props?.datas?.pick_up_point);
    }
  }, [props?.datas?.pick_up_point]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const uniqueSelectedMonths = Array.from(new Set(selectedMonth));
    try {
      const token = localStorage.getItem("token") as string;
      const bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("master_id", transportSettingData?.id);

      const monthIds = filteredMonthDetails
        .filter((month: any) => month.feeInput > 0)
        .map((month: any) => month.month_id)
        .join(",");

      bodyFormData.append("month", monthIds);

      bodyFormData.append("route_id", route?.toString());
      bodyFormData.append("transport_type", routeType);
      bodyFormData.append("pickup_points", pickup?.toString());
      bodyFormData.append("tuition", tuition.toString());
      filteredMonthDetails
        .filter((month: any) => month.feeInput > 0)
        .forEach((month: any) => {
          bodyFormData.append(
            `f_amount[${month.month_id}]`,
            month.feeInput.toString(),
          );
        });
      bodyFormData.append("remark", remarks);

      const resp: any = await apiPost(UPDATE_TRANSPORT_SETTING, bodyFormData);
      if (resp.response.data.status === 200 && resp.response.data.data) {
        // Reset states if necessary
        // setRoute("");
        // setPickup("");
        // setRouteType("1");
        setTuition(0);
        setFee(0);
        setTuitionFee(0);
        setTotalFee(0);
        setSelectedMonth([]);
        setMonthDetails(
          monthDetails.map((month) => ({
            ...month,
            feeInput: 0,
            isCheckBox: false,
          })),
        );

        props.setOpen(false);
        dispatch(
          tryFetchTransportSettingTableData(transportSettingData?.student_id),
        );

        toast.success("Transport Details Updated Successfully");
      } else {
        toast.error("Something happened, please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        toast.error(error.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleChangeRoute = (e: any) => {
    const data = {
      year: transportSettingData?.academic_year,
      route: e.value,
    };
    setRoute(e.value);
    setPickup(" ");
    dispatch(tryFetchPickupPointListData(data));
  };
  const clearDatas = () => {
    // setRoute("");
    // setPickup(0);
    // setRouteType("1");
    // setTuition("0");
    // setFee(0);
    // setTuitionFee(0);
    // setTotalFee(0);
    setSelectedMonth([]);
    setMonthDetails(
      monthDetails.map((month) => ({
        ...month,
        feeInput: 0,
        isCheckBox: false,
      })),
    );
    props.setOpen(false);
  };
  const handlePickupChange = (e: any) => {
    setPickup(e.value);
    setFee(e.fee);
    setTotalFee(parseInt(e.fee) + parseInt(tuitionFee));
  };

  const handleTuitionOptions = (e: any) => {
    console.log("element of pickup tuitiuonn", e);

    setTuition(e.value);
    if (e.value === 1) {
      setTuitionFee(1000);
      setTotalFee(1000 + parseInt(fee));
    } else {
      setTuitionFee(0);
      setTotalFee(parseInt(fee));
    }
  };

  const uiRenderer = useCallback(() => {
    return (
      <>
        {PickupOptions ? (
          <Col md={6}>
            <label htmlFor="">Pickup point</label>
            <Select
              className="mt-2"
              options={PickupOptions}
              placeholder="Pick up point"
              styles={customStyles}
              onChange={handlePickupChange}
              value={PickupOptions.find((item: any) => item.value === pickup)}
            />
          </Col>
        ) : null}
      </>
    );
  }, [PickupOptions, handlePickupChange, pickup]);

  const handleCheckBox = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("route type", routeType);

    const isChecked = event.target.checked;

    setMonthDetails((prevMonthDetails) =>
      prevMonthDetails.map((month) => {
        if (month.month_id === id) {
          let feeInput = 0;

          if (isChecked) {
            if (tuition === 1) {
              // Tuition case
              if (routeType === 1) {
                // routeType is 1, take half of the fee plus 1000
                feeInput = parseFloat(fee) / 2 + 1000;
              } else {
                // routeType is 0, take full fee plus 1000
                feeInput = parseFloat(fee) + 1000;
              }
            } else {
              // Non-tuition case
              if (routeType === 1) {
                // routeType is 1, take half of the fee
                feeInput = parseFloat(fee) / 2;
              } else {
                // routeType is 0, take full fee
                feeInput = parseFloat(fee);
              }
            }
          }

          return {
            ...month,
            isCheckBox: isChecked,
            feeInput: feeInput,
          };
        }

        return month;
      }),
    );

    if (isChecked) {
      setSelectedMonth((prevSelectedMonth: any) => [...prevSelectedMonth, id]);
    } else {
      setSelectedMonth((prevSelectedMonth: any) =>
        prevSelectedMonth.filter((monthId: any) => monthId !== id),
      );
    }
  };

  const handleMonthValuesChange = (monthId: number, value: string) => {
    const feeInputValue = parseFloat(value) || 0;
    setMonthDetails((prevMonthDetails) =>
      prevMonthDetails.map((month) =>
        month.month_id === monthId
          ? { ...month, feeInput: feeInputValue }
          : month,
      ),
    );
  };

  useEffect(() => {
    // console.log("pickup", pickup);
    // console.log("tuiiition", tuition);
    // console.log("monthDetails", monthDetails);
    console.log("transportSettingData", transportSettingData);
  }, [transportSettingData]);

  return (
    <>
      <ToastContainer />
      <Modal
        size="lg"
        show={props.modalOpen}
        onHide={() => props.setOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="transportModal"
      >
        <form onSubmit={handleUpdate}>
          <Modal.Header className="transportModalHeader">
            <span>Fee Settings</span>
            <button
              onClick={() => props.setOpen(false)}
              type="button"
              className="close-button" // Ensure you have appropriate styling
            ></button>
          </Modal.Header>
          <Modal.Body className="transportModalBody">
            <Row>
              <Col md={12} className="settingEditModalHeading">
                <span className="title">
                  {transportSettingData?.student_name}
                </span>
                <span className="class">
                  {transportSettingData?.class_name +
                    " " +
                    transportSettingData?.division_id}
                </span>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <label htmlFor="">Route</label>
                <Select
                  className="mt-2"
                  options={RouteOptions}
                  placeholder="Route"
                  styles={customStyles}
                  onChange={handleChangeRoute}
                  defaultValue={RouteOptions.find(
                    (item: any) => item.value === props.datas?.route_id,
                  )}
                />
              </Col>
              {uiRenderer()}
              <Col md={6} className="mt-3">
                <label htmlFor="">Need transport for tuition?</label>
                <Select
                  className="mt-2"
                  options={tuitionOptions}
                  placeholder="Select"
                  styles={customStyles}
                  onChange={handleTuitionOptions}
                  defaultValue={tuitionOptions.find(
                    (item: any) => item.value === tuition,
                  )}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="settingEditModalType">
                <div>
                  <input
                    type="radio"
                    name="routeType"
                    value={1}
                    onChange={(e) => setRouteType(parseInt(e.target.value))}
                    checked={routeType === 1}
                  />
                  <label>One way</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="routeType"
                    value={2}
                    onChange={(e) => setRouteType(parseInt(e.target.value))}
                    checked={routeType === 2}
                  />
                  <label>Two way</label>
                </div>
              </Col>
            </Row>
            <Row className="form-inputs-row mt-2">
              <Col md={12}>
                <label htmlFor="remarks" className="mb-2">
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  className="form-text-area"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={5}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="settingEditModalMonth">
                <Row className="form-inputs-row">
                  <Col md={12} className="d-flex flex-wrap gap-5">
                    {filteredMonthDetails.map((month) => (
                      <div
                        key={month.month_id}
                        className="d-flex align-items-center flex-column gap-1"
                      >
                        <label className="form-check-label">
                          {month.month}
                        </label>
                        <input
                          type="checkbox"
                          value={month.month_id}
                          name={month.month}
                          checked={month.isCheckBox}
                          className="form-check-input"
                          onChange={(e) => handleCheckBox(month.month_id, e)}
                        />
                        <input
                          type="text"
                          name={String(month.month_id)}
                          value={month.feeInput}
                          onChange={(e) =>
                            handleMonthValuesChange(
                              month.month_id,
                              e.target.value,
                            )
                          }
                          className="fee-input"
                          disabled={!month.isCheckBox}
                        />
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="settingEditModalFeeAmount">
                <span>Fee amount</span>
                <span>{totalFee}</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="d-flex align-items-center justify-content-center">
            <button className="button-70 updateBtn" type="submit">
              <span>Update</span>
            </button>
            <button
              className="button-70 cancelBtn"
              type="button"
              onClick={() => clearDatas()}
            >
              <span>Cancel</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default TransportEditModal;
