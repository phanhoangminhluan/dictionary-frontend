/* eslint-disable react/prop-types */
import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Icon, Input, Form, Button } from "antd";
import { createStructuredSelector } from 'reselect';
import { useHistory } from "react-router-dom";

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LocalStorageUtils from "utils/localStorage";

import { key } from './constants';
import { login } from './action';
import reducer from './reducer';
import saga from './saga';
import { makeSelectFetching } from './selectors'

export function LoginPage({ fleching, onLogin, form }) {
  const { getFieldDecorator, validateFields } = form;
  let history = useHistory();
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (LocalStorageUtils.isRole() === "isAdmin") {
      history.push("/admin");
    } else if (LocalStorageUtils.isRole() === "isUser") {
      history.push("/user");
    }
  })

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onLogin(values);
      }
    });
  };

  const handleRegister = () => {
    history.push("/register");
  }

  return (
    <div className="content-container">
      <div
        style={{
          display: "flex",
          // backgroundImage: `url(${imgUrl})`,
          background: "#fff",
          padding: "2rem",
          minHeight: "100vh"
        }}
      >
        <div
          style={{
            padding: 20,
            maxWidth: 600,
            margin: "auto"
          }}
        >
          <h1>Login in to Quizlet</h1>
          <Form
            onSubmit={handleSubmit}
            className="login-form"
            style={{ maxWidth: 360 }}
          >
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Please input username"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input Password"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
                </Button>
              <Button style={{ float: "right" }}
                type="primary"
                htmlType="button"
                onClick={handleRegister}
              >
                Register
                </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}



const mapStateToProps = createStructuredSelector({
  fleching: makeSelectFetching(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onLogin: value => dispatch(login(value.username, value.password)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const onFieldsChange = (_, changedFiels) => {
  console.log(changedFiels);

  const { username, password } = changedFiels;
  if (username) {
    console.log(`Now changing ${username}`);
  }

  if (password) {
    console.log(`Now changing ${password}`);
  }
};

const ValidatedFields = Form.create({ onFieldsChange })(LoginPage);

export default compose(
  withConnect,
  memo,
)(ValidatedFields)