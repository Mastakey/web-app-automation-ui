import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getApp, deleteApp } from "../redux/actions/appActions";
import { Link } from "react-router-dom";
import AppFields from "./appfields";
import AppCode from "./appcode";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

//Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  title: {
    display: "inline-block"
  },
  fabDelete: {
    float: "right"
  },
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "10px"
  }
};

class AppView extends Component {
  handleDelete() {
    //console.log(this.props.data);
    this.props.deleteApp(this.props.match.params.id, this.props.history);
  }
  handleEdit() {}
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getApp(id);
  }
  render() {
    const app = this.props.app.app;
    const classes = this.props.classes;

    console.log(app);
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.title}>
            {app.name}
          </Typography>
          <Fab
            size="small"
            color="secondary"
            onClick={this.handleDelete.bind(this)}
            className={classes.fabDelete}
          >
            <DeleteIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" component="h3"></Typography>

            <Typography variant="body1">{app.description}</Typography>
            <Link to={`/app/edit/${this.props.match.params.id}`}>
              <Fab
                size="small"
                color="default"
                onClick={this.handleEdit.bind(this)}
                className={classes.fab}
              >
                <EditIcon />
              </Fab>
            </Link>
          </Paper>
        </Grid>
        <AppFields appId={this.props.match.params.id} />
        <AppCode appId={this.props.match.params.id} />
      </Grid>
    );
  }
}

AppView.propTypes = {
  getApp: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  app: state.app,
});

export default connect(mapStateToProps, { getApp, deleteApp })(
  withStyles(styles)(AppView)
);
