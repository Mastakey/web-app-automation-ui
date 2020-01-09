import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editApp, getApp } from "../../redux/actions/appActions";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = {};

class AppEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      apiUrl: "",
      databaseURL: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getApp(id);
    console.log(this.props);
    this.setState({
      name: this.props.app.app.name,
      description: this.props.app.app.description,
      apiUrl: this.props.app.app.apiUrl,
      databaseURL: this.props.app.app.databaseURL
    });
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = async event => {
    event.preventDefault();
    //console.log(this.state);
    const data = {
      name: this.state.name,
      description: this.state.description,
      apiUrl: this.state.apiUrl,
      databaseURL: this.state.databaseURL
    };
    //console.log(this.props);
    await this.props.editApp(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={this.state.name}
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={this.state.description}
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="apiUrl"
            label="API URL"
            variant="outlined"
            value={this.state.apiUrl}
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="databaseURL"
            label="Database URL"
            variant="outlined"
            value={this.state.databaseURL}
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={this.handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }
}

AppEdit.propTypes = {
  app: PropTypes.object.isRequired,
  editApp: PropTypes.func.isRequired,
  getApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps, { editApp, getApp })(
  withStyles(styles)(AppEdit)
);
