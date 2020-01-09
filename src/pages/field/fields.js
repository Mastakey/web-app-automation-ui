import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createField, getFieldsByObj } from "../../redux/actions/fieldActions";
import SimpleTable from "../../components/SimpleTable";
import CreateField from "../../components/field/CreateField";

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

class ObjFields extends Component {
  constructor() {
    super();
    this.state = {
      createFormEnabled: false
    };
  }
  async componentDidMount() {
    const id = this.props.objId;
    await this.props.getFieldsByObj(id);
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
    const classes = this.props.classes;
    const fields = this.props.field.fields;
    let headers = [];
    if (fields.length > 0) {
      headers = Object.keys(fields[0]);
    }
    return (
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Fields
          </Typography>
          <Paper className={classes.paper}>
            <SimpleTable data={fields} headers={headers} reference="field" />
            {this.state.createFormEnabled ? (
              <CreateField
                createField={this.props.createField}
                objId={this.props.objId}
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

ObjFields.propTypes = {
  createField: PropTypes.func.isRequired,
  getFieldsByObj: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { createField, getFieldsByObj })(
  withStyles(styles)(ObjFields)
);
