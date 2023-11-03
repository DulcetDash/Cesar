import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateSuccessfullLoginDetails } from "../Redux/HomeActionsCreators";

import classes from "../Styles/Home.module.css";
import DrawerMenu from "./DrawerMenu";
import Loader from "react-loader-spinner";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  LineSeries,
  LabelSeries,
  makeWidthFlexible,
  DiscreteColorLegend,
  Crosshair,
} from "react-vis";
import "react-vis/dist/style.css";
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const axios = require("axios").default;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      hasError: false,
      summaryMetaData: [],
      crosshairValues: [],
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

  //Get general summary data
  getGeneralSummary() {
    let that = this;
    axios
      .post(`${process.env.REACT_APP_BRIDGE}/getSummaryData`, {
        admin_fp: that.props.App.loginData.admin_fp,
        token_j: that.props.App.loginData.token_j,
      })
      .then(function (response) {
        // console.log(response.data);
        if (response.data.response === "error_Logout") {
          //!Log out
          // that.props.UpdateSuccessfullLoginDetails(false);
          // window.location.href = "/";
        } else if (response.data.response !== "error") {
          //SUCCESS
          that.setState({
            hasError: false,
            summaryMetaData: response.data.response,
            isLoading: false,
          });
        }
        //error
        else {
          that.setState({
            hasError: true,
            summaryMetaData: [],
            isLoading: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        that.setState({
          hasError: true,
          summaryMetaData: [],
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    let that = this;

    that.getGeneralSummary();

    this.intervalUpdater = setInterval(() => {
      that.setState({
        isLoading: true,
      });

      that.getGeneralSummary();
    }, 7 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalUpdater);
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
          <div className={classes.headerTitle}>Summary</div>
        </div>
        {/* Loader */}
        <div className={classes.rightCategoriesDrivers}>
          <div style={{ fontSize: "13px" }}>Updates every 7min</div>
        </div>
      </div>
    );
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
    placeholder = "",
  }) {
    return (
      <div className={classes.infoPlusLabelContainer} title={placeholder}>
        <div className={classes.labelInfoPlusL}>{label}</div>
        <div className={classes.titleInfoPlusL} style={{ color: color }}>
          {title}
        </div>
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

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  _onNearestX = (value, { index }) => {
    let DATA = [
      this.state.summaryMetaData.today_graph_data.successful_requests,
      this.state.summaryMetaData.today_graph_data.cancelled_requests,
    ];
    //....
    this.setState({ crosshairValues: DATA.map((d) => d[index]) });
  };

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave = () => {
    this.setState({ crosshairValues: [] });
  };

  render() {
    return (
      <div className={classes.container}>
        {/* Menu */}
        <DrawerMenu />

        {/* Right */}
        <div className={classes.contentContainer}>
          {this.basicHeader()}
          <div className={classes.graphContainer}>
            {this.state.summaryMetaData.length === 0 && this.state.isLoading ? (
              <div
                className={classes.emptyDriversShower}
                style={{
                  marginTop: 0,
                  height: "500px",
                  marginLeft: 0,
                  marginRight: 0,
                }}>
                <Loader
                  type="TailSpin"
                  color="#000"
                  height={50}
                  width={50}
                  timeout={300000000} //3 secs
                />
              </div>
            ) : this.state.summaryMetaData.length === 0 &&
              this.state.isLoading === false ? (
              <div
                className={classes.emptyDriversShower}
                style={{
                  marginTop: 0,
                  height: "500px",
                  marginLeft: 0,
                  marginRight: 0,
                }}>
                No data found, please try refreshing.
              </div>
            ) : (
              <div className={classes.graphTrueContainer}>
                <FlexibleXYPlot
                  xType="ordinal"
                  height={500}
                  margin={{ bottom: 100 }}
                  stackBy="y">
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis title="Days" tickLabelAngle={90} tickPadding={60} />
                  <YAxis
                    tickFormat={(v) => (/\./i.test(String(v)) ? null : v)}
                  />
                  <DiscreteColorLegend
                    style={{
                      position: "relative",
                      left: "20px",
                      bottom: "0px",
                    }}
                    orientation="horizontal"
                    items={[
                      {
                        title: "Successful requests",
                        color: process.env.REACT_APP_PRIMARY_COLOR,
                      },
                      {
                        title: "Cancelled requests",
                        color: process.env.REACT_APP_ERROR_COLOR,
                      },
                    ]}
                  />

                  <VerticalBarSeries
                    data={
                      this.state.summaryMetaData.today_graph_data
                        .successful_requests
                    }
                    curve={"curveMonotoneX"}
                    style={{
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                    }}
                    color={process.env.REACT_APP_PRIMARY_COLOR}
                    onNearestX={this._onNearestX}
                    onValueMouseOut={this._onMouseLeave}
                  />

                  {/* Show cancelled total trips */}
                  <VerticalBarSeries
                    data={
                      this.state.summaryMetaData.today_graph_data
                        .cancelled_requests
                    }
                    curve={"curveMonotoneX"}
                    style={{
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                    }}
                    color={process.env.REACT_APP_ERROR_COLOR}
                    onNearestX={this._onNearestX}
                    onValueMouseOut={this._onMouseLeave}
                  />

                  {/* Crosshair */}
                  <Crosshair
                    values={this.state.crosshairValues}
                    className={"test-class-name"}
                    titleFormat={(d) => ({
                      title: "Requests",
                      value: d[0].y + d[1].y,
                    })}
                    itemsFormat={(d) => [
                      { title: "Successful", value: d[0].y },
                      { title: "Cancelled", value: d[1].y },
                    ]}
                  />
                </FlexibleXYPlot>
              </div>
            )}
          </div>

          {/* Data split */}
          {this.state.summaryMetaData.length === 0 && this.state.isLoading ? (
            <div className={classes.emptyDriversShower}>
              <Loader
                type="TailSpin"
                color="#000"
                height={50}
                width={50}
                timeout={300000000} //3 secs
              />
            </div>
          ) : this.state.summaryMetaData.length === 0 &&
            this.state.isLoading === false ? (
            <div
              className={classes.emptyDriversShower}
              style={{
                marginTop: "120px",
                height: "500px",
                marginLeft: 0,
                marginRight: 0,
              }}>
              No data found, please try refreshing.
            </div>
          ) : (
            <div className={classes.dataSplitContainer}>
              {/* Today */}
              <div className={classes.dataSplitNode}>
                {this.renderBasicTitle({ title: "Today's overview" })}
                <div className={classes.dsplitInsiderContainer}>
                  {/* 1 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total requests",
                      title: this.state.summaryMetaData.today.total_requests,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total deliveries",
                      title: this.state.summaryMetaData.today.total_deliveries,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total shoppings",
                      title: this.state.summaryMetaData.today.total_shoppings,
                    })}
                  </div>
                  {/* 2 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total cancelled requests",
                      title:
                        this.state.summaryMetaData.today
                          .total_cancelled_requests,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total cancelled deliveries",
                      title:
                        this.state.summaryMetaData.today
                          .total_cancelled_deliveries,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total cancelled shoppings",
                      title:
                        this.state.summaryMetaData.today
                          .total_cancelled_shoppings,
                    })}
                  </div>
                  {/* 3 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total sales",
                      title:
                        "N$" + this.state.summaryMetaData.today.total_sales,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total revenues",
                      title:
                        "N$" + this.state.summaryMetaData.today.total_revenues,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total loss",
                      title: "N$" + this.state.summaryMetaData.today.total_loss,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Percentage Handling",
                      placeholder:
                        "Total requests divided by the total cancelled requests.",
                      title: `${Math.round(
                        (this.state.summaryMetaData.today.total_requests *
                          100) /
                          (this.state.summaryMetaData.today
                            .total_cancelled_requests === 0
                            ? 1
                            : this.state.summaryMetaData.today
                                .total_cancelled_requests)
                      )}%`,
                      color:
                        Math.round(
                          (this.state.summaryMetaData.today.total_requests *
                            100) /
                            (this.state.summaryMetaData.today
                              .total_cancelled_requests === 0
                              ? 1
                              : this.state.summaryMetaData.today
                                  .total_cancelled_requests)
                        ) >= 50
                          ? process.env.REACT_APP_PRIMARY_COLOR
                          : process.env.REACT_APP_ERROR_COLOR,
                    })}
                  </div>
                </div>
              </div>

              {/* Requests */}
              <div className={classes.dataSplitNode}>
                {this.renderBasicTitle({ title: "General requests" })}
                <div className={classes.dsplitInsiderContainer}>
                  {/* 1 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total requests",
                      title:
                        this.state.summaryMetaData.general_requests
                          .total_requests,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total deliveries",
                      title:
                        this.state.summaryMetaData.general_requests
                          .total_deliveries,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total shoppings",
                      title:
                        this.state.summaryMetaData.general_requests
                          .total_shoppings,
                    })}
                  </div>
                  {/* 2 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total cancelled requests",
                      title:
                        this.state.summaryMetaData.general_requests
                          .total_cancelled_requests,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total cancelled deliveries",
                      title:
                        this.state.summaryMetaData.general_requests
                          .total_cancelled_deliveries,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total cancelled shoppings",
                      title:
                        this.state.summaryMetaData.general_requests
                          .total_cancelled_shoppings,
                    })}
                  </div>
                  {/* 3 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Percentage Handling",
                      placeholder:
                        "Total requests divided by the total cancelled requests.",
                      title: `${Math.round(
                        (this.state.summaryMetaData.general_requests
                          .total_requests *
                          100) /
                          (this.state.summaryMetaData.general_requests
                            .total_cancelled_requests === 0
                            ? 1
                            : this.state.summaryMetaData.general_requests
                                .total_cancelled_requests)
                      )}%`,
                      color:
                        Math.round(
                          (this.state.summaryMetaData.general_requests
                            .total_requests *
                            100) /
                            (this.state.summaryMetaData.general_requests
                              .total_cancelled_requests === 0
                              ? 1
                              : this.state.summaryMetaData.general_requests
                                  .total_cancelled_requests)
                        ) >= 50
                          ? process.env.REACT_APP_PRIMARY_COLOR
                          : process.env.REACT_APP_ERROR_COLOR,
                    })}
                  </div>
                </div>
              </div>

              {/* Financial */}
              <div className={classes.dataSplitNode}>
                {this.renderBasicTitle({ title: "General finances" })}
                <div className={classes.dsplitInsiderContainer}>
                  {/* 1 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total sales",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances.total_sales,
                      color: process.env.REACT_APP_PRIMARY_COLOR,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total revenues",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances
                          .total_revenues,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total deliveries sales",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances
                          .total_deliveries_sales,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total deliveries revenues",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances
                          .total_deliveries_revenues,
                    })}
                  </div>
                  {/* 2 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total shoppings sales",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances
                          .total_shoppings_sales,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total shoppings revenues",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances
                          .total_shoppings_revenues,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total loss",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances.total_loss,
                      color: process.env.REACT_APP_ERROR_COLOR,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total loss for deliveries",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances
                          .total_deliveries_loss,
                    })}
                  </div>
                  {/* 3 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total loss for shoppings",
                      title:
                        "N$" +
                        this.state.summaryMetaData.general_finances
                          .total_shoppings_loss,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Percentage Handling",
                      placeholder:
                        "Total gross sales divided by the total gross loss.",
                      title: `${Math.round(
                        (this.state.summaryMetaData.general_finances
                          .total_sales *
                          100) /
                          (this.state.summaryMetaData.general_finances
                            .total_loss === 0
                            ? 1
                            : this.state.summaryMetaData.general_finances
                                .total_loss)
                      )}%`,
                      color:
                        Math.round(
                          (this.state.summaryMetaData.general_finances
                            .total_sales *
                            100) /
                            (this.state.summaryMetaData.general_finances
                              .total_loss === 0
                              ? 1
                              : this.state.summaryMetaData.general_finances
                                  .total_loss)
                        ) >= 50
                          ? process.env.REACT_APP_PRIMARY_COLOR
                          : process.env.REACT_APP_ERROR_COLOR,
                    })}
                  </div>
                </div>
              </div>

              {/* Users */}
              <div className={classes.dataSplitNode}>
                {this.renderBasicTitle({ title: "Users" })}
                <div className={classes.dsplitInsiderContainer}>
                  {/* 1 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total users",
                      title: this.state.summaryMetaData.users.total_users,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total male users",
                      title: this.state.summaryMetaData.users.total_male_users,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total female users",
                      title:
                        this.state.summaryMetaData.users.total_female_users,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total unknown gender users",
                      title:
                        this.state.summaryMetaData.users
                          .total_unknown_gender_users,
                    })}
                  </div>
                  {/* 2 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total MTC numbers",
                      title: this.state.summaryMetaData.users.total_mtc_users,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total TN mobile numbers",
                      title:
                        this.state.summaryMetaData.users.total_tnmobile_users,
                    })}
                  </div>
                  {/* 3 */}
                  <div></div>
                </div>
              </div>

              {/* Drivers */}
              <div className={classes.dataSplitNode}>
                {this.renderBasicTitle({ title: "Drivers" })}
                <div className={classes.dsplitInsiderContainer}>
                  {/* 1 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total drivers (all)",
                      title: this.state.summaryMetaData.drivers.total_drivers,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total delivery drivers",
                      title:
                        this.state.summaryMetaData.drivers
                          .total_delivery_drivers,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total shoppers",
                      title: this.state.summaryMetaData.drivers.total_shoppers,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total male drivers (all)",
                      title:
                        this.state.summaryMetaData.drivers.total_male_drivers,
                    })}
                  </div>
                  {/* 2 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total female drivers (all)",
                      title:
                        this.state.summaryMetaData.drivers.total_female_drivers,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total unknown gender drivers (all)",
                      title:
                        this.state.summaryMetaData.drivers
                          .total_unknown_gender_drivers,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total male delivery drivers",
                      title:
                        this.state.summaryMetaData.drivers
                          .total_male_delivery_drivers,
                    })}
                  </div>
                  {/* 3 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total female delivery drivers",
                      title:
                        this.state.summaryMetaData.drivers
                          .total_female_delivery_drivers,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total male shoppers",
                      title:
                        this.state.summaryMetaData.drivers.total_male_shoppers,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total female shoppers",
                      title:
                        this.state.summaryMetaData.drivers
                          .total_female_shoppers,
                    })}
                  </div>
                </div>
              </div>

              {/* Shopping details */}
              <div className={classes.dataSplitNode}>
                {this.renderBasicTitle({ title: "Shopping details" })}
                <div className={classes.dsplitInsiderContainer}>
                  {/* 1 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Total stores registered",
                      title:
                        this.state.summaryMetaData.shopping_details
                          .total_stores_registered,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total unpublished stores",
                      title:
                        this.state.summaryMetaData.shopping_details
                          .total_unpublished_stores,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Total products in catalogue",
                      title:
                        this.state.summaryMetaData.shopping_details
                          .total_products_in_catalogue,
                    })}

                    {this.renderInformationWithLabel({
                      label: "Interval catalogue update",
                      title:
                        this.state.summaryMetaData.shopping_details
                          .interval_catalogue_update,
                    })}
                  </div>
                  {/* 2 */}
                  <div>
                    {this.renderInformationWithLabel({
                      label: "Last update",
                      title: this.getReadableDate(
                        this.state.summaryMetaData.shopping_details.last_updated
                      ),
                    })}
                  </div>
                  {/* 3 */}
                  <div></div>
                </div>
              </div>
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
