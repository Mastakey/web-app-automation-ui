import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateCode from "../../components/code/CreateCode";
import ViewCode from "../../components/code/ViewCode";
import {
  createCode,
  getCodeByObj,
  deleteCode,
  createCodeService,
  createCodeController
} from "../../redux/actions/codeActions";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Fab from "@material-ui/core/Fab";

//Materical Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  paper: {
    padding: 20
  },
  fab: {
    marginTop: "10px"
  },
  fabRight: {
    marginTop: "10px",
    float: "right"
  }
};

class ObjectCodeUI extends Component {
  constructor() {
    super();
    this.state = {
      createFormEnabled: false
    };
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
  async componentDidMount() {
    const id = this.props.objId;
    await this.props.getCodeByObj(id);
  }
  async deleteCode(id) {
    await this.props.deleteCode(id);
  }
  render() {
    const classes = this.props.classes;
    const codes = this.props.code.codes;
    console.log(codes);
    return (
      <Grid item xs={12}>
        <Typography variant="h4">Backend Code</Typography>
        <Paper className={classes.paper}>
          {codes.map(code => {
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
              createCode={this.props.createCode}
              createCodeService={this.props.createCodeService}
              createCodeController={this.props.createCodeController}
              objId={this.props.objId}
              appId={""}
              disableCreateForm={this.disableCreateForm.bind(this)}
            />
          ) : (
            <Fab size="small" color="primary" className={classes.fab}>
              <AddIcon onClick={this.handleAddField.bind(this)} />
            </Fab>
          )}

          <Fab size="small" color="primary" className={classes.fabRight}>
            <RefreshIcon />
          </Fab>
        </Paper>
      </Grid>
    );
  }
}

ObjectCodeUI.propTypes = {
  code: PropTypes.object.isRequired,
  createCode: PropTypes.func.isRequired,
  createCodeService: PropTypes.func.isRequired,
  createCodeController: PropTypes.func.isRequired,
  getCodeByObj: PropTypes.func.isRequired,
  deleteCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ code: state.code });

export default connect(mapStateToProps, {
  createCode,
  getCodeByObj,
  deleteCode,
  createCodeService,
  createCodeController
})(withStyles(styles)(ObjectCodeUI));
