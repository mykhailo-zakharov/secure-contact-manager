import React, {useState} from 'react';

import "antd/dist/antd.css";
import './app.css';

import AuthPage from "../../views/auth-page";
import ContactPage from "../../views/contact-page";
import {Layout, Typography} from "antd";

function App() {
  const [isUserAuth, setIsUserAuth] = useState(true);

  return (
      <Layout>
        <Layout.Header className="site-layout-background">
          <Typography.Title level={3} className="site-header-title">Secure Contact Manager</Typography.Title>
        </Layout.Header>
          <Layout.Content className="site-layout-main-content">
            {isUserAuth ? <ContactPage /> : <AuthPage />}
          </Layout.Content>
      </Layout>
  )
}

export default App;
