import React, { Component } from "react";
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
const axios = require("axios").default;

class Drivers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedDriversCategory: "ride", //can be ride, delivery, shopping or awaiting
      hasError: false,
      usersData: { registered: [], awaiting: [] },
      selectedDriverFocus: {
        identification_data: {
          date_updated: {},
          rating: 5,
          copy_id_paper: "id_paper.pdf",
          profile_picture: "user.png",
          banking_details: { bank_name: "FNB", account_number: "237823473843" },
          driver_licence_doc: "licence.pdf",
          title: "Mr",
          copy_public_permit: "public_permit.pdf",
          copy_blue_paper: "blue_paper.pdf",
          isAccount_verified: true,
          copy_white_paper: "white_paper.pdf",
          personal_id_number: "N778821212IK",
          paymentNumber: 678998,
        },
        date_updated: "2022-04-11T13:00:38.000Z",
        gender: "M",
        account_verifications: {
          phone_verification_secrets: {
            otp: 92123,
            date_sent: "2022-06-30T15:25:11.000Z",
          },
        },
        payments_information: {},
        date_registered: "2020-05-11T09:45:00.000Z",
        operation_clearances: "SHOPPING",
        passwod: "1234567",
        owners_information: false,
        surname: "Pohembe",
        driver_fingerprint:
          "91ae265bca710a49756d90e382f9591dceba4b26cc03c01aaca3828145376321f9b8b401ae7e1efa41c99e7f210ecc191c62b2dc7bcda566e312378e1a1fdf1b",
        suspension_infos: [
          {
            date: {},
            reason: "PAID_COMISSION",
            state: false,
            bot_locker: "Junkstem",
          },
        ],
        suspension_message: "false",
        name: "Joseph",
        phone_number: "+264856997167",
        _id: "5fce6efe962c92a002ef1e79",
        cars_data: [
          {
            date_updated: {},
            permit_number: "23543-7748-993N",
            taxi_number: "H265",
            max_passengers: 4,
            taxi_picture: "default.png",
            car_brand: "Toyota Corolla",
            vehicle_type: "normalTaxiEconomy",
            plate_number: "N25578W",
            car_fingerprint: "dkjsdksjd2930293dskdjksdj20",
            date_registered: {},
          },
        ],
        isDriverSuspended: false,
        operational_state: {
          last_location: {
            country: "Namibia",
            location_name: "Inner City Church",
            date_updated: {},
            geographic_extent: false,
            prev_coordinates: { latitude: "-22.55928", longitude: "17.07581" },
            city: "Windhoek",
            street: "Johann Albrecht Street",
            coordinates: { latitude: "-22.40928", longitude: "17.08881" },
            suburb: "Windhoek West",
          },
          push_notification_token: "abc",
          default_selected_car: {
            vehicle_type: "normalTaxiEconomy",
            date_Selected: {},
            car_fingerprint: "dkjsdksjd2930293dskdjksdj20",
            max_passengers: 4,
          },
          status: "online",
        },
        regional_clearances: ["Windhoek"],
        email: "alexpohembe@gmail.com",
      }, //The driver data selected
    };
  }

  componentDidMount() {
    let that = this;

    this.intervalUpdater = setInterval(() => {
      that.setState({
        isLoading: true,
      });
      axios
        .post(`${process.env.REACT_APP_BRIDGE}/getDriversList`, {
          admin_fp: "abc",
        })
        .then(function (response) {
          console.log(response.data);

          that.setState({
            hasError: false,
            usersData: response.data.response,
            isLoading: false,
          });
        })
        .catch(function (error) {
          console.log(error);
          that.setState({
            hasError: true,
            usersData: { registered: [], awaiting: [] },
            isLoading: false,
          });
        });
    }, 5000);
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
          }}
        >
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
              }}
            >
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
                  ? selectedCategoryStyle
                  : {}
              }
              onClick={() => this.updateSelectedDriversCat("ride")}
            >
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
              onClick={() => this.updateSelectedDriversCat("delivery")}
            >
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
              onClick={() => this.updateSelectedDriversCat("shopping")}
            >
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
              onClick={() => this.updateSelectedDriversCat("awaiting")}
            >
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
      case "ride":
        return (
          <table className={classes.tableMain}>
            <tr className={classes.headerTable}>
              <td>#</td>
              <td>Profile</td>
              <td>Name</td>
              <td>Gender</td>
              <td>Phone</td>
              <td>State</td>
              <td>Taxi number</td>
              <td>User type</td>
            </tr>

            {/* Body */}
            {this.state.usersData.registered.map((user, index) => {
              if (user["operation_clearances"] === "RIDE") {
                let state = user["operational_state"]["status"];

                return (
                  <tr
                    key={index}
                    className={classes.rowElementTable}
                    onClick={() => this.updateSelectedDriverFocus(user)}
                  >
                    <td style={{ fontFamily: "MoveTextMedium" }}>
                      {index + 1}
                    </td>
                    <td>
                      <div className={classes.userProfileContainer}>
                        <img
                          alt="profile"
                          src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Profiles_pictures/${user["identification_data"]["profile_picture"]}`}
                        />
                      </div>
                    </td>
                    <td>
                      {user["name"]} {user["surname"]}
                    </td>
                    <td>{user["gender"]}</td>
                    <td>{user["phone_number"]}</td>
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
                      }
                    >
                      {state}
                    </td>
                    <td>{user["cars_data"][0]["taxi_number"]}</td>
                    <td>Taxi driver</td>
                  </tr>
                );
              } else return null;
            })}
          </table>
        );

      case "delivery":
        return (
          <table className={classes.tableMain}>
            <tr className={classes.headerTable}>
              <td>#</td>
              <td>Profile</td>
              <td>Name</td>
              <td>Gender</td>
              <td>Phone</td>
              <td>State</td>
              <td>Plate number</td>
              <td>User type</td>
            </tr>

            {/* Body */}
            {this.state.usersData.registered.map((user, index) => {
              if (user["operation_clearances"] === "DELIVERY") {
                let state = user["operational_state"]["status"];

                return (
                  <tr key={index} className={classes.rowElementTable}>
                    <td style={{ fontFamily: "MoveTextMedium" }}>
                      {index + 1}
                    </td>
                    <td>
                      <div className={classes.userProfileContainer}>
                        <img
                          alt="profile"
                          src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Profiles_pictures/${user["identification_data"]["profile_picture"]}`}
                        />
                      </div>
                    </td>
                    <td>
                      {user["name"]} {user["surname"]}
                    </td>
                    <td>{user["gender"]}</td>
                    <td>{user["phone_number"]}</td>
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
                      }
                    >
                      {state}
                    </td>
                    <td>{user["cars_data"][0]["plate_number"]}</td>
                    <td>Courier</td>
                  </tr>
                );
              } else return null;
            })}
          </table>
        );

      case "shopping":
        return (
          <table className={classes.tableMain}>
            <tr className={classes.headerTable}>
              <td>#</td>
              <td>Profile</td>
              <td>Name</td>
              <td>Gender</td>
              <td>Phone</td>
              <td>State</td>
              <td>ID number</td>
              <td>User type</td>
            </tr>

            {/* Body */}
            {this.state.usersData.registered.map((user, index) => {
              if (user["operation_clearances"] === "SHOPPING") {
                let state = user["operational_state"]["status"];

                return (
                  <tr key={index} className={classes.rowElementTable}>
                    <td style={{ fontFamily: "MoveTextMedium" }}>
                      {index + 1}
                    </td>
                    <td>
                      <div className={classes.userProfileContainer}>
                        <img
                          alt="profile"
                          src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Profiles_pictures/${user["identification_data"]["profile_picture"]}`}
                        />
                      </div>
                    </td>
                    <td>
                      {user["name"]} {user["surname"]}
                    </td>
                    <td>{user["gender"]}</td>
                    <td>{user["phone_number"]}</td>
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
                      }
                    >
                      {state}
                    </td>
                    <td>{user["_id"].toUpperCase().substring(0, 10)}</td>
                    <td>Shopper</td>
                  </tr>
                );
              } else return null;
            })}
          </table>
        );

      case "awaiting":
        return (
          <table className={classes.tableMain}>
            <tr className={classes.headerTable}>
              <td>#</td>
              <td>Profile</td>
              <td>Name</td>
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
                <tr key={index} className={classes.rowElementTable}>
                  <td style={{ fontFamily: "MoveTextMedium" }}>{index + 1}</td>
                  <td>
                    <div className={classes.userProfileContainer}>
                      <img
                        alt="profile"
                        src={`${process.env.REACT_APP_AWS_S3_DRIVERS_PROFILE_PICTURES_PATH}/Drivers_Applications/${user["documents"]["driver_photo"]}`}
                      />
                    </div>
                  </td>
                  <td>
                    {user["name"]} {user["surname"]}
                  </td>
                  <td>{user["city"]}</td>
                  <td>+{user["phone_number"]}</td>
                  <td
                    style={{
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                      fontFamily: "MoveTextBold",
                    }}
                  >
                    Uploaded
                  </td>
                  <td>
                    {user["driver_fingerprint"].toUpperCase().substring(0, 10)}
                  </td>
                  <td>{user["nature_driver"]}</td>
                  <td>{this.getReadableDate(user["date_applied"])}</td>
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
            <div className={classes.profilePicBrief}>Profile</div>
            <div className={classes.textualInfosBrief}>
              {/* Name */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus["name"],
                label: "Name",
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus["surname"],
                label: "Surname",
              })}
              {/* Gender */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus["gender"],
                label: "Gender",
              })}
              {/* Title */}
              {this.renderInformationWithLabel({
                title:
                  this.state.selectedDriverFocus["identification_data"][
                    "title"
                  ],
                label: "Title",
              })}
            </div>
            {/* 2 */}
            <div className={classes.textualInfosBrief}>
              {/* Email */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus["email"],
                label: "Email",
              })}
              {/* Rating */}
              {this.renderInformationWithLabel({
                title:
                  this.state.selectedDriverFocus["identification_data"][
                    "rating"
                  ],
                label: "Rating",
              })}
              {/* clearance */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus["operation_clearances"],
                label: "Operation clearance",
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.getReadableDate(
                  this.state.selectedDriverFocus["date_registered"]
                ),
                label: "Date registered",
              })}
            </div>
            {/* 3 */}
            <div className={classes.textualInfosBrief}>
              {/* Personal ID */}
              {this.renderInformationWithLabel({
                title:
                  this.state.selectedDriverFocus["identification_data"][
                    "personal_id_number"
                  ],
                label: "Personal ID",
              })}
              {/* Phone */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus["phone_number"],
                label: "Phone number",
              })}
              {/* Surname */}
              {this.renderInformationWithLabel({
                title: this.state.selectedDriverFocus["identification_data"][
                  "isAccount_verified"
                ]
                  ? "Verified"
                  : "Not verified",
                label: "Account state",
              })}
            </div>
          </div>
          {/* Car details */}
          {isShoppingDriver
            ? null
            : this.renderBasicTitle({ title: "Vehicle details" })}
          {isShoppingDriver ? null : (
            <div className={classes.profileBrief}>
              <div className={classes.profilePicBrief}>Car picture</div>
              <div className={classes.textualInfosBrief}>
                {/* Brand */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus["cars_data"][0]["car_brand"],
                  label: "Brand",
                })}
                {/* Plate no */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus["cars_data"][0][
                      "plate_number"
                    ],
                  label: "Plate number",
                })}
                {/* Permit no */}
                {isDeliveryDriver || isShoppingDriver
                  ? null
                  : this.renderInformationWithLabel({
                      title:
                        this.state.selectedDriverFocus["cars_data"][0][
                          "permit_number"
                        ],
                      label: "Permit number",
                    })}
                {/* Taxi number */}
                {isDeliveryDriver || isShoppingDriver
                  ? null
                  : this.renderInformationWithLabel({
                      title:
                        this.state.selectedDriverFocus["cars_data"][0][
                          "taxi_number"
                        ],
                      label: "Taxi number",
                    })}
              </div>
              {/* 2 */}
              <div className={classes.textualInfosBrief}>
                {/* Vehicle type */}
                {this.renderInformationWithLabel({
                  title: /economy/i.test(
                    this.state.selectedDriverFocus["cars_data"][0][
                      "vehicle_type"
                    ]
                  )
                    ? "Economy"
                    : "Private",
                  label: "Vehicle type",
                })}
                {/* Status */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus["operational_state"][
                      "status"
                    ],
                  label: "Status",
                })}
              </div>
              {/* 3 */}
              <div className={classes.textualInfosBrief}>
                {/* Regional clearance */}
                {this.renderInformationWithLabel({
                  title:
                    this.state.selectedDriverFocus["regional_clearances"][0],
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
                this.state.selectedDriverFocus["operation_clearances"],
            })}
          </div>

          {/* Authority zone */}
          {this.renderBasicTitle({ title: "Authority zone" })}
          <div
            className={classes.profileBrief}
            style={{ display: "block", border: "none" }}
          >
            <div
              className={classes.suspendAccButton}
              onClick={() => {
                toast.dismiss();
                toast.loading("Suspending the driver.");

                let that = this;
                console.log({
                  admin_fp: "abc",
                  operation:
                    this.state.selectedDriverFocus["isDriverSuspended"] ===
                    false
                      ? "suspended"
                      : "unsuspend",
                  driver_id: this.state.selectedDriverFocus["_id"],
                });
                axios
                  .post(
                    `${process.env.REACT_APP_BRIDGE}/suspendUnsuspendDriver`,
                    {
                      admin_fp: "abc",
                      operation:
                        this.state.selectedDriverFocus["isDriverSuspended"] ===
                        false
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
                    else toast.success("Successfully updated");
                  })
                  .catch(function (error) {
                    console.log(error);
                    toast.dismiss();
                    toast.error("Unable to perform the operation.");
                  });
              }}
            >
              {this.state.selectedDriverFocus["isDriverSuspended"]
                ? "Unsuspend this account"
                : "Suspend this account"}
            </div>
            <div className={classes.labelInfoPlusL}>
              {this.state.selectedDriverFocus["isDriverSuspended"]
                ? "The driver will be able to see the requests immediately."
                : "The driver will not be able to see requests immediately."}
            </div>
          </div>
        </div>
      );
    } //Awaiting approval driver
    else {
      return <div>Awaiting approval</div>;
    }
  }

  //Render documents based on the driver type
  renderDocumentsList({ driver_type = "TYPE" }) {
    switch (driver_type) {
      case "RIDE":
        return (
          <>
            {this.renderDocumentNode({ title: "ID paper" })}
            {this.renderDocumentNode({ title: "Driver license" })}
            {this.renderDocumentNode({ title: "Public permit" })}
            {this.renderDocumentNode({ title: "Blue paper" })}
            {this.renderDocumentNode({ title: "White paper" })}
          </>
        );

      case "DELIVERY":
        return (
          <>
            {this.renderDocumentNode({ title: "ID paper" })}
            {/* {this.renderDocumentNode({ title: "Driver license" })} */}
          </>
        );

      case "SHOPPING":
        return (
          <>
            {this.renderDocumentNode({ title: "ID paper" })}
            {/* {this.renderDocumentNode({ title: "Driver license" })} */}
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
  renderInformationWithLabel({ title = "Title", label = "Label" }) {
    return (
      <div className={classes.infoPlusLabelContainer}>
        <div className={classes.labelInfoPlusL}>{label}</div>
        <div className={classes.titleInfoPlusL}>{title}</div>
      </div>
    );
  }

  //Render document node
  renderDocumentNode({ title = "Document name" }) {
    return (
      <div className={classes.documentNode}>
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

export default Drivers;
