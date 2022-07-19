import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateSuccessfullLoginDetails } from "../Redux/HomeActionsCreators";

import classes from "../Styles/Login.module.css";
import logoWhite from "../Images/logo.png";
import toast, { Toaster } from "react-hot-toast";
const axios = require("axios").default;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSecond_step: false, //step 1 : false, step 2: true
      email: "",
      password: "",
      otp: "",
      id: false, //The Id received
    };
  }

  componentWillMount() {
    //! Check for the token_j and admin_fp
    if (
      this.props.App.loginData.admin_fp !== undefined &&
      this.props.App.loginData !== null &&
      this.props.App.loginData.token_j !== undefined &&
      this.props.App.loginData.token_j !== null
    ) {
      //ok
      console.log(this.props.App.loginData);
      window.location.href = "/home";
    }
  }

  render() {
    return (
      <div className={classes.container}>
        <Toaster />

        <div className={classes.contentContainer}>
          <div className={classes.logoContainer}>
            <img alt="Orniss" src={logoWhite} />
          </div>
          <div className={classes.textualContainer}>
            {this.state.isSecond_step === false ? (
              <div className={classes.modularInfosNode}>
                <input
                  autoComplete="new-password"
                  type={"text"}
                  value={this.state.email}
                  placeholder="Corporate email"
                  disabled={this.state.isLoading}
                  onChange={(val) => this.setState({ email: val.target.value })}
                />
                <br />
                <input
                  autoComplete="new-password"
                  type={"password"}
                  value={this.state.password}
                  placeholder="Password"
                  disabled={this.state.isLoading}
                  onChange={(val) =>
                    this.setState({ password: val.target.value })
                  }
                />

                <div className={classes.noticeContainer}>
                  This is a private login, make sure you have the proper
                  authorizations before continuing to avoid any legal charges.
                </div>
              </div>
            ) : (
              <div className={classes.modularInfosNode}>
                <input
                  autoComplete="new-password"
                  type={"text"}
                  value={this.state.otp}
                  placeholder="8-digits OTP"
                  disabled={this.state.isLoading}
                  onChange={(val) => this.setState({ otp: val.target.value })}
                />
                <br />
                <div className={classes.noticeContainer}>
                  Please enter the OTP received in your corporate email.
                </div>
              </div>
            )}

            {this.state.isLoading ? null : (
              <div
                className={classes.buttonLogin}
                onClick={
                  this.state.isLoading
                    ? () => {}
                    : () => {
                        let that = this;
                        this.setState({
                          isLoading: true,
                        });

                        toast.dismiss();

                        if (this.state.isSecond_step === false) {
                          toast.loading("Checking your credentials");
                          //STEP 1
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/loginOrChecksForAdmins`,
                              {
                                email: that.state.email,
                                password: that.state.password,
                              }
                            )
                            .then(function (response) {
                              // console.log(response.data);
                              toast.dismiss();
                              if (
                                response.data.response === "valid_credentials"
                              ) {
                                //Success
                                toast.success("Validated credentials");
                                that.setState({
                                  isLoading: false,
                                  isSecond_step: true,
                                  id: response.data.id,
                                });
                              } //Error
                              else {
                                toast.error("You are not authorized here");
                                that.setState({
                                  isLoading: false,
                                  isSecond_step: false,
                                  email: "",
                                  password: "",
                                });
                              }
                            })
                            .catch(function (error) {
                              toast.dismiss();
                              console.log(error);
                              toast.error("Something's wrong");
                              that.setState({
                                isLoading: false,
                                isSecond_step: false,
                                email: "",
                                password: "",
                              });
                            });
                        } //STEP 2
                        else {
                          toast.loading("Checking your OTP");

                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/loginOrChecksForAdmins`,
                              {
                                email: that.state.email,
                                password: that.state.password,
                                otp: that.state.otp,
                                id: that.state.id,
                              }
                            )
                            .then(function (response) {
                              // console.log(response.data);
                              toast.loading("Redirecting you to home");
                              if (response.data.response === "success") {
                                //Success
                                toast.success("Welcome to Cesar");
                                //...
                                that.props.UpdateSuccessfullLoginDetails(
                                  response.data.data
                                );
                                //...Move to home
                                window.location.href = "/home";
                              } //Error
                              else {
                                toast.dismiss();
                                toast.error("Invalid credentials.");
                                that.setState({
                                  isLoading: false,
                                  isSecond_step: false,
                                  email: "",
                                  password: "",
                                  otp: "",
                                });
                              }
                            })
                            .catch(function (error) {
                              toast.dismiss();
                              console.log(error);
                              toast.error("Invalid credentials.");
                              that.setState({
                                isLoading: false,
                                isSecond_step: false,
                                email: "",
                                password: "",
                                otp: "",
                              });
                            });
                        }
                      }
                }
              >
                Next
              </div>
            )}
          </div>
        </div>
        {/* Copyright */}
        <div className={classes.copyright}>
          <div>© 2022 Orniss Technologies CC.</div>
          <div>{process.env.REACT_APP_CESAR_VERSION}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { App } = state;
  return { App };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      UpdateSuccessfullLoginDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
