import React, { useState } from "react";
import Pg1 from "./Images/Pg-2-1.png";
import Pg2 from "./Images/Pg-1-1.png";
import Pg3 from "./Images/Pg-3-3.png";
import Pg4 from "./Images/Pg-4-4.png";

import {  MDBNavbarBrand, MDBRow } from "mdb-react-ui-kit";
import {
  Label,
  StyledButton,
  StyledButton2,
  StyledHeading,
  StyledInput,
  StyledSpan,
  Colum,
  YesorNo,
  LastDiv,
  StyledCard,
  Main,
  SubText,
  EmailValid,
} from "./AdmissionStyles";

function OthersSection({
  otherData,
  change,
  Submit,
  Previous,
  accomadationSelect,
  Relatives,
  accomadation,
  relatives,
  SelectedClass,
  setOtherData

}) {
  const [whatsappnumberValid, setWhatsappnumberValid] = useState(false)
  return (
    <Main>
     <div style={{ padding: "10px",marginLeft:"20px" }}
          className="d-flex gap-5 flex-wrap">
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

      

      <form onSubmit={Submit}>
        <StyledCard>
          <StyledHeading>
            <StyledSpan>1.</StyledSpan>Student’s Needs and Facility
          </StyledHeading>
          <div style={{ marginLeft: "25px" }}>
            <div className="d-flex gap-4 flex-wrap">
              <div>
                <Label>Whatsapp Number </Label>
                <br />
                <StyledInput
                  type="number"
                  name="WhatsappNumber"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    if (
                      /^[0-9]{0,10}$/.test(value) &&
                      (!isNaN(value) || value === "")
                    ) {
                      setOtherData({ ...otherData, [name]: value });
                      if (value.length === 10) {
                        setWhatsappnumberValid(false);
                      }
                      else{
                        setWhatsappnumberValid(true);
                      }
                    }
                  }}
                  value={(otherData.WhatsappNumber || "").replace(
                    /[^0-9]/g,
                    ""
                  )}
                
                />
                {whatsappnumberValid ? (
                    <EmailValid>Please enter a valid Whatsapp number.</EmailValid>
                  ) : (
                    ""
                  )}
              </div>
              <div>
                <Label> Identification mark</Label>
                <br />
                <StyledInput
                  type="text"
                  name="identificationMark"
                  onChange={change}
                  value={otherData.identificationMark}
                  isInvalid={!otherData.identificationMark}
                  required
                />
              </div>
            </div>
          
              <div className="d-flex gap-4 flex-wrap">
                <div>
                  <Label>Extra-Curricular Activities and Interests</Label>
                  <br />
                  <StyledInput
                    type="text"
                    name="ExtraCaricularActivity"
                    onChange={change}
                    value={(otherData.ExtraCaricularActivity || "").replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    )}
                  />
                  <SubText>
                    *certificate to be produced at time of interview
                  </SubText>
                </div>

                <div>
                  <Label>Career Aims/Intended Profession</Label>
                  <br />
                  <StyledInput
                    type="text"
                    name="CareerAims"
                    onChange={change}
                    value={(otherData.CareerAims || "").replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    )}
                  />
                </div>
              </div>
        
            <MDBRow>
              <Colum className="col">
                <Label>
                  <StyledSpan>1.</StyledSpan> Do you Want Hostel Accomadation ?
                </Label>
                <br />
                <div style={{ marginTop: "5px" }} className="d-flex gap-4">
                  <YesorNo
                    id="yes"
                    name="Accomadation"
                    type="button"
                    onClick={() => accomadationSelect("Yes")}
                    style={{
                      backgroundColor:
                        accomadation === "Yes" ? "#ccc" : "#ececec",
                    }}
                  >
                    Yes
                  </YesorNo>
                  <YesorNo
                    id="No"
                    name="Accomadation"
                    type="button"
                    onClick={() => accomadationSelect("No")}
                    style={{
                      backgroundColor:
                        accomadation === "No" ? "#ccc" : "#ececec",
                    }}
                  >
                    No
                  </YesorNo>
                </div>
              </Colum>
            </MDBRow>

            <MDBRow>
              <Colum className="col">
                <Label>
                  <StyledSpan>2.</StyledSpan>Do any of your siblings currently
                  attend this school ?
                </Label>
                <br />
                <div style={{ marginTop: "20px" }} className="d-flex gap-4">
                  <YesorNo
                    id="yes"
                    name="RelativeHere?"
                    type="button"
                    onClick={() => Relatives("Yes")}
                    style={{
                      backgroundColor: relatives === "Yes" ? "#ccc" : "#ececec",
                    }}
                  >
                    Yes
                  </YesorNo>
                  <YesorNo
                    id="No"
                    name="RelativeHere?"
                    type="button"
                    onClick={() => Relatives("No")}
                    style={{
                      backgroundColor: relatives === "No" ? "#ccc" : "#ececec",
                    }}
                  >
                    No
                  </YesorNo>
                </div>
                {relatives === "Yes" && (
                  <div className="d-flex gap-3 flex-wrap" style={{marginBottom:"15px"}}>
                    <div>
                      <Label>Siblings Name</Label>
                      <br />
                      <StyledInput
                        type="text"
                        name="SiblingsName"
                        onChange={change}
                        value={(otherData.SiblingsName || "").replace(
                          /[^a-zA-Z\s]/g,
                          ""
                        )}
                      />
                    </div>

                    <div>
                      <Label>Siblings Admission No</Label>
                      <br />
                      <StyledInput
                        type="text"
                        name="SiblingsAdissionNo"
                        onChange={change}
                        value={otherData.SiblingsAdissionNo}
                        isInvalid={!otherData.SiblingsAdissionNo}
                        required
                      />
                    </div>
                  </div>
                )}
              </Colum>
            </MDBRow>
          </div>
        </StyledCard>
        <LastDiv className="container">
          <StyledButton2 onClick={Previous} type="button">
            Previous
          </StyledButton2>

          <StyledButton type="submit">Submit</StyledButton>
        </LastDiv>
      </form>
    </Main>
  );
}

export default OthersSection;
