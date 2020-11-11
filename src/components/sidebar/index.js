/* eslint-disable react/prop-types */
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
const { Sider } = Layout;

export default function Sidebar({ pathSidebar }) {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          pathSidebar && pathSidebar.map( (item, index) => (
            <Menu.Item key={index}>
              <Link to={item.path}>{item.name}</Link>
            </Menu.Item>
          ))
        }
      </Menu>
    </Sider>
  );
}
