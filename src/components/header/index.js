/* eslint-disable react/prop-types */
import React, { memo, useState } from "react";
import { Layout, Menu, Dropdown, Button, Icon } from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from 'reselect';
// import { DownOutline } from '@ant-design/icons';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "utils/localStorage";

import { key } from 'containers/Home/page/dictionary/constants';
import { searchWord } from 'containers/Home/page/dictionary/action';
import reducer from 'containers/Home/page/dictionary/reducer';
import saga from 'containers/Home/page/dictionary/saga';
import AutoComplete from './components/auto-complete';

import './index.css';
import { useHistory } from "react-router-dom";

const { Header } = Layout;


export function HeaderCommon({ searchWord }) {
  const [word, setWord] = useState('');
  const history = useHistory();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleChange = (value) => {
    setWord(value)
  }

  const directUrl = (url) => () => {
    history.push(url);
  }

  const handleLogout = () => {
    localStorage.removeItem("dictionary_jwt");
    localStorage.removeItem("dictionary__username");
    window.location.href = "/";
  }

  const menu = LocalStorageUtils.isRole() !== "null" ? (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          My profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Change password
        </a>
      </Menu.Item>
      <Menu.Item>
        <span onClick={handleLogout}>
          Logout
        </span>
      </Menu.Item>
    </Menu>
  ) : (<div></div>);


  return (
    <Header className="header">
      <div className="logo" >
        Flashcard
      </div>
      <div className=" profile">
        <Dropdown overlay={menu}>
          {
            LocalStorageUtils.isRole() !== "null" ? (
              <span style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}>
                {LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.USERNAME)} <Icon type="user" />
              </span>
            ) : (
                <span onClick={directUrl('/login')}>
                  Login
                </span>
              )
          }
        </Dropdown>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item onClick={directUrl('/home')} key="1">Home</Menu.Item>
        <Menu.Item className="search-value" disabled={true} key="3">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AutoComplete handleChange={handleChange} />
            <Button type="primary" onClick={() => { searchWord(word); history.push('/home/dictionary') }}>Search</Button>
          </div>
        </Menu.Item>

        <Menu.Item onClick={directUrl('/user')} key="2">Flashcard</Menu.Item>
      </Menu>

    </Header>
  );
}

const mapStateToProps = createStructuredSelector({})

export function mapDispatchToProps(dispatch) {
  return {
    searchWord: word => dispatch(searchWord(word)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(HeaderCommon);