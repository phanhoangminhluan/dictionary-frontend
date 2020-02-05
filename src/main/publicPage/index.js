import React from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from "../../components/route";
import ThemeRoutes from "./publicRouter/routing.jsx";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

class Fulllayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            {ThemeRoutes.map((data, key) => {
              if (!data.redirect) {
                return (
                  <Menu.Item key={key}>
                    <Link to={this.props.match.path + data.path}>{data.name}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          {renderRoutes(ThemeRoutes, this.props.match.path)}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}
export default Fulllayout;
