/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Layout } from 'antd';

import { renderRoutes } from 'components/router';
import Header from 'components/header';

import indexRoutes from './router';
const { Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Header/>
    <Layout>
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
