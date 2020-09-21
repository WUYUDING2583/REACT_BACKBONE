import React, { Component } from "react";
import { Button } from "antd";

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


export default Home;