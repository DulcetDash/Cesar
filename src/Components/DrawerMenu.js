import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateSuccessfullLoginDetails } from "../Redux/HomeActionsCreators";

import classes from "../Styles/Drawer.module.css";
import logoWhite from "../Images/logo.png";
import logoBlack from "../Images/logo_white.png";
import { Home, Person, BarChart, LocalTaxi } from "@material-ui/icons";
import { MdPrivacyTip, MdLogout, MdInfo, MdAccountBox } from "react-icons/md";

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.intervalUpdater = null;
  }

  //Menu element
  menuElement({
    title = "Menu",
    link = "/",
    isSelected = false,
    icon = <Home style={{ fontSize: "18px", marginRight: "3px" }} />,
  }) {
    let selectedStyle = {
      color: "#11A05A",
      fontFamily: "MoveTextBold",
      backgroundColor: "#f0f0f0",
    };

    return (
      <div
        className={
          link === false
            ? classes.menuElementStatic
            : link === "logout"
            ? classes.menuElementLogout
            : classes.menuElement
        }
        onClick={
          link === false
            ? () => {}
            : link === "logout"
            ? () => {
                //Log out
                this.props.UpdateSuccessfullLoginDetails(false);
                window.location.href = "/";
              }
            : () => (window.location.href = link)
        }
        style={isSelected ? selectedStyle : {}}
      >
        {icon}
        <span>{title}</span>
      </div>
    );
  }

  render() {
    let userDetails = this.props.App.loginData;
    //....
    return (
      <div className={classes.container}>
        <div className={classes.logoHeader}>
          <img alt="logo" src={logoWhite} className={classes.trueLogoHeader} />
        </div>

        {/* Elements */}
        {this.menuElement({
          title: "Home",
          link: "/home",
          isSelected: /\/$/i.test(window.location.href),
        })}
        {this.menuElement({
          title: "Drivers",
          link: "/drivers",
          isSelected: /drivers/i.test(window.location.href),
          icon: <LocalTaxi style={{ fontSize: "18px", marginRight: "3px" }} />,
        })}
        {this.menuElement({
          title: "Users",
          link: "/users",
          isSelected: /users/i.test(window.location.href),
          icon: <Person style={{ fontSize: "18px", marginRight: "3px" }} />,
        })}
        {this.menuElement({
          title: "Requests",
          link: "/requests",
          isSelected: /requests/i.test(window.location.href),
          icon: <BarChart style={{ fontSize: "18px", marginRight: "3px" }} />,
        })}

        {/* Spe */}
        <div className={classes.sepa}></div>

        {/* User details */}
        {this.menuElement({
          title: userDetails.name,
          link: false,
          isSelected: false,
          icon: (
            <MdAccountBox
              style={{
                fontSize: "18px",
                marginRight: "3px",
                color: process.env.REACT_APP_SECONDARY_COLOR,
              }}
            />
          ),
        })}
        {/* Log out */}
        {this.menuElement({
          title: "Log out",
          link: "logout",
          isSelected: false,
          icon: (
            <MdLogout
              style={{
                fontSize: "18px",
                marginRight: "3px",
                marginBottom: "1px",
                color: process.env.REACT_APP_ERROR_COLOR,
              }}
            />
          ),
        })}
        {/* Version */}
        {this.menuElement({
          title: process.env.REACT_APP_CESAR_VERSION,
          link: false,
          isSelected: false,
          icon: (
            <MdInfo
              style={{
                fontSize: "14px",
                marginRight: "3px",
                // color: '#',
              }}
            />
          ),
        })}
        {/* Copyright */}
        <div className={classes.copyright}>
          <div>© 2022 Orniss Technologies CC.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
