import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
// import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../../../components/inputComponent/SelectStyle";
import { clearPickupPoint } from "../../../../slices/transport/transportSlice";
import PickupPointDetailsList from "./PickupPointDetailsList";

function PickupPointDetailsContainer({
  formData,
  setFormData,
  academicYear,
}: any) {
  const transportData: any = useSelector((state: any) => state.transport);

  const addPickupPointDiv = () => {
    setPickupPointHeadDiv([...pickupPointDiv, <PickupPointDetailsList />]);
  };

  const removePickupPointDiv = (index: number) => {
    var pickupPointDivData = [...pickupPointDiv];
    if (index !== -1) {
      pickupPointDivData.splice(index, 1);
      setPickupPointHeadDiv(pickupPointDivData);
    }
  };
  const [pickupPointDiv, setPickupPointHeadDiv] = useState([
    <PickupPointDetailsList />,
  ]);

  const academicYearOptions = academicYear?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });

  return (
    <Row className="modalformBody ">
      <Col md={12} className="form-inputs">
        <Row className="form-inputs-row">
          <Col md={6}>
            <label htmlFor="">Academic year</label>
            <Select
              options={academicYearOptions}
              placeholder="Academic Year"
              styles={customStyles}
              onChange={(e: any) => {
                setFormData({ ...formData, academic_year: e.value });
              }}
              defaultValue={academicYearOptions.filter(
                (item: any) => item.label === transportData?.academicYear
              )}
              //   defaultValue={formData.academic_year}
              required
            />
          </Col>
        </Row>

        {pickupPointDiv.map((items, key) => {
          return (
            <PickupPointDetailsList
              pickupPointDivData={pickupPointDiv}
              index={key}
              add={addPickupPointDiv}
              delete={removePickupPointDiv}
            />
          );
        })}
      </Col>
      <Row className="form-inputs-row"></Row>
    </Row>
  );
}

export default PickupPointDetailsContainer;
