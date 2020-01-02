import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getApps } from "../redux/actions/appActions";
import { createApp } from "../redux/actions/appActions";

//Components
import SimpleTable from "../components/SimpleTable";
import CreateApp from "../components/CreateApp";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = {};

class App extends Component {
  async componentDidMount() {
    this.props.getApps();
  }
  render() {
    const classes = this.props.classes;
    const apps = this.props.app.apps;
    let headers = [];
    if (apps.length > 0) {
      headers = Object.keys(apps[0]);
    }
    console.log(apps);
    return (
      <Grid container alignItems="center">
        <Typography variant="h3" component="h3">
          Apps
        </Typography>
        <Grid container item xs={12}>
          <SimpleTable data={apps} headers={headers} reference="app"/>
        </Grid>
        <Grid container item xs={12}>
          <CreateApp createApp={this.props.createApp} />
        </Grid>
      </Grid>
    );
  }
}

App.propTypes = {
  getApps: PropTypes.func.isRequired,
  createApp: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps, { getApps, createApp })(
  withStyles(styles)(App)
);
