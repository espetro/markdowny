import React, { Component } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import MenuList from "./MenuList";

class Navbar extends Component {

    render() {

        return(
        <AppBar position="static" color="default">
          <Toolbar>
            <MenuList text={this.props.text} />
            <img src={this.props.logo} alt="react logo"
              width="50" height="50"/>
          </Toolbar>
        </AppBar>
        );
    }
}

export default Navbar;