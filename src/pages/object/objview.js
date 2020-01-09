import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getObj } from "../../redux/actions/objActions";
import { getApp } from "../../redux/actions/appActions";
import { setBreadcrumbs } from "../../redux/actions/uiActions";
import ObjFields from "../field/fields";
import ObjectCode from "../code/codes";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {};

class ObjectView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    const obj = await this.props.getObj(id);
    const app = await this.props.getApp(obj.data.appId);
    this.props.setBreadcrumbs([
      { name: "app", url: "/app" },
      { name: app.data.name, url: `/app/${app.data.id}` },
      { name: obj.data.name, url: `/obj/${obj.data.id}` }
    ]);
  }
  render() {
    const obj = this.props.obj.object;
    console.log(obj);
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            {obj.name}
          </Typography>
        </Grid>
        <ObjFields objId={this.props.match.params.id} />
        <ObjectCode objId={this.props.match.params.id} />
      </Grid>
    );
  }
}

ObjectView.propTypes = {
  getObj: PropTypes.func.isRequired,
  getApp: PropTypes.func.isRequired,
  setBreadcrumbs: PropTypes.func.isRequired,
  obj: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  obj: state.obj,
  UI: state.UI
});

export default connect(mapStateToProps, { getObj, getApp, setBreadcrumbs })(
  withStyles(styles)(ObjectView)
);
