import Pg1 from "./Images/Pg-2-1.png";
import Pg2 from "./Images/Pg-1-1.png";
import Pg3 from "./Images/Pg-3-3.png";
import Pg4 from "./Images/Pg-1-4.png";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBNavbarBrand,
  MDBRow,
} from "mdb-react-ui-kit";
import {
  BoardLang,
  CourseBtn,
  CourseDdown,
  Head,
  LangBoard,
  LastDiv,
  Main,
  MarkHeading,
  MarksDdown,
  OpitonalSubject,
  StyledButton,
  StyledButton2,
  StyledHeading,
  StyledInput2,
  StyledSpan,
  SubCourse,
} from "./AdmissionStyles";
function MarkSection({
  markData,
  change,
  Next,
  Previous,
  icseCourse,
  IcseCoursefunction,
  selectInputs,
  handleCategoryTypeChange,

  options,
  selectCourse,
}) {
  return (
    <Main>
      <div
        style={{ padding: "10px", marginLeft: "20px" }}
        className="d-flex gap-5 flex-wrap"
      >
        <MDBNavbarBrand>
          <img src={Pg2} height="18px" alt="" loading="lazy" />
        </MDBNavbarBrand>
        <MDBNavbarBrand>
          <img src={Pg1} height="18px" alt="" loading="lazy" />
        </MDBNavbarBrand>
        <MDBNavbarBrand>
          <img src={Pg3} height="18px" alt="" loading="lazy" />
        </MDBNavbarBrand>
        <MDBNavbarBrand>
          <img src={Pg4} height="18px" alt="" loading="lazy" />
        </MDBNavbarBrand>
      </div>
      <form onSubmit={Next}>
        <StyledHeading>
          <StyledSpan>1.</StyledSpan>Student’s Mark and Select Course
        </StyledHeading>
        <hr />
        <div className="container">
          <MDBRow className="d-flex gap-5 flex-column">
            <MDBCol>
              <MDBCard style={{ overflow: "auto" }}>
                <MarkHeading>Select Course</MarkHeading>

                <MDBCardBody>
                  {selectInputs?.map((input) => (
                    <div key={input.id}>
                      <MDBCardTitle className="d-flex gap-4 flex-wrap">
                        <CourseDdown
                          value={input.categoryType}
                          onChange={(e) =>
                            handleCategoryTypeChange(input.id, e.target.value)
                          }
                        required
                        isInvalid={!input.categoryType}
                        disabled={input.categoryType.id}
                        >
                          <option value="">Select a category type</option>
                          {options?.map((option) => (
                            <option key={option.id} value={option.name}   >
                              {option.name}
                            </option>
                          ))}
                        </CourseDdown>

                        {input.categoryType && (
                          <div className="d-flex gap-4 flex-wrap">
                            <CourseDdown
                            required
                            isInvalid={!input.SelectedSubCourse}
                              value={input.SelectedSubCourse}
                              onChange={(e) =>
                                selectCourse(
                                  input.id,
                                  "SelectedSubCourse",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">select sub course</option>
                              {input.selectedOption.map((subItem) => (
                                <option key={subItem.id} value={subItem.name}>
                                  {subItem.name}
                                </option>
                              ))}
                            </CourseDdown>

                            {input.textInput.map((subItem, subIndex) => (
                              <SubCourse
                                type="text"
                                onChange={(e) =>
                                  selectCourse(
                                    "selectedMainCourse",
                                    e.target.value
                                  )
                                }
                                id={subIndex}
                                value={input.selectedMainCourse}
                                placeholder={subItem.name}
                                readOnly
                              />
                            ))}
                          </div>
                        )}
                      </MDBCardTitle>
                    </div>
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol>
              <MDBCard
                style={{
                  height: "auto",
                }}
              >
                <MarkHeading>Add 10th Standard Marks</MarkHeading>

                <MDBCardBody>
                  <MDBRow style={{ paddingLeft: "20px" }}>
                    <BoardLang> Board </BoardLang>
                    <br />
                    <MarksDdown
                      name="Board"
                      onChange={change}
                      value={markData.Board}
                      required
                      isInvalid={!markData.Board}
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="Kerala State">Kerala State</option>
                    </MarksDdown>
                  </MDBRow>
                  <br />
                  {markData.Board === "Kerala State" ? (
                    <>
                      
                      <MDBRow style={{ paddingLeft: "10px" }}>
                        <MDBCol>
                          <Head>English</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNEngligh"
                            onChange={change}
                            value={markData.MarkiNEngligh}
                            required
                            isInvalid={!markData.MarkiNEngligh}
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Maths</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNMaths"
                            onChange={change}
                            value={markData.MarkiNMaths}
                            isInvalid={!markData.MarkiNMaths}
                            required
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Social Science</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNSocialScience"
                            onChange={change}
                            value={markData.MarkiNSocialScience}
                            
                            isInvalid={!markData.MarkiNSocialScience}
                            required
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Language </Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNLanguage"
                            onChange={change}
                            value={markData.MarkiNLanguage}
                            isInvalid={!markData.MarkiNLanguage}
                            required
                          />
                        </MDBCol>

                        <MDBCol>
                          <Head>Malayalam1</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNMalayalam1"
                            onChange={change}
                            value={markData.MarkiNMalayalam1}
                            isInvalid={!markData.MarkiNMalayalam1}
                            required
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow style={{ paddingLeft: "10px" }}>
                        <MDBCol>
                          <Head>Physics</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNPhysics"
                            onChange={change}
                            value={markData.MarkiNPhysics}
                            isInvalid={!markData.MarkiNPhysics}
                            required
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Chemistry</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNChemistry"
                            onChange={change}
                            value={markData.MarkiNChemistry}
                            isInvalid={!markData.MarkiNChemistry}
                            required
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Biology</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNBiology"
                            onChange={change}
                            value={markData.MarkiNBiology}
                            isInvalid={!markData.MarkiNBiology}
                            required
                          />
                        </MDBCol>

                        <MDBCol>
                          <Head>Hindi</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNHindi"
                            onChange={change}
                            value={markData.MarkiNHindi}
                            isInvalid={!markData.MarkiNHindi}
                            required
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Computer Application</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNComputerApplication"
                            onChange={change}
                            value={markData.MarkiNComputerApplication}
                            isInvalid={!markData.MarkiNComputerApplication}
                            required
                          />
                        </MDBCol>
                      </MDBRow>
                    </>
                  ) : markData.Board === "ICSE" ? (
                    <>
                      <MDBRow style={{ paddingLeft: "10px" }}>
                        <MDBCol>
                          <LangBoard> Language </LangBoard>
                          <br />
                          <MarksDdown
                            required
                            name="Language"
                            onChange={change}
                            isInvalid={!markData.Language}
                            value={markData.Language}
                          >
                            <option value="">Select Language</option>
                            <option value="Malayalam">Malayalam</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Arabic">Arabic</option>
                          </MarksDdown>
                        </MDBCol>

                        <MDBCol>
                          <LangBoard> Optional Subject </LangBoard>
                          <br />
                          <OpitonalSubject
                            type="text"
                            name="OptionalSubject"
                            placeholder="Enter your optional subject"
                            onChange={change}
                            value={(markData.OptionalSubject || "").replace(
                              /[^a-zA-Z\s]/g,
                              ""
                            )}
                            required
                            isInvalid={!markData.OptionalSubject}
                          />
                        </MDBCol>

                        <MDBCol
                          style={{
                            paddingTop: "15px",
                            display: "flex",
                            gap: "35px",
                            paddingLeft: "25px",
                          }}
                        >
                          <CourseBtn
                            type="button"
                            onClick={() => IcseCoursefunction("Science")}
                            style={{
                              backgroundColor:
                                icseCourse === "Science" ? "#ccc" : "#ececec",
                            }}
                            value="Science"
                          >
                            Science
                          </CourseBtn>
                          <CourseBtn
                            type="button"
                            onClick={() =>
                              IcseCoursefunction("Commerical Studies")
                            }
                            style={{
                              backgroundColor:
                                icseCourse === "Commerical Studies"
                                  ? "#ccc"
                                  : "#ececec",
                              width: "150px",
                            }}
                            value="Commerical Studies"
                          >
                            Commerical Studies
                          </CourseBtn>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow style={{ paddingLeft: "10px" }}>
                        <MDBCol>
                          <Head>{icseCourse}</Head>
                          <br />
                          <StyledInput2
                            required
                            isInvalid={!markData.icseCourse}
                            type="text"
                            name={`MarkiN${icseCourse.replace(" ", "")}`}
                            onChange={change}
                            value={
                              markData[`MarkiN${icseCourse.replace(" ", "")}`]
                            }
                          />
                        </MDBCol>

                        <MDBCol>
                          <Head>Maths</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNMaths"
                            onChange={change}
                            value={markData.MarkiNMaths}
                            required
                            isInvalid={!markData.MarkiNMaths}
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Social Science</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNSocialScience"
                            onChange={change}
                            value={markData.MarkiNSocialScience}
                            required
                            isInvalid={!markData.MarkiNSocialScience}
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Language</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNLanguage"
                            onChange={change}
                            value={markData.MarkiNLanguage}
                            required
                            isInvalid={!markData.MarkiNLanguage}
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>English</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNEnglish"
                            onChange={change}
                            value={markData.MarkiNEnglish}
                            required
                            isInvalid={!markData.MarkiNEnglish}
                          />
                        </MDBCol>

                        <MDBCol>
                          <Head>Optional Subject</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNOptionalSubject"
                            onChange={change}
                            value={markData.MarkiNOptionalSubject}
                            required
                            isInvalid={!markData.MarkiNOptionalSubject}
                          />
                        </MDBCol>
                      </MDBRow>
                    </>
                  ) : (
                    <>
                      <MDBRow style={{ paddingLeft: "20px" }}>
                        <LangBoard> Language</LangBoard>
                        <br />
                        <MarksDdown
                          name="Language"
                          onChange={change}
                          value={markData.Language}
                          required
                          isInvalid={!markData.Language}
                        >
                          <option value=""> Select Language</option>
                          <option value="Malayalam">Malayalam</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Arabic">Arabic</option>
                        </MarksDdown>
                      </MDBRow>

                      <MDBRow style={{ paddingLeft: "10px" }}>
                        <MDBCol>
                          <Head>Science</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNScience"
                            onChange={change}
                            value={markData.MarkiNScience}
                            required
                            isInvalid={!markData.MarkiNScience}
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Maths</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNMaths"
                            onChange={change}
                            value={markData.MarkiNMaths}
                            required
                            isInvalid={!markData.MarkiNMaths}
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>Social Science</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNSocialScience"
                            onChange={change}
                            value={markData.MarkiNSocialScience}
                            required
                            isInvalid={!markData.MarkiNSocialScience}
                          />
                        </MDBCol>

                        <MDBCol>
                          <Head>Language</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNLanguage"
                            onChange={change}
                            value={markData.MarkiNLanguage}
                            required
                            isInvalid={!markData.MarkiNLanguage}
                          />
                        </MDBCol>
                        <MDBCol>
                          <Head>English</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNEnglish"
                            onChange={change}
                            value={markData.MarkiNEnglish}
                            required
                            isInvalid={!markData.MarkiNEnglish}
                          />
                        </MDBCol>

                        <MDBCol>
                          <Head>Computer Application</Head>
                          <br />
                          <StyledInput2
                            type="text"
                            name="MarkiNComputerApplication"
                            onChange={change}
                            value={markData.MarkiNComputerApplication}
                            required
                            isInvalid={!markData.MarkiNComputerApplication}
                          />
                        </MDBCol>
                      </MDBRow>
                    </>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>

        <LastDiv className="container">
          <StyledButton2 onClick={Previous} type="button">
            Previous
          </StyledButton2>

          <StyledButton type="submit">Next</StyledButton>
        </LastDiv>
      </form>
    </Main>
  );
}

export default MarkSection;
