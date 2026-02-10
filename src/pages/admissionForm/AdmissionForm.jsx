  import React, { useState } from "react";

  import {
    MDBRow,
    MDBCol,
    MDBNavbarBrand,
    MDBCardBody,
  } from "mdb-react-ui-kit";
  import Pg1 from "./Images/Pg-1-1.png";
  import Pg2 from "./Images/Pg-1-2.png";
  import Pg3 from "./Images/Pg-1-3.png";
  import Pg4 from "./Images/Pg-1-4.png";
  import {
    Ddown,
    Label,
    Pnote,
    StyledButton,
    StyledHeading,
    StyledInput,
    StyledSpan,
    Tnote,
    Colum,
    Year,
    Categeory,
    Gender,
    Main,
    StyledCard,
    HeadCard,
    LastDiv,
    EmailValid,
  } from "./AdmissionStyles";
  import { Form } from "react-bootstrap";

  function AdmissionForm({
    formData,
    setFormData,
    change,
    Submit,
    Country,
    Religion,
    Class,
    GenderSelect,
    YearSelect,
    gender,
    categeory,
    year,
    SelectedClass,
    setcheckadhaar,
    CategeorySelect,
    selectedCategory,
   
  }) {
    const [isadhaarValid, setisadhaarValid] = useState(false);
    return (
      <Main>
        <>
          <div style={{ padding: "10px",marginLeft:"20px" }}
            className="d-flex gap-5 flex-wrap">
            <MDBNavbarBrand>
                <img src={Pg1} height="18px" alt="" loading="lazy" />
              </MDBNavbarBrand>
              <MDBNavbarBrand>
                <img src={Pg2} height="18px" alt="" loading="lazy" />
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
        </>
        <Form onSubmit={Submit}>
          <HeadCard>
            <div className="container">
              <Tnote>
                <Pnote>
                  Note: Registration Fee Rs 500 Charged for submission
                </Pnote>
              </Tnote>
              <MDBRow>
                <MDBCol>
                  <Label>Class Of Admission</Label> <br />
                  <Ddown
                  id="classOfAdmission"
                    name="classOfAdmission"
                    type="text"
                    onChange={change}
                    value={formData.classOfAdmission}
                    required
                    isInvalid={!formData.classOfAdmission}
                  >
                    <option value="">Select Class</option>
                    {Class.map((Class) => (
                      <option key={Class.class_name} value={Class.id}>
                        {Class.class_name}
                      </option>
                    ))}
                  </Ddown>
                </MDBCol>

                <Colum className="col">
                  <Label>Academic Year</Label>

                  <br />
                  <div className="d-flex gap-4" style={{ marginLeft: "-10px" }}>
                    <Year
                      type="button"
                      id="year1"
                      onClick={() => YearSelect("2024-2025")}
                      style={{
                        backgroundColor:
                          year === "2024-2025" ? "#ccc" : "#ececec",
                      }}
                    >
                      2024-2025
                    </Year>

                    <Year
                      type="button"
                      id="year2"
                      onClick={() => YearSelect("2025-2026")}
                      style={{
                        backgroundColor:
                          year === "2025-2026" ? "#ccc" : "#ececec",
                      }}
                    >
                      2025-2026
                    </Year>
                  </div>
                </Colum>
              </MDBRow>
            </div>
          </HeadCard>

          <StyledCard>
            <StyledHeading>
              <StyledSpan>1.</StyledSpan>Student’s Personal Details
            </StyledHeading>

            <hr />
            <MDBCardBody>
              <div className="container">
                <MDBRow>
                  <MDBCol>
                    <Label>Name</Label>
                    <br />
                    <StyledInput
                    id="studentname"
                      type="text"
                      placeholder="Enter First Name & Last Name"
                      name="Name"
                      value={(formData.Name || "").replace(/[^a-zA-Z\s]/g, "")}
                      onChange={(event) => {
                        const { name, value } = event.target;
                        if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                          setFormData({ ...formData, [name]: value });
                        }
                      }}
                      isInvalid={!formData.Name}
                      required
                    />
                   

                  </MDBCol>
                  <Colum className="col">
                    <Label>Gender</Label>
                    <br />
                    <div className="d-flex gap-4" style={{ marginLeft: "-7px" }}>
                      <Gender
                        type="button"
                        id="male"
                        name="Gender"
                        onClick={() => GenderSelect("Male")}
                        style={{
                          backgroundColor: gender === "Male" ? "#ccc" : "#ececec",
                        }}
                      >
                        Male
                      </Gender>

                      <Gender
                        type="button"
                        id="Female"
                        name="Gender"
                        onClick={() => GenderSelect("Female")}
                        style={{
                          backgroundColor:
                            gender === "Female" ? "#ccc" : "#ececec",
                        }}
                      >
                        Female
                      </Gender>
                    </div>
                  </Colum>
                  <MDBCol>
                    <Label>Date Of Birth</Label>
                    <br />
                    <StyledInput
                    id="Dob"
                      type="date"
                      name="Dob"
                      onChange={change}
                      value={formData.Dob}
                      isInvalid={!formData.Dob}
                      required
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <Label>Aadhaar No</Label>
                    <br />
                    <StyledInput
                    id="AadhaarNo"
                      type="text"
                      placeholder="Enter 12 digit Number"
                      name="AadhaarNo"
                      onChange={(event) => {
                        const { name, value } = event.target;
                        if (
                          /^[0-9]{0,12}$/.test(value) &&
                          (!isNaN(value) || value === "")
                        ) {
                          setFormData({ ...formData, [name]: value });
                          if (value.length === 12) {
                            setisadhaarValid(false);
                            setcheckadhaar(true);
                          } else {
                            setisadhaarValid(true);
                            setcheckadhaar(false);
                          }
                        }
                      }}
                      value={(formData.AadhaarNo || "").replace(/[^0-9]/g, "")}
                      isInvalid={!formData.AadhaarNo}
                      required
                    />

                    {isadhaarValid ? (
                      <EmailValid>Please enter a valid Aadhaar number</EmailValid>
                    ) : (
                      ""
                    )}
                  </MDBCol>
                  <MDBCol>
                    <Label>Country</Label>
                    <br />
                    <Ddown
                    id="Country"
                      name="Country"
                      onChange={change}
                      value={formData.Country}
                      isInvalid={!formData.Country}
                      required
                    >
                      <option value="">Select Country</option>
                      {Country.map((country,index) => (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Ddown>
                  </MDBCol>
                  <MDBCol>
                    <Label>Mother Tongue</Label>
                    <br />
                    <StyledInput
                    id="MotherTongue"
                      type="text"
                      placeholder="Enter Language"
                      name="MotherTongue"
                      onChange={change}
                      required
                      value={formData.MotherTongue}
                      isInvalid={!formData.MotherTongue}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <Label>Religion</Label>
                    <br />
                    <Ddown
                    id="Religion"
                      name="Religion"
                      onChange={change}
                      value={formData.Religion}
                      required
                      isInvalid={!formData.Religion}
                    >
                      <option value=""> Select Religion</option>
                      {Religion.map((Religion) => (
                        <option key={Religion.name} value={Religion.id}>
                          {Religion.name}
                        </option>
                      ))}
                    </Ddown>
                  </MDBCol>
                  <MDBCol>
                    <Label>Caste</Label>
                    <br />
                    <StyledInput
                    id="Caste"
                      type="text"
                      placeholder="Enter Caste"
                      name="Caste"
                      onChange={change}
                      value={formData.Caste}
                    />
                  </MDBCol>

                  <MDBCol></MDBCol>
                </MDBRow>

                <MDBRow>
                  <Colum className="col">
                    <Label>Category</Label>

                    <br />
                    <div className="d-flex gap-4 flex-wrap" style={{ marginLeft: "-7px" }}>
                      {categeory.map((categeory) => (
                        <Categeory
                          key={categeory.id}
                          value={categeory.id}
                          type="button"
                          name="Category"
                          onClick={() => CategeorySelect(categeory.id)}
                          style={{
                            backgroundColor:
                            selectedCategory === categeory.id ? "#ccc" : "#ececec",
                            width:
                            categeory.id === "333" ? "120px" :
                            categeory.id === "264" ? "70px" : "",
                            
                          }}
                        >
                          {categeory.name}
                        </Categeory>
                      ))}
                    </div>
                  </Colum>
                </MDBRow>
              </div>
            </MDBCardBody>
          </StyledCard>

          <StyledCard>
            <StyledHeading>
              <StyledSpan>2.</StyledSpan>Student’s Permanent Address
            </StyledHeading>
            <hr />
            <MDBCardBody>
              <div className="container">
                <MDBRow>
                  <MDBCol>
                    <Label>House Name / Flat No </Label>
                    <br />
                    <StyledInput
                    id="HouseName"
                      type="text"
                      name="HouseName"
                      onChange={change}
                      value={formData.HouseName}
                      required
                      isInvalid={!formData.HouseName}
                    />
                  </MDBCol>
                  <MDBCol>
                    <Label>Place/Street</Label>
                    <br />
                    <StyledInput
                    id="PlaceStreet"
                      type="text"
                      name="PlaceStreet"
                      onChange={change}
                      value={formData.PlaceStreet}
                      isInvalid={!formData.PlaceStreet}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <Label> Post Office </Label>
                    <br />
                    <StyledInput
                    id="PostOffice"
                      type="text"
                  
                      name="PostOffice"
                      onChange={change}
                      value={formData.PostOffice}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <Label>State</Label>
                    <br />
                    <StyledInput
                    id="PremState"
                      type="text"
                      name="PremState"
                      onChange={change}
                      value={formData.PremState}
                      isInvalid={!formData.PremState}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <Label>Pincode</Label>
                    <br />
                    <StyledInput
                    id="Pincode"
                      type="text"
                      name="Pincode"
                      onChange={change}
                      value={(formData.Pincode || "").replace(/[^0-9]/g, "")}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <Label> Country</Label>
                    <br />
                    <Ddown
                    id="p_country"
                      name="p_country"
                      onChange={change}
                      value={formData.p_country}
                      required
                      isInvalid={!formData.p_country}
                    >
                      <option value="">Select Country</option>
                      {Country.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Ddown>
                  </MDBCol>
                </MDBRow>
              </div> 
            </MDBCardBody>
          </StyledCard>

          <StyledCard>
            <StyledHeading>
              <StyledSpan>3.</StyledSpan>Student’s Previous School
            </StyledHeading>
            <hr />
            <MDBCardBody>
              <div className="container">
                <MDBRow>
                  <MDBCol>
                    <Label>School Name </Label>
                    <br />
                    <StyledInput
                      type="text"
                      name="prev_SchoolName"
                      onChange={change}
                      value={formData.prev_SchoolName}
                    />
                  </MDBCol>
                  <MDBCol>
                    <Label>Class</Label>
                    <br />

                    <StyledInput
                      type="text"
                      name="prev_Class"
                      onChange={change}
                      value={formData.prev_Class}
                    />
                  </MDBCol>
                  <MDBCol>
                    <Label> Board </Label>
                    <br />

                    <Ddown
                      name="prev_Board"
                      onChange={change}
                      value={formData.prev_Board}
                    >
                      <option value=""> Select Board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="Kerala State">Kerala State</option>
                      <option value="Others..">Others..</option>
                    </Ddown>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <Label>State</Label>
                    <br />

                    <StyledInput
                      type="text"
                      name="Prev_State"
                      onChange={change}
                      value={formData.Prev_State}
                    />
                  </MDBCol>
                  <MDBCol>
                    <Label>Country</Label>
                    <br />
                    <Ddown
                      name="Prev_Country"
                      onChange={change}
                      value={formData.Prev_Country}
                    >
                      <option value="">Select Country</option>
                      {Country.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Ddown>
                  </MDBCol>
                  <MDBCol></MDBCol>
                </MDBRow>
              </div>
            </MDBCardBody>
          </StyledCard>

          <LastDiv className="container">
            <StyledButton type="submit">Next</StyledButton>
          </LastDiv>
        </Form>
      </Main>
    );
  }

  export default AdmissionForm;
