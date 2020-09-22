import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LocalStorageUtils from "utils/localStorage";

const withRouteComponent = redirectUrl => (Child, Role) =>
    class RequireAuthorizedComponent extends Component {
        constructor() {
            super();
            if (
                typeof window !== "undefined" &&
                typeof document !== "undefined"
            ) {
                // When constructing component in DOM env
                this.renderFn = this._renderIfAuthenticated;
            } else {
                this.renderFn = this._renderWithoutAuthenticated;
            }
        }
        
        _renderIfAuthenticated = () => {
            const { props } = this;
            
            if (LocalStorageUtils.isRole() === Role) {
                return <Child {...props} />;
            } else {
                return <Redirect to={redirectUrl} />;
            }
        }

        _renderWithoutAuthenticated = () => {
            return <Redirect to={redirectUrl} />;
        }

        render() {
            return this.renderFn();
        }
    };

export default withRouteComponent;