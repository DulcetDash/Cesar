import React, { Component } from "react";
import classes from "../Styles/Home.module.css";
import DrawerMenu from "./DrawerMenu";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classes.container}>
        {/* Menu */}
        <DrawerMenu />

        {/* Right */}
        <div className={classes.contentContainer}>Content</div>
      </div>
    );
  }
}

export default Home;
