import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function LegalDocuments() {
  const data = useSelector((state: any) => state.transport?.vehicleProfileData);

  return (
    <div className="documents-tab">
      <Row>
        <Col md={12} className="document-container">
          {data.docs?.length > 0
            ? data.docs?.map((items: any, index: number) => {
                return (
                  <div className="documents">
                    <img
                      //   src="https://thumbs.dreamstime.com/b/documents-personal-data-vector-illustration-flat-cartoon-paper-document-pile-stack-user-profile-photo-concept-99409107.jpg"
                      src={
                        data.doc_path
                          ? data.doc_path
                          : "https://www.millenniumpost.in/h-upload/2021/06/17/570807-3852oryirutsedtmieztu4dnflbgqgkfcqcd8833629.jpg"
                      }
                      alt=""
                    />
                    <div key={index} className="document-title">
                      {items.document_name + " - Exp : " + items.expiry_date}
                    </div>
                  </div>
                );
              })
            : "No documents Found"}
        </Col>
      </Row>
    </div>
  );
}

export default LegalDocuments;
