import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { tryUserLogin } from "../slices/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FaLock, FaUserAlt } from "react-icons/fa";
export function LandingPage() {
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
              <div className="col-md-12 landingSignIn">Sign in</div>
              <div className="col-md-12">
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
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
                      tryUserLogin({ data: values, navigate, dispatch })
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
                    <form onSubmit={handleSubmit} className="default-form">
                      <Row>
                        <Col md={12} className="main-login-form">
                          <label>User name</label>
                          <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          <div className="login-form-input-icon">
                            <FaUserAlt size={14} color="#c9c9c9" />
                          </div>
                        </Col>
                        <Col md={12} className="main-login-form">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <div className="login-form-input-icon">
                            <FaLock size={14} color="#c9c9c9" />
                          </div>
                          <Link to="/forgot-password">
                            <div className="login-form-input-forget-password">
                              <span>Forgot Password?</span>
                            </div>
                          </Link>
                        </Col>
                        {login.invalidLogin !== "" ? (
                          <Col md={12}>
                            <Alert variant="danger">{login.invalidLogin}</Alert>
                          </Col>
                        ) : (
                          ""
                        )}
                        <Col md={12} className="mt-3">
                          <button type="submit" className="login-btn">
                            Login
                          </button>
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
