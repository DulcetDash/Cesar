import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateSuccessfullLoginDetails } from "../Redux/HomeActionsCreators";

import DrawerMenu from "./DrawerMenu";
import classes from "../Styles/Drivers.module.css";
import profile from "../Images/user.png";
import Loader from "react-loader-spinner";
import {
  ArrowBackIosSharp,
  ArrowBack,
  ArrowForwardIosSharp,
} from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import ImageViewer from "react-simple-image-viewer";
const axios = require("axios").default;

class Drivers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedDriversCategory: "delivery", //can be ride, delivery, shopping or awaiting
      hasError: false,
      usersData: { registered: [], awaiting: [] },
      shouldShowFilePreview: false, //To show thye file preview or not
      selectedDriverFocus: false, //The driver data selected
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

  //Data getter
  dataGetter() {
    let that = this;
    console.log(that.props.App);
    axios
      .post(`${process.env.REACT_APP_BRIDGE}/getDriversList`, {
        admin_fp: that.props.App.loginData.admin_fp,
        token_j: that.props.App.loginData.token_j,
      })
      .then(function (response) {
        // console.log(response.data);
        if (response.data.response === "error_Logout") {
          //!Log out
          // that.props.UpdateSuccessfullLoginDetails(false);
          // window.location.href = "/";
        }
        //...
        else {
          if (that.state.selectedDriverFocus !== false) {
            //Has selected a driver
            response.data.response.registered.map((el) => {
              if (el._id === that.state.selectedDriverFocus._id) {
                // console.log("Updated the selected driver");
                that.setState({
                  selectedDriverFocus: el,
                });
              }
            });
          }

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
          usersData: { registered: [], awaiting: [] },
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

  componentWillUnmount() {
    clearInterval(this.intervalUpdater);
  }

  updateSelectedDriversCat(category) {
    this.setState({
      selectedDriversCategory: category,
    });
  }

  basicHeader() {
    let selectedCategoryStyle = {
      backgroundColor: "#096ed4",
      borderColor: "#096ed4",
      color: "#fff",
      fontFamily: "MoveTextMedium",
    };

    return (
      <div className={classes.headerContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          {this.state.selectedDriverFocus !== false ? (
            <div
              className={classes.headerTitle}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  selectedDriverFocus: false,
                });
              }}>
              <ArrowBack />
              {this.state.selectedDriverFocus["name"]}{" "}
              {this.state.selectedDriverFocus["surname"]}
            </div>
          ) : (
            <div className={classes.headerTitle}>Drivers</div>
          )}
        </div>
        {/* Loader */}
        {this.state.selectedDriverFocus !== false ? null : (
          <div className={classes.rightCategoriesDrivers}>
            <div
              style={
                this.state.selectedDriversCategory === "ride"
                  ? { opacity: 0, cursor: "default", ...selectedCategoryStyle }
                  : { opacity: 0, cursor: "default" }
              }>
              Ride{" - "}
              {
                this.state.usersData.registered.filter(
                  (el) => el["operation_clearances"] === "RIDE"
                ).length
              }
            </div>
            <div
              style={
                this.state.selectedDriversCategory === "delivery"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedDriversCat("delivery")}>
              Delivery{" - "}
              {
                this.state.usersData.registered.filter(
                  (el) => el["operation_clearances"] === "DELIVERY"
                ).length
              }
            </div>
            <div
              style={
                this.state.selectedDriversCategory === "shopping"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedDriversCat("shopping")}>
              Shopping{" - "}
              {
                this.state.usersData.registered.filter(
                  (el) => el["operation_clearances"] === "SHOPPING"
                ).length
              }
            </div>
            {/* Awaiting approval */}
            <div
              style={
                this.state.selectedDriversCategory === "awaiting"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedDriversCat("awaiting")}>
              Awaiting approval{" - "}
              {this.state.usersData.awaiting.length}
            </div>
          </div>
        )}
      </div>
    );
  }

  //Make the date readable
  getReadableDate(dateString) {
    let dateRef = new Date(dateString);

    return `${dateRef.toLocaleDateString("en-US", { weekday: "long" })}, ${
      dateRef.getDate() > 9 ? dateRef.getDate() : `0${dateRef.getDate()}`
    }-${
      dateRef.getMonth() + 1 > 9
        ? dateRef.getMonth() + 1
        : `0${dateRef.getMonth() + 1}`
    }-${dateRef.getFullYear()} at ${dateRef.getHours()}:${dateRef.getMinutes()}`;
  }

  //Render the correct table for the data
  renderCorrectDataTable() {
    switch (this.state.selectedDriversCategory) {
      case "delivery":
        if (
          this.state.usersData.registered.filter((user) =>
            user?.operation_clearances?.includes("DELIVERY")
          ).length === 0
        )
          return (
            <div className={classes.emptyDriversShower}>
              {this.state.isLoading ? (
                <Loader
                  type="TailSpin"
                  color="#000"
                  height={50}
                  width={50}
                  timeout={300000000} //3 secs
                />
              ) : (
                "No registered delivery drivers yet."
              )}
            </div>
          );

        return (
          <table className={classes.tableMain}>
            <tr className={classes.headerTable}>
              <td>#</td>
              <td>Profile</td>
              <td>Name</td>
              <td>Surname</td>
              <td>Gender</td>
              <td>Phone</td>
              <td>State</td>
              <td>Plate number</td>
              <td>User type</td>
              <td>Suspension</td>
            </tr>

            {/* Body */}
            {this.state.usersData.registered
              .filter((el) => el?.operation_clearances?.includes("DELIVERY"))
              .map((user, index) => {
                let state = user?.isDriverSuspended ? "offline" : user?.status;

                return (
                  <tr
                    key={index}
                    className={classes.rowElementTable}
                    onClick={() => this.updateSelectedDriverFocus(user)}>
                    <td style={{ fontFamily: "MoveTextMedium" }}>
                      {index + 1}
                    </td>
                    <td>
                      <div className={classes.userProfileContainer}>
                        <img
                          alt="profile"
                          src={user?.identification_data?.profile_picture}
                        />
                      </div>
                    </td>
                    <td>{user?.name}</td>
                    <td>{user?.surname}</td>
                    <td>{user?.gender}</td>
                    <td>{user?.phone_number}</td>
                    <td
                      style={
                        state === "online"
                          ? {
                              backgroundColor:
                                process.env.REACT_APP_PRIMARY_COLOR,
                              color: "#fff",
                              fontFamily: "MoveTextBold",
                            }
                          : {
                              backgroundColor:
                                process.env.REACT_APP_ERROR_COLOR,
                              color: "#fff",
                              fontFamily: "MoveTextMedium",
                            }
                      }>
                      {state}
                    </td>
                    <td>Plate number</td>
                    <td>Courier</td>
                    <td
                      style={
                        !user?.isDriverSuspended
                          ? {
                              color: process.env.REACT_APP_PRIMARY_COLOR,
                              fontFamily: "MoveTextBold",
                            }
                          : {
                              color: process.env.REACT_APP_ERROR_COLOR,
                              fontFamily: "MoveTextMedium",
                            }
                      }>
                      {user?.isDriverSuspended ? "Suspended" : "Active"}
                    </td>
                  </tr>
                );
              })}
          </table>
        );

      case "awaiting":
        if (this.state.usersData.awaiting.length === 0)
          return (
            <div className={classes.emptyDriversShower}>
              No drivers applications yet.
            </div>
          );

        return (
          <table className={classes.tableMain}>
            <tr className={classes.headerTable}>
              <td>#</td>
              <td>Profile</td>
              <td>Name</td>
              <td>Surname</td>
              <td>City</td>
              <td>Phone</td>
              <td>Documents</td>
              <td>Identifier</td>
              <td>User type</td>
              <td>Date applied</td>
            </tr>

            {/* Body */}
            {this.state.usersData.awaiting.map((user, index) => {
              return (
                <tr
                  key={index}
                  className={classes.rowElementTable}
                  onClick={() => this.updateSelectedDriverFocus(user)}>
                  <td style={{ fontFamily: "MoveTextMedium" }}>{index + 1}</td>
                  <td>
                    <div className={classes.userProfileContainer}>
                      <img
                        alt="profile"
                        src={user["documents"]["driver_photo"]}
                      />
                    </div>
                  </td>
                  <td>{user["name"]}</td>
                  <td>{user["surname"]}</td>
                  <td>{user["city"]}</td>
                  <td>{user["phone_number"]}</td>
                  <td
                    style={{
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      fontFamily: "MoveTextBold",
                    }}>
                    Uploaded
                  </td>
                  <td>{user["driver_fingerprint"].substring(0, 10)}</td>
                  <td>{user["nature_driver"]}</td>
                  <td>{this.getReadableDate(user["createdAt"])}</td>
                </tr>
              );
            })}
          </table>
        );

      default:
        return <></>;
    }
  }

  //Render the focused data for the selected driver
  renderFocusedDriverSelected() {
    //Check if it's a registered driver or not
    if (
      this.state.selectedDriverFocus.operation_clearances !== undefined &&
      this.state.selectedDriverFocus.operation_clearances !== null
    ) {
      let isDeliveryDriver =
        this.state.selectedDriverFocus["operation_clearances"] === "DELIVERY";
      let isShoppingDriver =
        this.state.selectedDriverFocus["operation_clearances"] === "SHOPPING";

      //Registered driver
      return (
        <div className={classes.focusedContainer}>
          {this.renderBasicTitle({ title: "Personal information" })}
          <div className={classes.profileBrief}>
            <div className={classes.profilePicBrief}>
              <img
                alt="profile"
                src={this.state.selectedDriverFocus?.documents?.driver_photo}
                className={classes.trueBriefImage}
              />
            </div>
            <div className={classes.textualInfosBrief}>
              {/* Name */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.name,
                label: "Name",
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.surname,
                label: "Surname",
              })}
              {/* Gender */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.gender,
                label: "Gender",
              })}
              {/* Title */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.title,
                label: "Title",
              })}
            </div>
            {/* 2 */}
            <div className={classes.textualInfosBrief}>
              {/* Email */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.email,
                label: "Email",
              })}
              {/* Rating */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.rating,
                label: "Rating",
              })}
              {/* clearance */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.operation_clearances,
                label: "Operation clearance",
                color: process.env.REACT_APP_SECONDARY_COLOR,
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.getReadableDate(
                  this.state.selectedDriverFocus?.createdAt
                ),
                label: "Date registered",
              })}
            </div>
            {/* 3 */}
            <div className={classes.textualInfosBrief}>
              {/* Personal ID */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.identification_number,
                label: "Personal ID",
              })}
              {/* Phone */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.phone_number,
                label: "Phone number",
              })}
              {/* Account state */}
              {this.renderInformationWithLabel({
                title:
                  this.state.selectedDriverFocus?.account_state === "valid"
                    ? "Valid"
                    : "Not verified",
                label: "Account state",
                color:
                  this.state.selectedDriverFocus?.account_state === "valid"
                    ? process.env.REACT_APP_PRIMARY_COLOR
                    : process.env.REACT_APP_ERROR_COLOR,
              })}
              {/* Status */}
              {isShoppingDriver
                ? this.renderInformationWithLabel({
                    title: this.state.selectedDriverFocus?.isDriverSuspended
                      ? "Suspended"
                      : this.state.selectedDriverFocus?.operational_state
                          ?.status,
                    label: "Status",
                    color: this.state.selectedDriverFocus?.isDriverSuspended
                      ? process.env.REACT_APP_ERROR_COLOR
                      : process.env.REACT_APP_PRIMARY_COLOR,
                  })
                : null}
            </div>
          </div>

          {/* Car details */}
          {isShoppingDriver
            ? null
            : this.renderBasicTitle({ title: "Vehicle details" })}
          {isShoppingDriver ? null : (
            <div className={classes.profileBrief}>
              <div className={classes.profilePicBrief}>
                <img
                  alt="car"
                  src={this.state.selectedDriverFocus?.documents?.vehicle_photo}
                  className={classes.trueBriefImage}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={classes.textualInfosBrief}>
                {/* Brand */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus?.vehicle_details?.brand_name,
                  label: "Brand",
                })}
                {/* Plate no */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus?.vehicle_details
                      ?.plate_number,
                  label: "Plate number",
                })}
              </div>
              {/* 1.5 */}
              <div className={classes.textualInfosBrief}>
                {/* Model name */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus?.vehicle_details?.model_name,
                  label: "Model",
                })}
                {/* Color */}
                {this.renderInformationWithLabel({
                  title: this.state.selectedDriverFocus?.vehicle_details?.color,
                  label: "Color",
                })}
              </div>
              {/* 2 */}
              <div className={classes.textualInfosBrief}>
                {/* Vehicle type */}
                {this.renderInformationWithLabel({
                  title: /economy/i.test(
                    this.state.selectedDriverFocus?.cars_data?.[0]?.vehicle_type
                  )
                    ? "Economy"
                    : "Private",
                  label: "Vehicle type",
                })}
                {/* Status */}
                {this.renderInformationWithLabel({
                  title: this.state.selectedDriverFocus?.isDriverSuspended
                    ? "Suspended"
                    : "Active",
                  label: "Status",
                  color: this.state.selectedDriverFocus?.isDriverSuspended
                    ? process.env.REACT_APP_ERROR_COLOR
                    : process.env.REACT_APP_PRIMARY_COLOR,
                })}
              </div>
              {/* 3 */}
              <div className={classes.textualInfosBrief}>
                {/* Regional clearance */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus?.regional_clearances?.[0],
                  label: "Regional clearance",
                })}
              </div>
            </div>
          )}

          {/* Documents */}
          {this.renderBasicTitle({ title: "Documents" })}
          <div className={classes.profileBrief} style={{ flexWrap: "wrap" }}>
            {this.renderDocumentsList({
              driver_type:
                this.state.selectedDriverFocus?.operation_clearances?.[0],
            })}
          </div>

          {/* Authority zone */}
          {this.renderBasicTitle({ title: "Authority zone" })}
          <div
            className={classes.profileBrief}
            style={{ display: "block", border: "none" }}>
            <div
              className={classes.suspendAccButton}
              style={
                this.state.selectedDriverFocus?.isDriverSuspended
                  ? { color: process.env.REACT_APP_SECONDARY_COLOR }
                  : {}
              }
              onClick={() => {
                toast.dismiss();

                if (
                  window.confirm(
                    this.state.selectedDriverFocus?.isDriverSuspended === false
                      ? "Are you sure you want to suspend this driver?"
                      : "Are you sure you want to unsuspend this driver?"
                  )
                ) {
                  toast.loading("Suspending the driver.");

                  let that = this;
                  console.log({
                    admin_fp: that.props.App.loginData.admin_fp,
                    token_j: that.props.App.loginData.token_j,
                    operation:
                      this.state.selectedDriverFocus?.isDriverSuspended ===
                      false
                        ? "suspended"
                        : "unsuspend",
                    driver_id: this.state.selectedDriverFocus?._id,
                  });
                  axios
                    .post(
                      `${process.env.REACT_APP_BRIDGE}/suspendUnsuspendDriver`,
                      {
                        admin_fp: that.props.App.loginData.admin_fp,
                        token_j: that.props.App.loginData.token_j,
                        operation:
                          this.state.selectedDriverFocus[
                            "isDriverSuspended"
                          ] === false
                            ? "suspend"
                            : "unsuspend",
                        driver_id: this.state.selectedDriverFocus["_id"],
                      }
                    )
                    .then(function (response) {
                      console.log(response.data);
                      toast.dismiss();

                      if (response.data.response === "error")
                        toast.error("Unable to perform the operation.");
                      else
                        toast.success(
                          that.state.selectedDriverFocus[
                            "isDriverSuspended"
                          ] === false
                            ? "Successfully suspended."
                            : "Successfully unsuspended."
                        );
                    })
                    .catch(function (error) {
                      console.log(error);
                      toast.dismiss();
                      toast.error("Unable to perform the operation.");
                    });
                }
              }}>
              {this.state.selectedDriverFocus?.isDriverSuspended
                ? "Unsuspend this account"
                : "Suspend this account"}
            </div>
            <div className={classes.labelInfoPlusL}>
              {this.state.selectedDriverFocus?.isDriverSuspended
                ? "The driver will be able to see the requests immediately."
                : "The driver will not be able to see requests immediately."}
            </div>
          </div>
        </div>
      );
    } //Awaiting approval driver
    else {
      let isDeliveryOrShoppingDriver =
        this.state.selectedDriverFocus?.nature_driver === "COURIER";

      //Registered driver
      return (
        <div className={classes.focusedContainer}>
          {this.renderBasicTitle({ title: "Personal information" })}
          <div className={classes.profileBrief}>
            <div className={classes.profilePicBrief}>
              <img
                alt="profile"
                src={this.state.selectedDriverFocus?.documents?.driver_photo}
                className={classes.trueBriefImage}
              />
            </div>
            <div className={classes.textualInfosBrief}>
              {/* Name */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.name,
                label: "Name",
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.surname,
                label: "Surname",
              })}
              {/* Gender */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.gender,
                label: "Gender",
              })}
              {/* Title */}
              {this.renderInformationWithLabel({
                title: "Mr",
                label: "Title",
              })}
            </div>
            {/* 2 */}
            <div className={classes.textualInfosBrief}>
              {/* Email */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.email,
                label: "Email",
              })}

              {/* clearance */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.nature_driver,
                label: "User type",
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.getReadableDate(
                  this.state.selectedDriverFocus?.createdAt
                ),
                label: "Application date",
              })}
            </div>
            {/* 3 */}
            <div className={classes.textualInfosBrief}>
              {/* Personal ID */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.city,
                label: "City",
              })}
              {/* Phone */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus?.phone_number,
                label: "Phone number",
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus
                  ?.accepted_conditions_details?.did_accept_terms
                  ? "Yes"
                  : "No did not",
                label: "Did accept the terms",
              })}
            </div>
          </div>
          {/* Car details */}
          {this.renderBasicTitle({ title: "Vehicle details" })}
          {
            <div className={classes.profileBrief}>
              <div className={classes.profilePicBrief}>
                <img
                  alt="car"
                  src={this.state.selectedDriverFocus?.documents?.vehicle_photo}
                  className={classes.trueBriefImage}
                />
              </div>
              <div className={classes.textualInfosBrief}>
                {/* Brand */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus?.vehicle_details?.brand_name,
                  label: "Brand",
                })}
                {/* Plate no */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus?.vehicle_details
                      ?.plate_number,
                  label: "Plate number",
                })}
                {/* Permit no */}
                {isDeliveryOrShoppingDriver
                  ? null
                  : this.renderInformationWithLabel({
                      title:
                        this.state.selectedDriverFocus?.vehicle_details
                          ?.permit_number,
                      label: "Permit number",
                    })}
                {/* Taxi number */}
                {isDeliveryOrShoppingDriver
                  ? null
                  : this.renderInformationWithLabel({
                      title:
                        this.state.selectedDriverFocus?.vehicle_details
                          ?.taxi_number,
                      label: "Taxi number",
                    })}
              </div>
              {/* 2 */}
              <div className={classes.textualInfosBrief}>
                {/* Model name */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus?.vehicle_details?.model_name,
                  label: "Model",
                })}
                {/* Color */}
                {this.renderInformationWithLabel({
                  title: this.state.selectedDriverFocus?.vehicle_details?.color,
                  label: "Color",
                })}
              </div>
            </div>
          }

          {/* Documents */}
          {this.renderBasicTitle({ title: "Documents" })}
          <div className={classes.profileBrief} style={{ flexWrap: "wrap" }}>
            {this.renderDocumentsList({
              driver_type: "AWAITING",
            })}
          </div>

          {/* Authority zone */}
          {this.renderBasicTitle({ title: "Authority zone" })}
          <div
            className={classes.profileBrief}
            style={{ display: "block", border: "none" }}>
            <div
              className={classes.suspendAccButton}
              style={{
                color: process.env.REACT_APP_PRIMARY_COLOR,
                fontFamily: "MoveTextBold",
              }}
              onClick={() => {
                toast.dismiss();

                if (
                  window.confirm(
                    "You are about to approve this driver, would you like to proceed?"
                  )
                ) {
                  toast.loading("Approving the driver.");

                  let that = this;
                  console.log({
                    admin_fp: that.props.App.loginData.admin_fp,
                    token_j: that.props.App.loginData.token_j,
                    operation:
                      this.state.selectedDriverFocus?.isDriverSuspended ===
                      false
                        ? "suspended"
                        : "unsuspend",
                    driver_id: this.state.selectedDriverFocus["_id"],
                  });
                  axios
                    .post(
                      `${process.env.REACT_APP_BRIDGE}/approveDriverAccount`,
                      {
                        admin_fp: that.props.App.loginData.admin_fp,
                        token_j: that.props.App.loginData.token_j,
                        driverData: this.state.selectedDriverFocus,
                      }
                    )
                    .then(function (response) {
                      console.log(response.data);
                      toast.dismiss();

                      if (response.data.response === "error")
                        toast.error("Unable to approve this this.");
                      else {
                        toast.success("Successfully approved!");
                        that.setState({
                          selectedDriverFocus: false,
                        });
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                      toast.dismiss();
                      toast.error("Unable to approve this this.");
                    });
                }
              }}>
              Approve account
            </div>
            <div className={classes.labelInfoPlusL}>
              The driver will be able to login, see and accepts new requests.
            </div>
          </div>
        </div>
      );
    }
  }

  //Render documents based on the driver type
  renderDocumentsList({ driver_type = "TYPE" }) {
    switch (driver_type) {
      case "DELIVERY":
        return (
          <>
            {this.renderDocumentNode({
              title: "ID paper",
              url: this.state.selectedDriverFocus?.documents?.id_photo,
            })}
            {this.renderDocumentNode({
              title: "Driver license",
              url: this.state.selectedDriverFocus?.documents?.license_photo,
            })}
          </>
        );

      case "SHOPPING":
        return (
          <>
            {this.renderDocumentNode({
              title: "ID paper",
              url: this.state.selectedDriverFocus?.identification_data
                ?.copy_id_paper,
            })}
            {/* {this.renderDocumentNode({ title: "Driver license" })} */}
          </>
        );

      case "AWAITING":
        return (
          <>
            {this.renderDocumentNode({
              title: "ID paper",
              url: this.state.selectedDriverFocus["documents"]["id_photo"],
            })}
            {this.renderDocumentNode({
              title: "Driver license",
              url: this.state.selectedDriverFocus["documents"]["license_photo"],
            })}
          </>
        );

      default:
        return <></>;
    }
  }

  //Render basic title
  renderBasicTitle({ title = "My title" }) {
    return <div className={classes.basicTitle}>{title}</div>;
  }

  //Render information with label
  renderInformationWithLabel({
    title = "Title",
    label = "Label",
    color = "#000",
  }) {
    return (
      <div className={classes.infoPlusLabelContainer}>
        <div className={classes.labelInfoPlusL}>{label}</div>
        <div className={classes.titleInfoPlusL} style={{ color: color }}>
          {title}
        </div>
      </div>
    );
  }

  //Render document node
  renderDocumentNode({
    title = "Document name",
    url = "https://tothefile.comi/",
  }) {
    return (
      <div
        className={classes.documentNode}
        onClick={() => this.setState({ shouldShowFilePreview: true })}>
        {this.state.shouldShowFilePreview === false ? null : (
          <ImageViewer
            src={[url]}
            currentIndex={0}
            disableScroll={false}
            closeOnClickOutside={true}
            backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            onClose={() => this.setState({ shouldShowFilePreview: false })}
          />
        )}
        <div>{title}</div>
        <ArrowForwardIosSharp style={{ fontSize: "15px" }} />
      </div>
    );
  }

  //Update the selected driver for focus
  updateSelectedDriverFocus(driverData) {
    this.setState({ selectedDriverFocus: driverData });
  }

  render() {
    return (
      <div className={classes.container}>
        <Toaster />
        {/* Menu */}
        <DrawerMenu />

        {/* Right */}
        <div className={classes.contentContainer}>
          {this.basicHeader()}
          <div className={classes.tableSuperContainer}>
            {this.state.selectedDriverFocus === false
              ? this.renderCorrectDataTable()
              : this.renderFocusedDriverSelected()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
