import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCodeByApp, deleteCode } from "../../redux/actions/codeActions";
import ViewCode from "../../components/code/ViewCode";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  paper: {
    padding: "20px"
  }
};

class AppCode extends Component {
  async deleteCode(id) {
    await this.props.deleteCode(id);
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
          Code
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
        </Paper>
      </Grid>
    );
  }
}

AppCode.propTypes = {
  code: PropTypes.object.isRequired,
  getCodeByApp: PropTypes.func.isRequired,
  deleteCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps, { getCodeByApp, deleteCode })(
  withStyles(styles)(AppCode)
);
