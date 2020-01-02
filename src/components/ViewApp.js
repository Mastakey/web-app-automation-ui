import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class ViewApp extends Component {
  render() {
    return <div>ViewApp</div>;
  }
}

ViewApp.propTypes = {
  getMyDocs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, null)(withStyles(styles)(ViewApp));
