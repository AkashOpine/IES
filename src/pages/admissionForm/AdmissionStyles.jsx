import styled from "styled-components";
import down from "./Images/down.png";
import { CiSquarePlus } from "react-icons/ci";
import { MDBCard } from "mdb-react-ui-kit";
import Form from 'react-bootstrap/Form';

export const Main = styled.div`
  background: #faf9f6;
`;
export const HeadCard = styled(MDBCard)`
  border: none;
  margin: 18px 18px 20px 18px;
  padding: 15px;
  border-radius: 15px;
`;
export const StyledCard = styled(MDBCard)`
  border: none;
  margin: 20px 18px 20px 18px;
`;
export const LastDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const Tnote = styled.div`
  display: flex;
  width: 80vw;
  height: 43px;
  border-radius: 10px;
  border: 2px dotted #ff0000;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #ffe9e9;
  // padding-top: 8px;
`;
export const Pnote = styled.p`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0em;
`;
export const Ddown = styled(Form.Select)`
  width: 250px;
  height: 45px;
  border: 0.5px solid #bfbfbf;
  font-size: 13px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 6px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  padding-right: 26px;

  background-image: url(${down});
  opacity: 0.8;
  background-repeat: no-repeat;
  background-position: calc(100% - 5px) center;
`;

export const MarksDdown = styled(Form.Select)`
  width: 250px;
  height: 45px;
  border: 0.5px solid #bfbfbf;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 6px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  padding-right: 26px;

  background-image: url(${down});
  opacity: 0.8;
  background-repeat: no-repeat;
  background-position: calc(100% - 5px) center;
`;
export const CourseDdown = styled(Form.Select)`
  width: 250px;
  height: 45px;
  border: 0.5px solid #bfbfbf;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 6px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  padding-right: 26px;

  background-image: url(${down});
  opacity: 0.8;
  background-repeat: no-repeat;
  background-position: calc(100% - 5px) center;
`;

export const SubCourse = styled(Form.Control)`
  width: 250px;
  height: 45px;
  border: 0.5px solid #bfbfbf;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 6px;
`;
export const StyledInput = styled(Form.Control)`
  width: 250px;
  height: 45px;
  border: 0.5px solid #bfbfbf;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 6px;
`;
export const StyledHeading = styled.p`
  width: 283px;
  height: 19px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 9px;
  padding-left: 20px;
`;
export const StyledButton = styled.button`
  width: 130px;
  height: 40px;
  border-radius: 12px;
  border: none;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #ff0000;
`;
export const StyledButton2 = styled.button`
  width: 130px;
  height: 40px;
  border-radius: 12px;
  border: none;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #000000;
`;

export const StyledSpan = styled.span`
  color: red;
  margin-right: 5px;
`;
export const StyledInput2 =styled(Form.Control)`
  width: 130px;
  height: 40px;
  border: 0.5px solid #bfbfbf;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 6px;

`;
export const OpitonalSubject = styled(Form.Control)`
  width: 200px;
  height: 45px;
  border: 0.5px solid #bfbfbf;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 6px;
`;

export const Head = styled.label`

  height: 17px;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 13px;
`;

export const MarkHeading = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  margin-left:20px;
  margin-top:5px;
`;
export const BoardLang = styled.label`

  height: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: -10px;
`;
export const LangBoard = styled.label`

  height: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  margin-top: 6px;
  text-align: left;
 
`;
export const Label = styled.label`
  
  height: 17px;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  padding-top: 18px;
  margin-top: 6px;
`;
export const Colum = styled.div`
  padding-top: 6px;
  gap: 3px;
  display: flex;
  flex-direction: column;
`;
export const Year = styled.button`
  background-color: #ececec;
  btncolor: #ececec;
  width: 100px;
  height: 37px;
  border-radius: 25px;
  border: 1px;
  margin-left: 5px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;

export const Categeory = styled.button`
  width: 50px;
  height: 35px;
  border-radius: 20px;
  border: 1px;
  margin-left: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;
export const Gender = styled.button`
  color: #000; /* Added color for button text */
  width: 70px;
  height: 37px;
  border-radius: 25px;
  border: 1px solid transparent; /* Added border for better visibility */
  margin-left: 3px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #000000;

  letter-spacing: 0em;
`;
export const YesorNo = styled.button`
  color: #000;
  width: 70px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid transparent;
  margin-left: 3px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;
export const AddButtton = styled.button`
  width: 250px;
  height: 40px;
  color: black;
  border: 0.5px dotted #bfbfbf;
  border-radius: 8px;
  padding-left: 10px;

  align-items: center;
  margin-top: 6px;
  background-color: #ececec;

  font-size: 11px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;
export const StyledIcon = styled(CiSquarePlus)`
  width: 20px;
  height: 20px;
  margin-left: 125px;
`;
export const CourseBtn = styled.button`
  color: #000; /* Added color for button text */
  width: 100px;
  height: 38px;
  border-radius: 15px;
  border: 1px solid transparent; /* Added border for better visibility */
  margin-left: 3px;
  margin-top: 7px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: #000000;
`;
export const EmailValid = styled.div`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0em;
  text-align: left;
  color: #ff0000;
`;
export const ModalText = styled.h6`
  height: 30px;
  padding-top: 7px;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0em;
`;
export const SubText = styled.p`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  color: #ff0000;
`;
export const SubmitedDIv = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const SubmitedCard = styled(MDBCard)`
display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;
  height: 75vh;
  width:60vw;
`;
export const SubmitedLogo = styled.img`
width:80px;
height:70px;
`;
export const SubmitedText = styled.h5`
font-family: 'Inter', sans-serif; 
font-size: 30px;
font-weight: 400;
line-height: 36.31px;
text-align: center;
color:#4D4D4D;
`;
export const SubmitedSubText = styled.p`
font-family: 'Inter', sans-serif; 
font-size: 22px;
font-weight: 400;
line-height: 26.63px;
text-align: center;
color:#000000;
`;
export const AdmissionID = styled.span`
font-family: 'Inter', sans-serif; 
font-size: 22px;
line-height: 26.63px;
  letter-spacing: 0em;
  text-align: left;
  color: #ff0000;
`;