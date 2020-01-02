import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material UI Components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//Icons

const styles = {
  root: {
    flexGrow: 1
  },
  home: {
    flexGrow: 1,
    justifyContent: "flex-start"
  }
};

class Navbar extends Component {
  render() {
    const classes = this.props.classes;
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="nav-container">
            <div className={classes.home}>
              <Button color="inherit">home</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
