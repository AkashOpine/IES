import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { tryPasswordReset, tryUserLogin } from "../../slices/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FaEnvelope, FaLock, FaMailBulk, FaUserAlt } from "react-icons/fa";
export function ForgotPassword() {
  const login: any = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <div className="loginFormContainer">
            <div className="row">
              <div className="col-md-12">
                <h3 className="landingLogo">Education ERP</h3>
              </div>
              <div className="col-md-12 landingSignIn">
                Forgot your password?
              </div>
              <div className="col-md-12">
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  // validate={values => {

                  //   const errors = {};

                  //   if (!values.email) {

                  //     errors.email = 'Required';

                  //   } else if (

                  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)

                  //   ) {

                  //     errors.email = 'Invalid email address';

                  //   }

                  //   return errors;

                  // }}

                  onSubmit={(values) => {
                    dispatch(
                        tryPasswordReset({ data: values, navigate, dispatch })
                    );
                  }}
                >
                  {({
                    values,

                    errors,

                    touched,

                    handleChange,

                    handleBlur,

                    handleSubmit,

                    isSubmitting,

                    /* and other goodies */
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="default-form forgot-password"
                    >
                      <Row>
                        <Col md={12} className="main-login-form">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <div className="login-form-input-icon">
                            <FaEnvelope size={14} color="#c9c9c9" />
                          </div>
                        </Col>

                        <Col md={12} className="mt-3 login-form-btn-container">
                          <button type="submit" className="forgot-btn">
                            Send me the link
                          </button>
                          <Link to="/">
                            <div className="login-form-input-signin">
                              <span>or sign in</span>
                            </div>
                          </Link>
                        </Col>
                      </Row>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 landingPageDesign"></div>
      </div>
    </div>
  );
}
