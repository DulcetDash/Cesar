import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateSuccessfullLoginDetails } from "../Redux/HomeActionsCreators";

import DrawerMenu from "./DrawerMenu";
import classes from "../Styles/Users.module.css";
import profile from "../Images/user.png";
import Loader from "react-loader-spinner";
const axios = require("axios").default;

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      hasError: false,
      usersData: [],
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
    } //Invalid data
    else {
      //!Log out
      // this.props.UpdateSuccessfullLoginDetails(false);
      // window.location.href = "/";
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalUpdater);
  }

  //Data getter
  dataGetter() {
    let that = this;
    axios
      .post(`${process.env.REACT_APP_BRIDGE}/getUsersList`, {
        admin_fp: that.props.App.loginData.admin_fp,
        token_j: that.props.App.loginData.token_j,
      })
      .then(function (response) {
        //   console.log(response);
        if (response.data.response === "error_Logout") {
          //!Log out
          // that.props.UpdateSuccessfullLoginDetails(false);
          // window.location.href = "/";
        } else {
          that.setState({
            hasError: false,
            usersData: response.data.response,
            isLoading: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        that.setState({
          hasError: true,
          usersData: [],
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    let that = this;

    that.dataGetter();

    this.intervalUpdater = setInterval(() => {
      that.setState({
        isLoading: true,
      });

      that.dataGetter();
    }, process.env.REACT_APP_BASIC_INTERVAL);
  }

  basicHeader() {
    return (
      <div className={classes.headerContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <div className={classes.headerTitle}>Users</div>
          <div className={classes.otherSideHeader}>
            {" "}
            - {this.state.usersData.length}
          </div>
        </div>
        {/* Loader */}
        <div>
          {this.state.isLoading ? (
            <Loader
              type="TailSpin"
              color="#000"
              height={20}
              width={20}
              timeout={300000000} //3 secs
            />
          ) : null}
        </div>
      </div>
    );
  }

  //Make the date readable
  getReadableDate(dateString) {
    let dateRef = new Date(dateString);

    return `${dateRef
      .toLocaleDateString("en-US", { weekday: "long" })
      .substring(0, 3)}, ${
      dateRef.getDate() > 9 ? dateRef.getDate() : `0${dateRef.getDate()}`
    }-${
      dateRef.getMonth() + 1 > 9
        ? dateRef.getMonth() + 1
        : `0${dateRef.getMonth() + 1}`
    }-${dateRef.getFullYear()} at ${dateRef.getHours()}:${dateRef.getMinutes()}`;
  }

  render() {
    return (
      <div className={classes.container}>
        {/* Menu */}
        <DrawerMenu />

        {/* Right */}
        <div className={classes.contentContainer}>
          {this.basicHeader()}
          <div className={classes.tableSuperContainer}>
            {this.state.usersData.length === 0 ? (
              this.state.hasError ? (
                <div>
                  There is something wrong, please try refreshing your browser.
                </div>
              ) : this.state.isLoading ? (
                <Loader
                  type="TailSpin"
                  color="#000"
                  height={40}
                  width={40}
                  timeout={300000000} //3 secs
                />
              ) : (
                <div>
                  When you have users, you'll see them appear here
                  automatically.
                </div>
              )
            ) : (
              <table className={classes.tableMain}>
                <tr className={classes.headerTable}>
                  <td>#</td>
                  <td>Profile</td>
                  <td>Name</td>
                  <td>Surname</td>
                  <td>Gender</td>
                  <td>Phone number</td>
                  <td>Email</td>
                  <td>Status</td>
                  <td>Date registered</td>
                </tr>

                {/* Body */}

                {this.state.usersData.map((user, index) => {
                  let isAccountVerified = user?.is_accountVerified;

                  return (
                    <tr key={index} className={classes.rowElementTable}>
                      <td style={{ fontFamily: "MoveTextMedium" }}>
                        {index + 1}
                      </td>
                      <td>
                        <div className={classes.userProfileContainer}>
                          <img alt="profile" src={user?.profile_picture} />
                        </div>
                      </td>
                      <td>{user?.name}</td>
                      <td>{user?.surname}</td>
                      <td>
                        {/^male/i.test(user?.gender)
                          ? "Male"
                          : /unk/i.test(user?.gender)
                          ? "Unknown"
                          : "Female"}
                      </td>
                      <td>{user?.phone_number}</td>
                      <td>{user?.email}</td>
                      <td
                        style={
                          isAccountVerified
                            ? {
                                color: process.env.REACT_APP_PRIMARY_COLOR,
                                fontFamily: "MoveTextBold",
                              }
                            : {
                                color: process.env.REACT_APP_ERROR_COLOR,
                                fontFamily: "MoveTextMedium",
                              }
                        }>
                        {isAccountVerified ? "Verified" : "Not verified"}
                      </td>
                      <td>{this.getReadableDate(user?.createdAt)}</td>
                    </tr>
                  );
                })}
              </table>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
