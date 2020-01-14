import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";

import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const styles = {
  floatRight: {
    float: "right"
  },
  fabCopy: {
    marginRight: "20px"
  },
  pre: {
    width: "100%"
  },
  codeHidden: {
    marginTop: "20px",
    display: "block"
  }
};

class ViewCode extends Component {
  copyToClipboard = e => {
    this.textArea.select();
    document.execCommand("copy");
  };
  render() {
    const classes = this.props.classes;
    const code = this.props.code;
    return (
      <Fragment>
        <pre className={classes.pre}>{code}</pre>
        <div className={classes.floatRight}>
          <Fab size="small" color="default" className={classes.fabCopy}>
            <FileCopyIcon onClick={this.copyToClipboard} />
          </Fab>
          <Fab size="small" color="secondary" className={classes.fabDelete}>
            <DeleteIcon onClick={this.props.deleteCode} />
          </Fab>
          <br />
          <div className={classes.codeHidden}>
            <textarea
              ref={textarea => (this.textArea = textarea)}
              onChange={() => {}}
              value={code}
            ></textarea>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(ViewCode));
