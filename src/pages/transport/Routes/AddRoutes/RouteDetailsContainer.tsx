import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";

function RoutesDetailsContainer({ formData, setFormData, academicYear }: any) {
  const driverList: any = useSelector((state: any) => state.transport);
  const customStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: "16px",
        fontWeight: "400",
      };
    },
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      fontSize: "14px",
      background: "white",
      borderRadius: "6px",
      //   minHeight: 0,
      //   height: "2em",
      borderColor: "#f3f6f9",

      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#" : "#",
      },
    }),
    menu: (base: any) => ({
      ...base,

      borderRadius: 0,

      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      fontSize: "13px",
      padding: 0,
    }),
    option: (base: any) => ({
      ...base,
      width: "100%",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#3699FF",
      "&:hover": {
        color: "#3699FF",
      },
    }),
  };

  const academicYearOptions = academicYear?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  // const driverListOptions = driverList.driverListData?.map((items: any) => {
  //   return {
  //     label: items.driver_name,
  //     value: items.id,
  //   };
  // });
  // const handleChangeDriver = (e: any) => {
  //   console.log("driver value", e.value);
  //   setFormData({ ...formData, driver_id: e.value, driver_name: e.label });
  // };
  return (
    <Row className="modalformBody">
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
              // defaultValue={academicYearOptions.filter(
              //   (item: any) => item.value === "2022-2023"
              // )}
              //   defaultValue={formData.academic_year}
              required
            />
          </Col>
          <Col md={6}>
            <label htmlFor="">Route</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter Route"
              onChange={(e: any) => {
                setFormData({ ...formData, route: e.target.value });
              }}
              required
              // defaultValue={academicYearOptions.filter(
              //   (item: any) => item.value === "2022-2023"
              // )}
              //   defaultValue={formData.academic_year}
            />
          </Col>
        </Row>
        <Row className="form-inputs-row ">
          <Col md={6}>
            <label htmlFor="">Description</label>
            <input
              type="text"
              className="form-input"
              placeholder="Description"
              onChange={(e: any) => {
                setFormData({ ...formData, description: e.target.value });
              }}

              // defaultValue={academicYearOptions.filter(
              //   (item: any) => item.value === "2022-2023"
              // )}
              //   defaultValue={formData.academic_year}
            />
          </Col>
          <Col md={6}>
            <label htmlFor="">Bus.No</label>
            <input
              type="text"
              className="form-input"
              placeholder="Bus Number"
              onChange={(e: any) => {
                setFormData({ ...formData, bus_no: e.target.value });
              }}
              required
              // defaultValue={academicYearOptions.filter(
              //   (item: any) => item.value === "2022-2023"
              // )}
              //   defaultValue={formData.academic_year}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default RoutesDetailsContainer;
