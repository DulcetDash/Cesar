import React, { Component } from "react";
import classes from "../Styles/Drawer.module.css";
import logoWhite from "../Images/logo.png";
import logoBlack from "../Images/logo_white.png";

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.intervalUpdater = null;
  }

  //Menu element
  menuElement({ title = "Menu", link = "/", isSelected = false }) {
    let selectedStyle = {
      color: "#11A05A",
      fontFamily: "MoveTextBold",
      backgroundColor: "#f0f0f0",
    };

    return (
      <div
        className={classes.menuElement}
        onClick={() => (window.location.href = link)}
        style={isSelected ? selectedStyle : {}}
      >
        <span>{title}</span>
      </div>
    );
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.logoHeader}>
          <img alt="logo" src={logoWhite} className={classes.trueLogoHeader} />
        </div>

        {/* Elements */}
        {this.menuElement({
          title: "Home",
          link: "/",
          isSelected: /\/$/i.test(window.location.href),
        })}
        {this.menuElement({
          title: "Drivers",
          link: "/drivers",
          isSelected: /drivers/i.test(window.location.href),
        })}
        {this.menuElement({
          title: "Users",
          link: "/users",
          isSelected: /users/i.test(window.location.href),
        })}
        {this.menuElement({
          title: "Requests",
          link: "/requests",
          isSelected: /requests/i.test(window.location.href),
        })}
      </div>
    );
  }
}

export default DrawerMenu;
