import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getObjectsByApp, createObject } from "../../redux/actions/objActions";
import SimpleTable from "../../components/SimpleTable";

import CreateObj from "../../components/object/CreateObj";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

//Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "10px"
  }
};

class AppObjects extends Component {
  constructor() {
    super();
    this.state = {
      createFormEnabled: false
    };
  }
  async componentDidMount() {
    const id = this.props.appId;
    await this.props.getObjectsByApp(id);
  }
  handleAddField() {
    this.setState({
      ...this.state,
      createFormEnabled: true
    });
  }
  disableCreateForm() {
    this.setState({
      ...this.state,
      createFormEnabled: false
    });
  }
  render() {
    const objects = this.props.obj.objects;
    let headers = [];
    if (objects.length > 0) {
      headers = Object.keys(objects[0]);
    }
    const classes = this.props.classes;
    return (
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Objects
        </Typography>
        <Paper className={classes.paper}>
          <SimpleTable data={objects} headers={headers} reference="obj" />
          {this.state.createFormEnabled ? (
            <CreateObj
              createObject={this.props.createObject}
              appId={this.props.appId}
              disableCreateForm={this.disableCreateForm.bind(this)}
            />
          ) : (
            <Fab size="small" color="primary" className={classes.fab}>
              <AddIcon onClick={this.handleAddField.bind(this)} />
            </Fab>
          )}
        </Paper>
      </Grid>
    );
  }
}

AppObjects.propTypes = {
  obj: PropTypes.object.isRequired,
  getObjectsByApp: PropTypes.func.isRequired,
  createObject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ obj: state.obj });

export default connect(mapStateToProps, { getObjectsByApp, createObject })(
  withStyles(styles)(AppObjects)
);
