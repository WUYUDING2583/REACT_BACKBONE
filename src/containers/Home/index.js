import React, { Component } from "react";
import { Button } from "antd";

import {
  bindActionCreators
} from "redux";
import {
  connect
} from "react-redux";
import {
  actions as appActions,
  getError,
  getGetRequestQuantity
} from "../../redux/modules/app";

class Home extends Component {

  componentDidMount() {
    // this.props.startGetRequest();
    // setTimeout(() => this.props.finishGetRequest(), 5000);
    this.props.test()
      .then((result) => {
        console.log(result);
        // alert(result)
      })
      .catch(err => alert(err));
  }
  render() {
    const { getRequestQuantity } = this.props;
    return (
      <Button type="primary">{getRequestQuantity}</Button>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    error: getError(state),
    getRequestQuantity: getGetRequestQuantity(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(appActions, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);