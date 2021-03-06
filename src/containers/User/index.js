/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import Header from 'components/header';
import SideBar from 'components/sidebar';
import { renderRoutes } from 'components/router';

import indexRoutes from './router';
import pathSidebar from './router/pathSidebar';

const { Content } = Layout;

export default function App() {
  console.log('====================================');
  console.log(pathSidebar);
  console.log('====================================');
  return (
    <Layout>
      <Header/>
    <Layout>
      <SideBar pathSidebar = {pathSidebar}/>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 600,
          }}
        >
          { renderRoutes(indexRoutes, "") }
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}
