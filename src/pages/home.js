import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setBreadcrumbs } from "../redux/actions/uiActions";
import { Link } from "react-router-dom";

import Login from "./login";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {};

class Home extends Component {
  async componentDidMount(){
    this.props.setBreadcrumbs([]);
  }
  render() {
    const classes = this.props.classes;
    const authenticated = this.props.authenticated;
    const listItems = [
      { name: "Setup Git" },
      { name: "Create React App" },
      { name: "Create App" },
      { name: "Generate Function Code" },
      { name: "Firebase Function Deploy" },
      { name: "Generate UI Code" },
      { name: "Firebase UI Deploy" }
    ];
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            Home
          </Typography>
          {authenticated ? (
            <Fragment>
              Logged In
              <Typography variant="body1">
                <Link to="/app">Apps</Link>
              </Typography>
            </Fragment>
          ) : (
            <Login history={this.props.history} />
          )}
        </Grid>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Instructions
            </ListSubheader>
          }
          className={classes.root}
        >
          {listItems.map(item => {
            return (
              <ListItem button key={item.name}>
                <ListItemText primary={item.name} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    );
  }
}

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  setBreadcrumbs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { setBreadcrumbs })(
  withStyles(styles)(Home)
);
