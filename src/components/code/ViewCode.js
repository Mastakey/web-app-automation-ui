import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";

import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  fabDelete: {
    float: "right"
  },
  pre: {
      width: "100%"
  }
};

class ViewCode extends Component {
  render() {
    const classes = this.props.classes;
    const code = this.props.code;
    return (
      <Fragment>
        <pre className={classes.pre}>{code}</pre>
        <Fab size="small" color="secondary" className={classes.fabDelete}>
          <DeleteIcon onClick={this.props.deleteCode}/>
        </Fab>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(ViewCode));
