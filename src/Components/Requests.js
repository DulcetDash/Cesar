import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateSuccessfullLoginDetails } from "../Redux/HomeActionsCreators";

import classes from "../Styles/Requests.module.css";
import DrawerMenu from "./DrawerMenu";
import Loader from "react-loader-spinner";
import {
  ArrowBackIosSharp,
  ArrowBack,
  ArrowForwardIosSharp,
  ArrowForward,
  CheckCircle,
  Close,
} from "@material-ui/icons";
import ucFirst from "../Helpers/Helpers";
import Modal from "react-modal";
import { getRealisticPlacesNames } from "../Helpers/DataParser";
import toast, { Toaster } from "react-hot-toast";
import ImageViewer from "react-simple-image-viewer";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "90%",
    height: "90%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

const axios = require("axios").default;

class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRequestCategory: "ride", //ride, delivery or shopping
      selectedRequestStatus: "inprogress", //inprogress, completed, cancelled
      shouldShowFocusModal: false, //If to render the request focus modal or not
      selectedRequestForFocus: {}, //The selected request for focus, in the modal
      requestsMetaData: [], //Will have all the requests data - default: []
      hasError: false, //If the request encountered an error
      isLoading: true, //Default: true
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

  //Update the selected focused request
  updateSelectedFocusedRequest({ requestsMeta }) {
    if (Object.keys(this.state.selectedRequestForFocus).length === 0) return;

    let that = this;
    try {
      let isolatedFocusedRequestsBulk =
        requestsMeta[this.state.selectedRequestCategory][
          this.state.selectedRequestStatus
        ];
      isolatedFocusedRequestsBulk.map((request) => {
        if (request._id === that.state.selectedRequestForFocus._id) {
          //!Found it
          // console.log(`FOUND THE SELECTED REQUEST -> ${request._id}`);
          request["index"] = that.state.selectedRequestForFocus.index;
          //..
          that.setState({
            selectedRequestForFocus: request,
          });
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  //Deduct the correct process step from requests vars
  deductProcessStepFromVars({ requestData }) {
    let stateVars = requestData.request_state_vars;
    let colorsStep = [
      { back: "yellow", color: "#000" },
      { back: "aqua", color: "#000" },
      { back: process.env.REACT_APP_PRIMARY_COLOR, color: "#fff" },
    ];

    //Handle the cancelled window
    if (this.state.selectedRequestStatus === "cancelled")
      return { step: "N/A", color: { back: "#fff", color: "#000" } };
    //Handle the "no driver" state
    if (requestData.shopper_id === "false")
      return { step: "Waiting...", color: { back: "#fff", color: "#000" } };

    switch (requestData.ride_mode) {
      case "RIDE":
        if (stateVars.inRouteToPickup && stateVars.inRouteToDropoff === false) {
          //In route to pickup
          return { step: "Driving to pickup the client", color: colorsStep[0] };
        } else if (
          stateVars.inRouteToDropoff &&
          stateVars.completedDropoff === false
        ) {
          //In route to drop off
          return {
            step: "Driving to drop off the client",
            color: colorsStep[1],
          };
        } //Completed
        else {
          return { step: "Dropped off the client", color: colorsStep[2] };
        }

      case "DELIVERY":
        if (
          stateVars.inRouteToPickupCash &&
          stateVars.didPickupCash === false
        ) {
          //In route to pickup
          return {
            step: "Driving to pickup the packages",
            color: colorsStep[0],
          };
        } else if (
          stateVars.inRouteToDropoff &&
          stateVars.completedDropoff === false
        ) {
          //In route to drop off
          return { step: "Delivering the packages", color: colorsStep[1] };
        } //Completed
        else {
          return { step: "Packages delivered", color: colorsStep[2] };
        }

      case "SHOPPING":
        if (
          stateVars.inRouteToPickupCash &&
          stateVars.didPickupCash === false
        ) {
          //In route to pickup
          return { step: "Driving to pickup the money", color: colorsStep[0] };
        } else if (
          stateVars.inRouteToShop &&
          stateVars.completedShopping === false
        ) {
          //In route to shop
          return { step: "Shopping for the items", color: colorsStep[1] };
        } //Completed
        else {
          return { step: "Shopping completed", color: colorsStep[2] };
        }

      default:
        return { step: "Processing", color: { back: "#000", color: "#fff" } };
    }
  }

  //Data getter
  dataGetter() {
    let that = this;
    axios
      .post(`${process.env.REACT_APP_BRIDGE}/getGeneralRequestsList`, {
        admin_fp: that.props.App.loginData.admin_fp,
        token_j: that.props.App.loginData.token_j,
      })
      .then(function (response) {
        //   console.log(response.data.response);
        if (response.data.response === "error_Logout") {
          //!Log out
          // that.props.UpdateSuccessfullLoginDetails(false);
          // window.location.href = "/";
        } else if (
          response.data.response === "error" ||
          Object.keys(response.data.response).length === 0
        ) {
          that.setState({
            hasError: false,
            requestsMetaData: [],
            isLoading: false,
            selectedRequestForFocus: {},
            shouldShowFocusModal: false,
          });
        } //Has some data
        else {
          that.setState({
            hasError: false,
            requestsMetaData: response.data.response,
            isLoading: false,
          });
          //!Update the selected request as well
          that.updateSelectedFocusedRequest({
            requestsMeta: response.data.response,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        that.setState({
          hasError: false,
          requestsMetaData: [],
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    let that = this;

    that.dataGetter();

    this.intervalUpdater = setInterval(() => {
      that.dataGetter();
    }, process.env.REACT_APP_BASIC_INTERVAL);
  }

  //To update the request category
  updateSelectedRequestsCat(category) {
    this.setState({
      selectedRequestCategory: category,
    });
  }
  //To update the request status
  updateSelectedReqStatusCat(category) {
    this.setState({
      selectedRequestStatus: category,
    });
  }
  //To get the human readable names
  getHumanReadableNames(codename) {
    let codeNamesMap = {
      ride: "Rides",
      delivery: "Deliveries",
      shopping: "Shoppings",
      inprogress: "in progress",
      completed: "completed",
      cancelled: "cancelled",
    };
    return codeNamesMap[codename];
  }

  basicHeader() {
    let selectedCategoryStyle = {
      backgroundColor: "#096ed4",
      borderColor: "#096ed4",
      color: "#fff",
      fontFamily: "MoveTextMedium",
    };

    let selectedStatusStyle = {
      backgroundColor: "#000",
      borderColor: "#000",
      color: "#fff",
      fontFamily: "MoveTextMedium",
    };

    return (
      <>
        <div className={classes.headerContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <div className={classes.headerTitle}>
              {this.getHumanReadableNames(this.state.selectedRequestCategory)}{" "}
              {this.getHumanReadableNames(this.state.selectedRequestStatus)}
            </div>
          </div>
          {/* Loader */}
          <div className={classes.rightCategoriesDrivers}>
            <div
              style={
                this.state.selectedRequestCategory === "ride"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedRequestsCat("ride")}>
              Ride{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress", "ride")}
            </div>
            <div
              style={
                this.state.selectedRequestCategory === "delivery"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedRequestsCat("delivery")}>
              Delivery{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress", "delivery")}
            </div>
            <div
              style={
                this.state.selectedRequestCategory === "shopping"
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedRequestsCat("shopping")}>
              Shopping{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress", "shopping")}
            </div>
          </div>
        </div>

        {/* Requests states */}

        <div className={classes.requestsAndStatsContainer}>
          <div className={classes.requestsStatesContainer}>
            <div
              style={
                this.state.selectedRequestStatus === "inprogress"
                  ? selectedStatusStyle
                  : {}
              }
              onClick={() => this.updateSelectedReqStatusCat("inprogress")}>
              In progress{" - "}
              {this.getNumberOfRequestsPerStyle("inprogress")}
            </div>
            <div
              style={
                this.state.selectedRequestStatus === "completed"
                  ? selectedStatusStyle
                  : {}
              }
              onClick={() => this.updateSelectedReqStatusCat("completed")}>
              Completed{" - "}
              {this.getNumberOfRequestsPerStyle("completed")}
            </div>
            <div
              style={
                this.state.selectedRequestStatus === "cancelled"
                  ? selectedStatusStyle
                  : {}
              }
              onClick={() => this.updateSelectedReqStatusCat("cancelled")}>
              Cancelled{" - "}
              {this.getNumberOfRequestsPerStyle("cancelled")}
            </div>
          </div>
          {/* Brief stats */}
          <div className={classes.briefHeaderStats}>
            {this.renderInformationWithLabel({
              title: `N$${this.getHeaderGenericStats("total_sales_today")}`,
              label: "Total sales today",
            })}
            {/* Revenue */}
            {this.renderInformationWithLabel({
              title: `N$${this.getHeaderGenericStats("total_revenue_today")}`,
              label: "Total revenue today",
              color: process.env.REACT_APP_PRIMARY_COLOR,
            })}
            {/* Requests */}
            {this.renderInformationWithLabel({
              title: this.getHeaderGenericStats("total_requests_success"),
              label: "Total requests today",
            })}
          </div>
        </div>
      </>
    );
  }

  //Get the header generic stats
  getHeaderGenericStats(dataType) {
    if (
      this.state.requestsMetaData.stats !== undefined &&
      this.state.requestsMetaData.stats !== null
    ) {
      //   console.log(this.state.requestsMetaData.stats);
      return this.state.requestsMetaData.stats[dataType];
    } else {
      return 0;
    }
  }

  //Get the number of requests for different requests status : inprogress, completed or cancelled
  getNumberOfRequestsPerStyle(
    style,
    category = this.state.selectedRequestCategory
  ) {
    return this.state.requestsMetaData[category] !== undefined
      ? this.state.requestsMetaData[category][style] !== undefined
        ? this.state.requestsMetaData[category][style].length
        : 0
      : 0;
  }

  //Render information with label
  renderInformationWithLabel({
    title = "Title",
    label = "Label",
    color = "#000",
    marginLeft = "25px",
    fontSize = "18px",
  }) {
    return (
      <div
        className={classes.infoPlusLabelContainer}
        style={{ marginLeft: marginLeft }}>
        <div className={classes.labelInfoPlusL}>{label}</div>
        <div
          className={classes.titleInfoPlusL}
          style={{ color: color, fontSize: fontSize }}>
          {title}
        </div>
      </div>
    );
  }

  //Make the date readable
  getReadableDate(dateString) {
    let dateRef = new Date(dateString);

    if (isNaN(dateRef.getDate())) {
      return "Unclear date";
    }

    return `${
      dateRef.getDate() > 9 ? dateRef.getDate() : `0${dateRef.getDate()}`
    }-${
      dateRef.getMonth() + 1 > 9
        ? dateRef.getMonth() + 1
        : `0${dateRef.getMonth() + 1}`
    }-${dateRef.getFullYear()} at ${
      dateRef.getHours() > 9 ? dateRef.getHours() : `0${dateRef.getHours()}`
    }:${
      dateRef.getMinutes() > 9
        ? dateRef.getMinutes()
        : `0${dateRef.getMinutes()}`
    }h`;
  }

  //Check loader or empty request condition
  checkLoaderOrEmptyRequestCondition() {
    return (
      this.state.requestsMetaData[this.state.selectedRequestCategory] ===
        undefined ||
      this.state.requestsMetaData[this.state.selectedRequestCategory] ===
        null ||
      this.state.requestsMetaData[this.state.selectedRequestCategory][
        this.state.selectedRequestStatus
      ] === undefined ||
      this.state.requestsMetaData[this.state.selectedRequestCategory][
        this.state.selectedRequestStatus
      ] === null ||
      this.state.requestsMetaData[this.state.selectedRequestCategory][
        this.state.selectedRequestStatus
      ].length === 0
    );
  }

  //Render the correct data table
  renderAppropriateDataTable() {
    let that = this;

    if (this.checkLoaderOrEmptyRequestCondition())
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
            `No ${this.getHumanReadableNames(
              this.state.selectedRequestCategory
            ).toLowerCase()} ${this.getHumanReadableNames(
              this.state.selectedRequestStatus
            )} yet, you'll see them here automatically.`
          )}
        </div>
      );

    let dataToConsider =
      this.state.requestsMetaData[this.state.selectedRequestCategory] !==
      undefined
        ? this.state.requestsMetaData[this.state.selectedRequestCategory][
            this.state.selectedRequestStatus
          ]
        : [];

    return (
      <table className={classes.tableMain}>
        <tr className={classes.headerTable}>
          <td>#</td>
          <td>Driver</td>
          <td>Client name</td>
          <td>Date requested</td>
          <td>Request type</td>
          <td>Amount</td>
          <td>Payment method</td>
          <td>Progress step</td>
          <td>More</td>
        </tr>

        {/* Body */}

        {dataToConsider.map((request, index) => {
          let deductedStep = that.deductProcessStepFromVars({
            requestData: request,
          });

          return (
            <tr
              key={index}
              className={classes.rowElementTable}
              onClick={() => {
                //!add the index number
                request["index"] = index;
                //...
                that.setState({
                  selectedRequestForFocus: request,
                  shouldShowFocusModal: true,
                });
              }}>
              <td style={{ fontFamily: "MoveTextMedium" }}>{index + 1}</td>
              <td
                style={{
                  backgroundColor:
                    this.state.selectedRequestStatus === "cancelled"
                      ? "#fff"
                      : request.shopper_id === "false"
                      ? process.env.REACT_APP_ERROR_COLOR
                      : process.env.REACT_APP_PRIMARY_COLOR,
                  color:
                    this.state.selectedRequestStatus === "cancelled"
                      ? request.shopper_id === "false"
                        ? process.env.REACT_APP_ERROR_COLOR
                        : process.env.REACT_APP_PRIMARY_COLOR
                      : "#fff",
                  fontFamily: "MoveTextMedium",
                }}>
                {request.shopper_id === "false"
                  ? this.state.selectedRequestStatus === "cancelled"
                    ? "No driver"
                    : "Pending..."
                  : this.state.selectedRequestCategory === "ride"
                  ? request.driverData.cars_data[0].taxi_number
                  : request.driverData.name}
              </td>
              <td>
                {request.clientData !== undefined
                  ? request.clientData.name
                  : "Unknown"}
              </td>
              <td>{this.getReadableDate(request.date_requested)}</td>
              <td
                style={{
                  fontFamily: "MoveTextBold",
                  color: process.env.REACT_APP_SECONDARY_COLOR,
                }}>
                {ucFirst({ stringData: request.ride_mode })}
              </td>
              <td
                style={{
                  fontFamily: "MoveTextBold",
                  color: process.env.REACT_APP_PRIMARY_COLOR,
                  fontSize: "18px",
                }}>
                {request.totals_request.fare !== undefined
                  ? `N$${request.totals_request.fare}`
                  : request.totals_request.total}
              </td>
              <td>{this.getReadablePaymentMethod(request.payment_method)}</td>
              <td
                style={{
                  backgroundColor: deductedStep.color.back,
                  color: deductedStep.color.color,
                }}>
                {deductedStep.step}
              </td>
              <td>
                <ArrowForward style={{ fontSize: "20px" }} />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  //Get the readable payment method
  getReadablePaymentMethod(paymentCodeName) {
    return paymentCodeName === "mobile_money" ? "Ewallet" : "Cash";
  }

  //Render basic title
  renderBasicTitle({ title = "My title" }) {
    return <div className={classes.basicTitle}>{title}</div>;
  }

  //Render appropriate modal content
  renderAppropriateModalContent() {
    let request = this.state.selectedRequestForFocus;
    let deductedStep = this.deductProcessStepFromVars({
      requestData: this.state.selectedRequestForFocus,
    });

    switch (this.state.selectedRequestForFocus.ride_mode) {
      case "RIDE":
        return (
          <div className={classes.modalContainer}>
            <div className={classes.headerPortionModal}>
              <div className={classes.headerModalRequest}>
                <div className={classes.titleRequestModal}>
                  {ucFirst({
                    stringData: this.getHumanReadableNames(
                      this.state.selectedRequestStatus
                    ),
                  })}{" "}
                  {this.state.selectedRequestCategory} request #
                  {this.state.selectedRequestForFocus.index + 1}
                </div>
                <div className={classes.clientNameModal}>
                  {" "}
                  <Close
                    style={{
                      fontSize: "30px",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        selectedRequestForFocus: {},
                        shouldShowFocusModal: false,
                      });
                    }}
                  />
                </div>
              </div>
              <table className={classes.tableMain}>
                <tr className={classes.headerTable}>
                  <td>Driver</td>
                  <td>Client name</td>
                  <td>Date requested</td>
                  <td>Request type</td>
                  <td>Amount</td>
                  <td>Payment method</td>
                  <td>Progress step</td>
                </tr>
                {/* ... */}
                <tr className={classes.rowElementTable}>
                  <td
                    style={{
                      backgroundColor:
                        this.state.selectedRequestStatus === "cancelled"
                          ? "#fff"
                          : request.shopper_id === "false"
                          ? process.env.REACT_APP_ERROR_COLOR
                          : process.env.REACT_APP_PRIMARY_COLOR,
                      color:
                        this.state.selectedRequestStatus === "cancelled"
                          ? request.shopper_id === "false"
                            ? process.env.REACT_APP_ERROR_COLOR
                            : process.env.REACT_APP_PRIMARY_COLOR
                          : "#fff",
                      fontFamily: "MoveTextMedium",
                    }}>
                    {request.shopper_id === "false"
                      ? this.state.selectedRequestStatus === "cancelled"
                        ? "No driver"
                        : "Pending..."
                      : request.driverData.cars_data[0].taxi_number}
                  </td>
                  <td>{request.clientData.name}</td>
                  <td>{this.getReadableDate(request.date_requested)}</td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_SECONDARY_COLOR,
                    }}>
                    {ucFirst({ stringData: request.ride_mode })}
                  </td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      fontSize: "18px",
                    }}>{`N$${request.totals_request.fare}`}</td>
                  <td>
                    {this.getReadablePaymentMethod(request.payment_method)}
                  </td>
                  <td
                    style={{
                      backgroundColor: deductedStep.color.back,
                      color: deductedStep.color.color,
                    }}>
                    {deductedStep.step}
                  </td>
                </tr>
              </table>
            </div>

            {this.renderBasicTitle({ title: "Itinary" })}
            {this.renderItinary()}

            {/* {this.renderBasicTitle({ title: "Fare details" })}
            {this.renderFareDetails({
              requestData: this.state.selectedRequestForFocus,
            })} */}

            {this.renderBasicTitle({ title: "Driver details" })}
            {this.renderDriverDetails({
              requestData: this.state.selectedRequestForFocus,
            })}

            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderBasicTitle({ title: "Actions" })}
            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderGlobalActionNodes({
                  requestData: this.state.selectedRequestForFocus,
                })}
          </div>
        );

      case "DELIVERY":
        return (
          <div className={classes.modalContainer}>
            <div className={classes.headerPortionModal}>
              <div className={classes.headerModalRequest}>
                <div className={classes.titleRequestModal}>
                  {" "}
                  {ucFirst({
                    stringData: this.getHumanReadableNames(
                      this.state.selectedRequestStatus
                    ),
                  })}{" "}
                  {this.state.selectedRequestCategory} request #
                  {this.state.selectedRequestForFocus.index + 1}
                </div>
                <div className={classes.clientNameModal}>
                  <Close
                    style={{
                      fontSize: "30px",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        selectedRequestForFocus: {},
                        shouldShowFocusModal: false,
                      });
                    }}
                  />
                </div>
              </div>
              <table className={classes.tableMain}>
                <tr className={classes.headerTable}>
                  <td>Driver</td>
                  <td>Client name</td>
                  <td>Date requested</td>
                  <td>Request type</td>
                  <td>Amount</td>
                  <td>Payment method</td>
                  <td>Progress step</td>
                </tr>
                {/* ... */}
                <tr className={classes.rowElementTable}>
                  <td
                    style={{
                      backgroundColor:
                        this.state.selectedRequestStatus === "cancelled"
                          ? "#fff"
                          : request.shopper_id === "false"
                          ? process.env.REACT_APP_ERROR_COLOR
                          : process.env.REACT_APP_PRIMARY_COLOR,
                      color:
                        this.state.selectedRequestStatus === "cancelled"
                          ? request.shopper_id === "false"
                            ? process.env.REACT_APP_ERROR_COLOR
                            : process.env.REACT_APP_PRIMARY_COLOR
                          : "#fff",
                      fontFamily: "MoveTextMedium",
                    }}>
                    {request.shopper_id === "false"
                      ? this.state.selectedRequestStatus === "cancelled"
                        ? "No driver"
                        : "Pending..."
                      : request.driverData.name}
                  </td>
                  <td>{request.clientData.name}</td>
                  <td>{this.getReadableDate(request.date_requested)}</td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_SECONDARY_COLOR,
                    }}>
                    {ucFirst({ stringData: request.ride_mode })}
                  </td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      fontSize: "18px",
                    }}>{`${request.totals_request.total}`}</td>
                  <td>
                    {this.getReadablePaymentMethod(request.payment_method)}
                  </td>
                  <td
                    style={{
                      backgroundColor: deductedStep.color.back,
                      color: deductedStep.color.color,
                    }}>
                    {deductedStep.step}
                  </td>
                </tr>
              </table>
            </div>

            {this.renderBasicTitle({ title: "Itinary" })}
            {this.renderItinary()}

            {this.renderBasicTitle({ title: "Fare details" })}
            {this.renderFareDetails({
              requestData: this.state.selectedRequestForFocus,
            })}

            {this.renderBasicTitle({ title: "Driver details" })}
            {this.renderDriverDetails({
              requestData: this.state.selectedRequestForFocus,
            })}

            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderBasicTitle({ title: "Actions" })}
            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderGlobalActionNodes({
                  requestData: this.state.selectedRequestForFocus,
                })}
          </div>
        );

      case "SHOPPING":
        return (
          <div className={classes.modalContainer}>
            <div className={classes.headerPortionModal}>
              <div className={classes.headerModalRequest}>
                <div className={classes.titleRequestModal}>
                  {" "}
                  {ucFirst({
                    stringData: this.getHumanReadableNames(
                      this.state.selectedRequestStatus
                    ),
                  })}{" "}
                  {this.state.selectedRequestCategory} request #
                  {this.state.selectedRequestForFocus.index + 1}
                </div>
                <div className={classes.clientNameModal}>
                  <Close
                    style={{
                      fontSize: "30px",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        selectedRequestForFocus: {},
                        shouldShowFocusModal: false,
                      });
                    }}
                  />
                </div>
              </div>
              <table className={classes.tableMain}>
                <tr className={classes.headerTable}>
                  <td>Shopper</td>
                  <td>Client name</td>
                  <td>Date requested</td>
                  <td>Request type</td>
                  <td>Amount</td>
                  <td>Payment method</td>
                  <td>Progress step</td>
                </tr>
                {/* ... */}
                <tr className={classes.rowElementTable}>
                  <td
                    style={{
                      backgroundColor:
                        this.state.selectedRequestStatus === "cancelled"
                          ? "#fff"
                          : request.shopper_id === "false"
                          ? process.env.REACT_APP_ERROR_COLOR
                          : process.env.REACT_APP_PRIMARY_COLOR,
                      color:
                        this.state.selectedRequestStatus === "cancelled"
                          ? request.shopper_id === "false"
                            ? process.env.REACT_APP_ERROR_COLOR
                            : process.env.REACT_APP_PRIMARY_COLOR
                          : "#fff",
                      fontFamily: "MoveTextMedium",
                    }}>
                    {request.shopper_id === "false"
                      ? this.state.selectedRequestStatus === "cancelled"
                        ? "No driver"
                        : "Pending..."
                      : request.driverData.name}
                  </td>
                  <td>{request.clientData.name}</td>
                  <td>{this.getReadableDate(request.date_requested)}</td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_SECONDARY_COLOR,
                    }}>
                    {ucFirst({ stringData: request.ride_mode })}
                  </td>
                  <td
                    style={{
                      fontFamily: "MoveTextBold",
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      fontSize: "18px",
                    }}>{`${request.totals_request.total}`}</td>
                  <td>
                    {this.getReadablePaymentMethod(request.payment_method)}
                  </td>
                  <td
                    style={{
                      backgroundColor: deductedStep.color.back,
                      color: deductedStep.color.color,
                    }}>
                    {deductedStep.step}
                  </td>
                </tr>
              </table>
            </div>

            {this.renderBasicTitle({ title: "Itinary" })}
            {this.renderItinary()}

            {this.renderBasicTitle({ title: "Fare details" })}
            {this.renderFareDetails({
              requestData: this.state.selectedRequestForFocus,
            })}

            {this.renderBasicTitle({ title: "Shopper details" })}
            {this.renderDriverDetails({
              requestData: this.state.selectedRequestForFocus,
            })}

            {this.renderBasicTitle({
              title: `Items (${this.state.selectedRequestForFocus.shopping_list.length})`,
            })}
            {this.renderItemsShoppingList({
              requestData: this.state.selectedRequestForFocus,
            })}

            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderBasicTitle({ title: "Actions" })}
            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderGlobalActionNodes({
                  requestData: this.state.selectedRequestForFocus,
                })}
          </div>
        );
      default:
        return <></>;
    }
  }

  //Render the item list
  renderItemsShoppingList({ requestData }) {
    return (
      <div className={classes.shoppingListContainer}>
        {requestData.shopping_list.map((item, index) => {
          return (
            <div
              key={index}
              className={classes.itemToShopContainer}
              style={
                index + 1 === requestData.shopping_list.length
                  ? { borderBottomColor: "#fff" }
                  : {}
              }>
              <div className={classes.itemPictureContainer}>
                <img
                  alt={"item"}
                  src={
                    typeof item.pictures[0] === "object"
                      ? item.pictures[0][0]
                      : item.pictures[0]
                  }
                  className={classes.trueItemPicture}
                />
              </div>
              {/* Infos */}
              <div className={classes.itemInfosContainer}>
                <div className={classes.itemToShopName}>{item.name}</div>
                <div className={classes.itemStoreName}>
                  {item.meta.store !== undefined
                    ? item.meta.store
                    : item.meta.shop_name}
                </div>
                <div className={classes.itemPriceQty}>
                  <span
                    style={{
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      paddingRight: "10px",
                    }}>
                    {item.price}
                  </span>{" "}
                  * {item.items} {item.items > 1 ? "items" : "item"}
                </div>
              </div>
              {/* Status */}
              <div className={classes.itemBoughtState}>
                {item.isShoped !== undefined && item.isShoped ? (
                  <CheckCircle style={{ fontSize: "35px" }} />
                ) : this.state.selectedRequestStatus === "cancelled" ? (
                  ""
                ) : (
                  "Not yet purchased"
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  //!Cancel request for driver
  cancelRequestForDriver({ requestData }) {
    toast.dismiss();

    if (
      window.confirm(
        "Do you really want to cancel this request for this driver?"
      )
    ) {
      toast.loading("Cancelling the request for the driver");

      let that = this;
      axios
        .post(`${process.env.REACT_APP_BRIDGE}/cancel_request_driver_io`, {
          request_fp: requestData.request_fp,
          driver_fingerprint: requestData.shopper_id,
          requestType: requestData.ride_mode,
        })
        .then(function (response) {
          console.log(response.data);
          toast.dismiss();

          if (/Successfully/i.test(response.data.response)) {
            toast.success("Successfully cancelled the request for the driver!");
            setTimeout(() => {
              //Go back
              that.setState({
                selectedDriverFocus: false,
              });
            }, 4000);
          } else toast.error("Unable to cancel the request for the driver.");
        })
        .catch(function (error) {
          console.log(error);
          toast.dismiss();
          toast.error("Unable to cancel the request for the driver.");
        });
    }
  }

  //!Delete the request - or cancel for the rider
  deleteRequest({ requestData }) {
    toast.dismiss();

    if (
      window.confirm("Do you really want to cancel this request completely?")
    ) {
      toast.loading("Cancelling the request completely");

      let that = this;
      axios
        .post(`${process.env.REACT_APP_BRIDGE}/cancel_request_user`, {
          request_fp: requestData.request_fp,

          user_identifier: requestData.client_id,
        })
        .then(function (response) {
          console.log(response.data);
          toast.dismiss();

          if (/Successfully/i.test(response.data.response)) {
            toast.success("Successfully cancelled the request!");
            setTimeout(() => {
              //Go back
              that.setState({
                selectedDriverFocus: false,
              });
            }, 4000);
          } else toast.error("Unable to cancel the request.");
        })
        .catch(function (error) {
          console.log(error);
          toast.dismiss();
          toast.error("Unable to cancel the request.");
        });
    }
  }

  //Render global action nodes
  renderGlobalActionNodes({ requestData }) {
    let requestState = requestData.request_state_vars;

    switch (requestData.ride_mode) {
      case "RIDE":
        return (
          <div
            className={classes.itiContainer}
            style={{
              marginTop: "20px",
              flexWrap: "wrap",
              borderBottomColor: "#fff",
            }}>
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Confirm pickup",
                  isValidated: requestState.inRouteToDropoff,
                  actuator: requestState.inRouteToDropoff
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the pickup?"
                          )
                        ) {
                          toast.loading("Confirming the pickup");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_pickup_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success("Successfully confirmed pickup!");
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the pickup.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error("Unable to confirm the pickup.");
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Confirm drop off",
                  isValidated: requestState.completedDropoff,
                  actuator: requestState.completedDropoff
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the drop off?"
                          )
                        ) {
                          toast.loading("Confirming the drop off");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_dropoff_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                                selectedPackageIndex: 0,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success(
                                  "Successfully confirmed drop off!"
                                );
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the drop off.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error("Unable to confirm the drop off.");
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : requestState.inRouteToDropoff
              ? null
              : this.renderActionNode({
                  title: "Cancel for driver",
                  isValidated: false,
                  color: process.env.REACT_APP_ERROR_COLOR,
                  actuator: () =>
                    this.cancelRequestForDriver({ requestData: requestData }),
                })}
            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderActionNode({
                  title: "Delete request",
                  isValidated: false,
                  color: process.env.REACT_APP_ERROR_COLOR,
                  actuator: () =>
                    this.deleteRequest({ requestData: requestData }),
                })}
          </div>
        );

      case "DELIVERY":
        return (
          <div
            className={classes.itiContainer}
            style={{
              marginTop: "20px",
              flexWrap: "wrap",
              borderBottomColor: "#fff",
            }}>
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Picked up money",
                  isValidated: requestState.didPickupCash,
                  actuator: requestState.didPickupCash
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the pickup of the money?"
                          )
                        ) {
                          toast.loading("Confirming the money pickup");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_pickup_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success(
                                  "Successfully confirmed money pickup!"
                                );
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the money pickup.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error(
                                "Unable to confirm the money pickup."
                              );
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Completed drop off",
                  isValidated: requestState.completedDropoff,
                  actuator: requestState.completedDropoff
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the packages drop off?"
                          )
                        ) {
                          toast.loading("Confirming the drop off");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_dropoff_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                                scope: "final", //! To know if this is the final drop off confirmation or not - final (last) or ignore anything else.
                                selectedPackageIndex: 0,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success(
                                  "Successfully confirmed drop off!"
                                );
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the drop off.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error("Unable to confirm the drop off.");
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderActionNode({
                  title: "Cancel for driver",
                  isValidated: false,
                  color: process.env.REACT_APP_ERROR_COLOR,
                  actuator: () =>
                    this.cancelRequestForDriver({ requestData: requestData }),
                })}
            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderActionNode({
                  title: "Delete request",
                  isValidated: false,
                  color: process.env.REACT_APP_ERROR_COLOR,
                  actuator: () =>
                    this.deleteRequest({ requestData: requestData }),
                })}
          </div>
        );

      case "SHOPPING":
        return (
          <div
            className={classes.itiContainer}
            style={{
              marginTop: "20px",
              flexWrap: "wrap",
              borderBottomColor: "#fff",
            }}>
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Picked up money",
                  isValidated: requestState.didPickupCash,
                  actuator: requestState.didPickupCash
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the pickup of the money?"
                          )
                        ) {
                          toast.loading("Confirming the money pickup");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_pickup_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success(
                                  "Successfully confirmed money pickup!"
                                );
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the money pickup.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error(
                                "Unable to confirm the money pickup."
                              );
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : this.renderActionNode({
                  title: "Completed shopping",
                  isValidated: requestState.completedShopping,
                  actuator: requestState.completedShopping
                    ? () => {}
                    : () => {
                        toast.dismiss();

                        if (
                          window.confirm(
                            "Do you really want to confirm the shopping of the items?"
                          )
                        ) {
                          toast.loading("Confirming the shopping");

                          let that = this;
                          axios
                            .post(
                              `${process.env.REACT_APP_BRIDGE}/confirm_dropoff_request_driver_io`,
                              {
                                request_fp: requestData.request_fp,
                                driver_fingerprint: requestData.shopper_id,
                                requestType: requestData.ride_mode,
                                scope: "final", //! To know if this is the final drop off confirmation or not - final (last) or ignore anything else.
                                selectedPackageIndex: 0,
                              }
                            )
                            .then(function (response) {
                              console.log(response.data);
                              toast.dismiss();

                              if (
                                /Successfully/i.test(response.data.response)
                              ) {
                                toast.success(
                                  "Successfully confirmed shopping!"
                                );
                                setTimeout(() => {
                                  //Go back
                                  that.setState({
                                    selectedDriverFocus: false,
                                  });
                                }, 4000);
                              } else toast.error("Unable to confirm the shopping.");
                            })
                            .catch(function (error) {
                              console.log(error);
                              toast.dismiss();
                              toast.error("Unable to confirm the shopping.");
                            });
                        }
                      },
                })}
            {requestData.shopper_id === "false"
              ? null
              : this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderActionNode({
                  title: "Cancel for driver",
                  isValidated: false,
                  color: process.env.REACT_APP_ERROR_COLOR,
                  actuator: () =>
                    this.cancelRequestForDriver({ requestData: requestData }),
                })}
            {this.state.selectedRequestStatus !== "inprogress"
              ? null
              : this.renderActionNode({
                  title: "Delete request",
                  isValidated: false,
                  color: process.env.REACT_APP_ERROR_COLOR,
                  actuator: () =>
                    this.deleteRequest({ requestData: requestData }),
                })}
          </div>
        );
      default:
        return <></>;
    }
  }

  //Render action node
  renderActionNode({
    title = "Document name",
    isValidated = false,
    color = process.env.REACT_APP_PRIMARY_COLOR,
    actuator = () => {
      console.log("No actions specified");
    },
  }) {
    return (
      <div
        className={classes.actionNode}
        style={{ color: color }}
        onClick={actuator}>
        <div>{title}</div>
        {isValidated ? (
          <CheckCircle style={{ fontSize: "15px" }} />
        ) : (
          <ArrowForwardIosSharp style={{ fontSize: "15px" }} />
        )}
      </div>
    );
  }

  //Render the driver details for each category
  renderDriverDetails({ requestData }) {
    if (requestData.shopper_id === "false")
      return (
        <div className={classes.lookingForDriverContainer}>
          {this.state.selectedRequestStatus === "cancelled" ? (
            requestData.ride_mode === "SHOPPING" ? (
              "Does not have a shopper"
            ) : (
              "Does not have a driver"
            )
          ) : (
            <>
              <Loader
                type="TailSpin"
                color="#096ed4"
                height={20}
                width={20}
                timeout={300000000} //3 secs
              />{" "}
              <span style={{ marginLeft: "15px" }}>
                {requestData.ride_mode === "SHOPPING"
                  ? "Still looking for a shopper..."
                  : "Still looking for a driver..."}
              </span>
            </>
          )}
        </div>
      );

    switch (requestData.ride_mode) {
      case "RIDE":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            <div className={classes.profileBrief}>
              <div className={classes.profilePicBrief}>
                <img
                  alt="profile"
                  src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Profiles_pictures/${requestData.driverData["identification_data"]["profile_picture"]}`}
                  className={classes.trueBriefImage}
                />
              </div>
              <div className={classes.textualInfosBrief}>
                {/* Name */}
                {this.renderInformationWithLabel({
                  title: this.state.selectedRequestForFocus.driverData["name"],
                  label: "Name",
                  fontSize: "16px",
                })}
                {/* Surname */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["surname"],
                  label: "Surname",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Gender */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["gender"],
                  label: "Gender",
                  fontSize: "16px",
                })}
                {/* Phone number */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.cars_data[0]
                      .taxi_number,
                  label: "Taxi number",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Surname */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.phone_number,
                  label: "Phone number",
                  fontSize: "16px",
                })}
              </div>
            </div>
          </div>
        );

      case "DELIVERY":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            <div className={classes.profileBrief}>
              <div className={classes.profilePicBrief}>
                <img
                  alt="profile"
                  src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Profiles_pictures/${requestData.driverData["identification_data"]["profile_picture"]}`}
                  className={classes.trueBriefImage}
                />
              </div>
              <div className={classes.textualInfosBrief}>
                {/* Name */}
                {this.renderInformationWithLabel({
                  title: this.state.selectedRequestForFocus.driverData["name"],
                  label: "Name",
                  fontSize: "16px",
                })}
                {/* Surname */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["surname"],
                  label: "Surname",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Gender */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["gender"],
                  label: "Gender",
                  fontSize: "16px",
                })}
                {/* Plate number */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.cars_data[0]
                      .plate_number,
                  label: "Plate number",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Phone */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.phone_number,
                  label: "Phone number",
                  fontSize: "16px",
                })}
              </div>
            </div>
          </div>
        );

      case "SHOPPING":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            <div className={classes.profileBrief}>
              <div className={classes.profilePicBrief}>
                <img
                  alt="profile"
                  src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Profiles_pictures/${requestData.driverData["identification_data"]["profile_picture"]}`}
                  className={classes.trueBriefImage}
                />
              </div>
              <div className={classes.textualInfosBrief}>
                {/* Name */}
                {this.renderInformationWithLabel({
                  title: this.state.selectedRequestForFocus.driverData["name"],
                  label: "Name",
                  fontSize: "16px",
                })}
                {/* Surname */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["surname"],
                  label: "Surname",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Gender */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData["gender"],
                  label: "Gender",
                  fontSize: "16px",
                })}
                {/* Plate number */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.cars_data[0]
                      .plate_number,
                  label: "Plate number",
                  fontSize: "16px",
                })}
              </div>
              {/* ... */}
              <div className={classes.textualInfosBrief}>
                {/* Phone */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedRequestForFocus.driverData.phone_number,
                  label: "Phone number",
                  fontSize: "16px",
                })}
              </div>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }

  //Render the fare details for each category
  renderFareDetails({ requestData }) {
    let fareData = requestData.totals_request;

    switch (requestData.ride_mode) {
      case "RIDE":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            {this.renderInformationWithLabel({
              title: `N$${fareData.fare}`,
              label: "Amount",
              marginLeft: "0px",
              color: process.env.REACT_APP_PRIMARY_COLOR,
            })}

            {/* Payment method */}
            {this.renderInformationWithLabel({
              title: this.getReadablePaymentMethod(requestData.payment_method),
              label: "Payment method",
              marginLeft: "0px",
            })}
          </div>
        );

      case "DELIVERY":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            {this.renderInformationWithLabel({
              title: `${fareData.total}`,
              label: "Total",
              marginLeft: "0px",
              color: process.env.REACT_APP_PRIMARY_COLOR,
            })}

            {/* Service fee */}
            {this.renderInformationWithLabel({
              title: fareData.service_fee,
              label: "Service fee",
              marginLeft: "0px",
            })}

            {/* Delivery fee */}
            {this.renderInformationWithLabel({
              title: fareData.delivery_fee,
              label: "Delivery fee",
              marginLeft: "0px",
            })}
          </div>
        );

      case "SHOPPING":
        return (
          <div className={classes.itiContainer} style={{ marginTop: "20px" }}>
            {this.renderInformationWithLabel({
              title: `${fareData.total}`,
              label: "Total",
              marginLeft: "0px",
              color: process.env.REACT_APP_PRIMARY_COLOR,
            })}

            {/* Service fee */}
            {this.renderInformationWithLabel({
              title: fareData.service_fee,
              label: "Service fee",
              marginLeft: "0px",
            })}

            {/* Cart */}
            {this.renderInformationWithLabel({
              title: fareData.cart,
              label: "Cart",
              marginLeft: "0px",
            })}

            {/* Cash pickup fee */}
            {this.renderInformationWithLabel({
              title: fareData.cash_pickup_fee,
              label: "Cash pickup fee",
              marginLeft: "0px",
            })}
          </div>
        );

      default:
        return <></>;
    }
  }

  //Itenary: pickup destination
  renderItinary() {
    switch (this.state.selectedRequestForFocus.ride_mode) {
      case "RIDE":
        return (
          <div className={classes.itiContainer}>
            <div>
              {this.renderLocationWithLabel({
                locationData: [
                  this.state.selectedRequestForFocus.locations.pickup,
                ],
                label: "Pickup location",
              })}
            </div>
            <div>
              {this.renderLocationWithLabel({
                locationData:
                  this.state.selectedRequestForFocus.locations.dropoff,
                label: "Drop off location",
              })}
            </div>
          </div>
        );

      case "DELIVERY":
        return (
          <div className={classes.itiContainer}>
            <div>
              {this.renderLocationWithLabel({
                locationData: [
                  this.state.selectedRequestForFocus.locations.pickup,
                ],
                label: "Pickup location",
              })}
            </div>
            <div>
              {this.renderLocationWithLabel({
                locationData:
                  this.state.selectedRequestForFocus.locations.dropoff,
                label: "Delivery location",
              })}
            </div>
          </div>
        );

      case "SHOPPING":
        return (
          <div className={classes.itiContainer}>
            <div>
              {this.renderLocationWithLabel({
                locationData: [
                  this.state.selectedRequestForFocus.locations.pickup,
                ],
                label: "Client location",
              })}
            </div>
            <div>
              {this.renderLocationWithLabel({
                locationData: [
                  this.state.selectedRequestForFocus.locations.delivery,
                ],
                label: "Delivery location",
              })}
            </div>
          </div>
        );

      default:
        return <></>;
    }
  }

  //Render location title and label
  renderLocationWithLabel({
    locationData = [{ suburb: "Suburb name", street_name: "Street name" }],
    label = "Label",
    color = "#000",
  }) {
    let isDelivery =
      locationData[0].dropoff_location !== undefined &&
      locationData[0].dropoff_location !== null;

    return (
      <div className={classes.infoPlusLabelContainerLocation}>
        <div className={classes.labelInfoPlusLocation}>{label}</div>
        {locationData.map((location, index) => {
          let locationReformattedData = getRealisticPlacesNames({
            locationData: isDelivery ? location.dropoff_location : location,
          });

          return (
            <div key={index} className={classes.locationCoreContainer}>
              <span className={classes.numberLocationIndex}>{index + 1}.</span>
              <div>
                <div
                  className={classes.titleInfoPlusLocation}
                  style={{ color: color }}>
                  {locationReformattedData.suburb}
                </div>
                {/* Recipient details if applicable */}
                {isDelivery ? (
                  <div
                    className={classes.suburbInfoPlusLocation}
                    style={{ color: color, marginBottom: "10px" }}>
                    <div>{location.name}</div>
                    <div
                      style={{ color: process.env.REACT_APP_SECONDARY_COLOR }}>
                      {location.phone}
                    </div>
                  </div>
                ) : null}
                {/* ..... */}
                <div
                  className={classes.suburbInfoPlusLocation}
                  style={{ color: color }}>
                  {locationReformattedData.street_name}
                  {locationReformattedData.street_name !== false &&
                  locationReformattedData.street_name.length > 0
                    ? ", "
                    : ""}
                  {locationReformattedData.location_name}
                  {locationReformattedData.location_name !== false &&
                  locationReformattedData.location_name.length > 0
                    ? ", "
                    : ""}
                  {locationReformattedData.city}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className={classes.container}>
        <Toaster />

        <Modal
          isOpen={this.state.shouldShowFocusModal}
          onAfterOpen={() => {}}
          onRequestClose={() => {}}
          style={customStyles}
          contentLabel="Request modal">
          {this.renderAppropriateModalContent()}
        </Modal>

        {/* Menu */}
        <DrawerMenu />

        {/* Right */}
        <div className={classes.contentContainer}>
          {this.basicHeader()}

          <div className={classes.containerTablesRequests}>
            {this.renderAppropriateDataTable()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
