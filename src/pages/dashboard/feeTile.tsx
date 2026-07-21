import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRawDatas } from "../../slices/feetable/feeTableSlice";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip, { TooltipProps } from "react-bootstrap/Tooltip";
import { Row, Col } from "react-bootstrap";
function FeeTile(props: {
  data: any;
  status: string;
  amount: number;
  amount_to_be_paid: number;
  handleClick: any;
  rowName: string;
  month: string;
  calculateTotal: any;
  checkedStatus: any;
  monthId: number;
}) {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  let feeTitle;
  let status: any;
  let check;
  switch (props.status) {
    case "Paid":
      feeTitle = "fee-tile paid";
      status = "Paid";
      break;
    case "Pending":
      feeTitle = "fee-tile pending";
      status = "Pending";
      break;
    case "Due":
      feeTitle = "fee-tile due";
      status = "Due";
      break;
    case "Not Used":
      feeTitle = "fee-tile pending";
      status = "Not Used";
      break;

    case "none":
      feeTitle = "fee-tile";

      status = "none";

      break;
  }

  switch (isChecked) {
    case true:
      check = "checked";
      break;
    case false:
      check = "unchecked";
      break;
  }

  const renderTooltip = (
    tool: JSX.IntrinsicAttributes &
      TooltipProps &
      React.RefAttributes<HTMLDivElement>,
  ) => (
    <Tooltip id="button-tooltip" {...tool}>
      <div className="d-flex justify-content-between gap-5">
        <span>Date</span>
        <span>{props.data.date}</span>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <span>Mode</span>
        <span>{props.data.payment_type}</span>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <span>Rt.No</span>
        <span>{props.data.receipt_no}</span>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <span>Fine</span>
        <span>{props.data.fine}</span>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <span>Concession</span>
        <span>
          {props.data.concession === null ? "0" : props.data.concession}
        </span>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <span>Total</span>
        <span>{props.data.total_paid_amt}</span>
      </div>
    </Tooltip>
  );


  useEffect(() => {
    if (props.checkedStatus) {
      setIsChecked(true);

      var data = {
        id: `${props.rowName}${props.month}`,
        name: props.rowName,
        amount: props.amount_to_be_paid,
        month_name: props.month,
        isSelected: true,
        monthId: props.monthId,
        fine: props.data.fine,
        fee_settings_id: props.data.fee_settings_id,
      };
      dispatch(props.handleClick(data));
      dispatch(props.calculateTotal());
    } else {
      setIsChecked(false);
      var data = {
        id: `${props.rowName}${props.month}`,
        name: props.rowName,
        amount: props.amount_to_be_paid,
        month_name: props.month,
        isSelected: false,
        monthId: props.monthId,
        fine: props.data.fine,
        fee_settings_id: props.data.fee_settings_id,
      };
      dispatch(props.handleClick(data));
      dispatch(props.calculateTotal());
    }
  }, [props.checkedStatus]);

  return (
    <>
      {props.status === "Paid" ? (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          {props.amount !== 0 ? (
            <div className={feeTitle}>
              <span className="bold ">
                {props.amount_to_be_paid > 0
                  ? props.amount_to_be_paid
                  : props.amount}
              </span>
              {status}

              {(props.checkedStatus || props.rowName === "Bus Fee") &&
              (status === "Pending" || status === "Due") ? (
                <div className={check}></div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className={feeTitle}>{status}</div>
          )}
        </OverlayTrigger>
      ) : props.amount !== 0 ? (
        <div className={feeTitle}>
          <span className="bold ">
            {props.amount_to_be_paid > 0
              ? props.amount_to_be_paid
              : props.amount}
          </span>
          {status}

          {(props.checkedStatus || props.rowName === "Bus Fee") &&
          (status === "Pending" || status === "Due") ? (
            <div className={check}></div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={feeTitle}>{status}</div>
      )}
    </>
  );
}

export default FeeTile;
