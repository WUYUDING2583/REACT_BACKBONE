import React, { Component } from "react";
import { actions as appActions, getDeleteRequestQuantity, getError, getGetRequestQuantity, getPostRequestQuantity, getPutRequestQuantity } from "../redux/modules/app";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//this HOC is for code split
//all the global data/functions can be stored/decalared in here
//and pass down to the subcomponents

//importComponent is the function that use import()
export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null,
            };
        }

        componentDidMount() {
            importComponent().then((mod) => {
                const component = mod.default ? mod.default : mod;
                this.setState({
                    // compitable for ES6 and CommonJS module
                    component
                });
            });
        }


        render() {
            const C = this.state.component;
            return C ?
                <C {...this.props} />
                : null;
        }
    }


    const mapStateToProps = (state, props) => {
        return {
            error: getError(state),
            deleteRequestQuantity: getDeleteRequestQuantity(state),
            putRequestQuantity: getPutRequestQuantity(state),
            postRequestQuantity: getPostRequestQuantity(state),
            getRequestQuantity: getGetRequestQuantity(state),
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            ...bindActionCreators(appActions, dispatch),
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(AsyncComponent);
}