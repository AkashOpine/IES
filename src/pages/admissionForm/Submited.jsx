
import SubmittedImg from "./Images/Submitted.png";
import { AdmissionID, SubmitedCard, SubmitedDIv, SubmitedLogo, SubmitedSubText, SubmitedText } from "./AdmissionStyles";
import { useEffect } from "react";


function Submited(studentId) {

  
  return (
    <SubmitedDIv>

<SubmitedCard>
<div className="d-flex flex-column gap-4 align-items-center">
  <SubmitedLogo src={SubmittedImg} alt="" />
  <SubmitedText>Registration Successfully Completed </SubmitedText>
  <SubmitedSubText>Your Application Number <AdmissionID>{studentId.studentId.student_id}</AdmissionID> </SubmitedSubText>
</div>

</SubmitedCard>

    </SubmitedDIv>
  )
}

export default Submited