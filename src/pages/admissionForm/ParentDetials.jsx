import Pg1 from "./Images/Pg-2-1.png";
import Pg2 from "./Images/Pg-2-2.png";
import Pg3 from "./Images/Pg-1-3.png";
import Pg4 from "./Images/Pg-1-4.png";
import { MDBCardBody, MDBCol, MDBNavbarBrand, MDBRow } from "mdb-react-ui-kit";
import {
  EmailValid,
  Label,
  LastDiv,
  Main,
  ModalText,
  StyledButton,
  StyledButton2,
  StyledCard,
  StyledHeading,
  StyledInput,
  StyledSpan,
} from "./AdmissionStyles";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function ParentDetials({
  parentData,
  setParentData,
  change,
  Next,
  Previous,
  checkboxes,
  checkboxData,
  SelectedClass,
  isOpen,
  onClose,
  setemailVaid,
  setcheckNumber,
}) {
  const [fathersEmailValid, setfathersEmailValid] = useState(true);
  const [mothersEmailValid, setmothersEmailValid] = useState(true);
  const [gaurdianEmailValid, setgaurdianEmailValid] = useState(true);
  const [isFatherNumberValid, setisFatherNumberValid] = useState(false);
  const [isMotherNumberValid, setisMotherNumberValid] = useState(false);
  const [isGaurdianNumberValid, setisGaurdianNumberValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const isValidFatherEmail = emailRegex.test(parentData.FathersEmail);
    if (checkboxes.father) {
      if (isValidFatherEmail) {
        setemailVaid(true);
      } else {
        setemailVaid(false);
      }

      if (parentData.FathersNumber.length === 10) {
        setcheckNumber(true);
      } else {
        setcheckNumber(false);
      }
    }

    const isValidMotherEmail = emailRegex.test(parentData.MothersEmail);
    if (checkboxes.mother) {
      if (isValidMotherEmail) {
        setemailVaid(true);
      } else {
        setemailVaid(false);
      }

      if (parentData.MothersNumber.length === 10) {
        setcheckNumber(true);
      } else {
        setcheckNumber(false);
      }
    }

    const isValidGuardianEmail = emailRegex.test(parentData.GuardianEmail);
    if (checkboxes.guardian) {
      if (isValidGuardianEmail) {
        setemailVaid(true);
      } else {
        setemailVaid(false);
      }

      if (parentData.GuardianNumber.length === 10) {
        setcheckNumber(true);
      } else {
        setcheckNumber(false);
      }
    }
  }, [checkboxes, parentData]);

  return (
    <Main>
      <div
        style={{ padding: "10px", marginLeft: "20px" }}
        className="d-flex gap-5  flex-wrap"
      >
        <MDBNavbarBrand>
          <img src={Pg2} height="18px" alt="" loading="lazy" />
        </MDBNavbarBrand>
        <MDBNavbarBrand>
          <img src={Pg1} height="18px" alt="" loading="lazy" />
        </MDBNavbarBrand>
        {SelectedClass === "13" || SelectedClass === "14" ? (
          <MDBNavbarBrand>
            <img src={Pg3} height="18px" alt="" loading="lazy" />
          </MDBNavbarBrand>
        ) : null}
        <MDBNavbarBrand>
          <img src={Pg4} height="18px" alt="" loading="lazy" />
        </MDBNavbarBrand>
      </div>

      <form onSubmit={Next}>
        <StyledCard>
          <StyledHeading>
            <StyledSpan>1.</StyledSpan>Student’s Father’s Details
          </StyledHeading>
          <hr />
          <MDBCardBody>
            <div className="container">
              <MDBRow>
                <MDBCol>
                  <input
                    type="checkbox"
                    checked={checkboxes.father}
                    onChange={() => checkboxData("father")}
                  />
                  &nbsp;&nbsp;
                  <label for="vehicle1">Select father as Primary contact</label>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <Label>Father’s Name</Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.father}
                    isInvalid={checkboxes.father && !parentData.FathersName}
                    name="FathersName"
                    value={(parentData.FathersName || "").replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    )}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                        setParentData({ ...parentData, [name]: value });
                      }
                    }}
                  />
                </MDBCol>
                <MDBCol>
                  <Label>Email Address</Label>
                  <br />
                  <StyledInput
                    type="email"
                    name="FathersEmail"
                    onChange={(e) => {
                      const isValidEmail = emailRegex.test(e.target.value);
                      setfathersEmailValid(isValidEmail);
                      setParentData({
                        ...parentData,
                        FathersEmail: e.target.value,
                      });
                    }}
                    style={{
                      borderColor: !fathersEmailValid ? "#ffe9e9" : "",
                    }}
                    value={parentData.FathersEmail}
                    required={checkboxes.father}
                    isInvalid={!fathersEmailValid}
                  />
                  {!fathersEmailValid ? (
                    <EmailValid>Please Enter valid email</EmailValid>
                  ) : (
                    ""
                  )}
                </MDBCol>
                <MDBCol>
                  <Label> Mobile Number </Label>
                  <br />

                  <StyledInput
                    id="form10Example3"
                    type="text"
                    name="FathersNumber"
                    onChange={(event) => {
                      const { name, value } = event.target;
                      if (
                        /^[0-9]{0,10}$/.test(value) &&
                        (!isNaN(value) || value === "")
                      ) {
                        setParentData({ ...parentData, [name]: value });
                        if (value.length === 10) {
                          setisFatherNumberValid(false);
                        } else {
                          setisFatherNumberValid(true);
                        }
                      }
                    }}
                    value={(parentData.FathersNumber || "").replace(
                      /[^0-9]/g,
                      ""
                    )}
                    required={checkboxes.father}
                    isInvalid={checkboxes.father && !parentData.FathersNumber}
                  />
                  {isFatherNumberValid ? (
                    <EmailValid>Please enter a valid mobile number.</EmailValid>
                  ) : (
                    ""
                  )}
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <Label>Occupation</Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.father}
                    isInvalid={
                      checkboxes.father && !parentData.FathersOccupation
                    }
                    id="form10Example3"
                    name="FathersOccupation"
                    onChange={change}
                    value={parentData.FathersOccupation}
                  />
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCardBody>
        </StyledCard>

        <StyledCard>
          <StyledHeading>
            <StyledSpan>2.</StyledSpan>Student’s Mother’s Details
          </StyledHeading>
          <hr />
          <MDBCardBody>
            <div className="container">
              <MDBRow>
                <MDBCol>
                  <input
                    type="checkbox"
                    checked={checkboxes.mother}
                    onChange={() => checkboxData("mother")}
                  />
                  &nbsp;&nbsp;
                  <label for="vehicle1">Select mother as Primary contact</label>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <Label>Mother’s Name</Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.mother}
                    isInvalid={checkboxes.mother && !parentData.MothersName}
                    name="MothersName"
                    value={(parentData.MothersName || "").replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    )}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                        setParentData({ ...parentData, [name]: value });
                      }
                    }}
                  />
                </MDBCol>
                <MDBCol>
                  <Label>Email Address</Label>
                  <br />
                  <StyledInput
                    type="email"
                    required={checkboxes.mother}
                    isInvalid={!mothersEmailValid} // Set isInvalid to the value of mothersEmailValid
                    name="MothersEmail"
                    onChange={(e) => {
                      const isValidEmail = emailRegex.test(e.target.value);
                      setmothersEmailValid(isValidEmail);
                      setParentData({
                        ...parentData,
                        MothersEmail: e.target.value,
                      });
                    }}
                    style={{
                      borderColor: !mothersEmailValid ? "#ffe9e9" : "",
                    }}
                    value={parentData.MothersEmail}
                  />
                  {!mothersEmailValid ? (
                    <EmailValid>Please Enter a valid email</EmailValid>
                  ) : (
                    ""
                  )}
                </MDBCol>
                <MDBCol>
                  <Label> Mobile Number </Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.mother}
                    isInvalid={checkboxes.mother && !parentData.MothersNumber}
                    id="form10Example3"
                    name="MothersNumber"
                    onChange={(event) => {
                      const { name, value } = event.target;
                      if (
                        /^[0-9]{0,10}$/.test(value) &&
                        (!isNaN(value) || value === "")
                      ) {
                        setParentData({ ...parentData, [name]: value });
                        if (value.length === 10) {
                          setisMotherNumberValid(false);
                        } else {
                          setisMotherNumberValid(true);
                        }
                      }
                    }}
                    value={(parentData.MothersNumber || "").replace(
                      /[^0-9]/g,
                      ""
                    )}
                  />
                  {isMotherNumberValid ? (
                    <EmailValid>Please enter a valid mobile number</EmailValid>
                  ) : (
                    ""
                  )}
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <Label>Occupation</Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.mother}
                    isInvalid={
                      checkboxes.mother && !parentData.MothersOccupation
                    }
                    id="form10Example3"
                    name="MothersOccupation"
                    onChange={change}
                    value={parentData.MothersOccupation}
                  />
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCardBody>
        </StyledCard>

        <StyledCard>
          <StyledHeading>
            <StyledSpan>3.</StyledSpan>Student’s Local Guardian’s Details
          </StyledHeading>
          <hr />
          <MDBCardBody>
            <div className="container">
              <MDBRow>
                <MDBCol>
                  <input
                    type="checkbox"
                    checked={checkboxes.guardian}
                    onChange={() => checkboxData("guardian")}
                  />
                  &nbsp;&nbsp;
                  <label for="Guardianprimary">
                    Select Guardian as Primary contact{" "}
                  </label>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <Label>Describe Relation</Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.guardian}
                    isInvalid={
                      checkboxes.guardian && !parentData.GuardianRelation
                    }
                    name="GuardianRelation"
                    onChange={change}
                    value={(parentData.GuardianRelation || "").replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    )}
                  />
                </MDBCol>

                <MDBCol>
                  <Label>Guardian Name</Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.guardian}
                    isInvalid={checkboxes.guardian && !parentData.GuardianName}
                    name="GuardianName"
                    value={(parentData.GuardianName || "").replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    )}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                        setParentData({ ...parentData, [name]: value });
                      }
                    }}
                  />
                </MDBCol>
                <MDBCol>
                  <Label>Email Address</Label>
                  <br />
                  <StyledInput
                    type="email"
                    required={checkboxes.guardian}
                    isInvalid={!gaurdianEmailValid}
                    name="GuardianEmail"
                    onChange={(e) => {
                      const isValidEmail = emailRegex.test(e.target.value);
                      setgaurdianEmailValid(isValidEmail);
                      setParentData({
                        ...parentData,
                        GuardianEmail: e.target.value,
                      });
                    }}
                    style={{
                      borderColor: !gaurdianEmailValid ? "#ffe9e9" : "",
                    }}
                    value={parentData.GuardianEmail}
                  />
                  {!gaurdianEmailValid ? (
                    <EmailValid>Please Enter a valid email</EmailValid>
                  ) : (
                    ""
                  )}
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <Label> Mobile Number </Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.guardian}
                    isInvalid={
                      checkboxes.guardian && !parentData.GuardianNumber
                    }
                    name="GuardianNumber"
                    onChange={(event) => {
                      const { name, value } = event.target;
                      if (
                        /^[0-9]{0,10}$/.test(value) &&
                        (!isNaN(value) || value === "")
                      ) {
                        setParentData({ ...parentData, [name]: value });
                        if (value.length === 10) {
                          setisGaurdianNumberValid(false);
                        } else {
                          setisGaurdianNumberValid(true);
                        }
                      }
                    }}
                    value={(parentData.GuardianNumber || "").replace(
                      /[^0-9]/g,
                      ""
                    )}
                  />
                  {isGaurdianNumberValid ? (
                    <EmailValid>Please enter a valid mobile number.</EmailValid>
                  ) : (
                    ""
                  )}
                </MDBCol>
                <MDBCol>
                  <Label>Occupation</Label>
                  <br />
                  <StyledInput
                    type="text"
                    required={checkboxes.guardian}
                    isInvalid={
                      checkboxes.guardian && !parentData.GuardianOccupation
                    }
                    name="GuardianOccupation"
                    onChange={change}
                    value={parentData.GuardianOccupation}
                  />
                </MDBCol>
                <MDBCol></MDBCol>
              </MDBRow>
            </div>
          </MDBCardBody>
        </StyledCard>

        <LastDiv className="container">
          <StyledButton2 onClick={Previous} type="button">
            Previous
          </StyledButton2>
          <StyledButton type="submit">Next</StyledButton>
        </LastDiv>

        <Modal
          size="sm"
          show={isOpen}
          onHide={onClose}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <ModalText style={{ color: "red" }}>
            Please select one of them as the primary contact.
          </ModalText>
        </Modal>
      </form>
    </Main>
  );
}

export default ParentDetials;
