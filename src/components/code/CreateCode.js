import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const styles = {};

class CreateCode extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      type: "",
      options: {}
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      type: this.state.type,
      objId: this.props.objId,
      appId: this.props.appId
    };
    if (this.state.type === "service") {
      await this.props.createCodeService(data);
    } else if (this.state.type === "controller") {
      await this.props.createCodeController(data);
    } else if (this.state.type === "route") {
      await this.props.createCodeRoute(data);
    } else {
      await this.props.createCode(data);
    }
  };

  render() {
    const classes = this.props.classes;
    const loading = this.props.loading;
    const errors = this.props.errors;
    let errorStr = "";
    return (
      <div>
        <h1>Create</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              autoComplete="off"
              label="Name"
              variant="outlined"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="type"
              label="Type"
              variant="outlined"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={this.handleSubmit}
            >
              Submit
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.disableCreateForm}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="secondary">
              {errors && errorStr}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateCode.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(CreateCode));
