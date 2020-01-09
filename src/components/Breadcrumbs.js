import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const styles = {};

class Breadcrumbs extends Component {
  getLinkMapping(item) {
      return <Link to={item.url}>{item.name}</Link>;
  }
  render() {
    const list = this.props.UI.breadcrumbs;
    return (
      <Fragment>
        <Typography variant="body1">
          {this.getLinkMapping({name:"Home", url:"/"})}
          {list.map(item => {
            return (
              <Fragment key={item.url}> > {this.getLinkMapping(item)}</Fragment>
            );
          })}
        </Typography>
      </Fragment>
    );
  }
}

Breadcrumbs.propTypes = {
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, {})(withStyles(styles)(Breadcrumbs));
