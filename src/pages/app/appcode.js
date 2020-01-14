import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCodeByApp,
  deleteCode,
  createCodeRoute
} from "../../redux/actions/codeActions";
import ViewCode from "../../components/code/ViewCode";
import CreateCode from "../../components/code/CreateCode";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Fab from "@material-ui/core/Fab";

//Materical Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "10px"
  },
  fabRight: {
    marginTop: "10px",
    float: "right"
  }
};

class AppCode extends Component {
  constructor() {
    super();
    this.state = {
      createFormEnabled: false
    };
  }
  async deleteCode(id) {
    await this.props.deleteCode(id);
  }
  disableCreateForm() {
    this.setState({
      ...this.state,
      createFormEnabled: false
    });
  }
  handleAddField() {
    this.setState({
      ...this.state,
      createFormEnabled: true
    });
  }
  async componentDidMount() {
    const id = this.props.appId;
    await this.props.getCodeByApp(id);
  }
  render() {
    const classes = this.props.classes;
    const codes = this.props.code.codes;
    console.log(codes);
    return (
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Backend Code
        </Typography>
        <Paper className={classes.paper}>
          {codes &&
            codes.map(code => {
              return (
                <ExpansionPanel key={code.id}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      {code.name}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ViewCode
                      code={code.code}
                      deleteCode={this.deleteCode.bind(this, code.id)}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          {this.state.createFormEnabled ? (
            <CreateCode
              createCodeRoute={this.props.createCodeRoute}
              objId={""}
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

AppCode.propTypes = {
  code: PropTypes.object.isRequired,
  getCodeByApp: PropTypes.func.isRequired,
  createCodeRoute: PropTypes.func.isRequired,
  deleteCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps, {
  getCodeByApp,
  deleteCode,
  createCodeRoute
})(withStyles(styles)(AppCode));
