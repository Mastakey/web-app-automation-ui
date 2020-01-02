import React, { Component, Fragment } from "react";
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

class CreateField extends Component {
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
      appId: this.props.appId,
      options: this.state.options
    };
    await this.props.createField(data);
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
            <Typography>Options</Typography>
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
              {this.props.errors && errorStr}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateField.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(CreateField));
