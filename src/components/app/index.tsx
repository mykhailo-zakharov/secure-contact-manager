import React, {useState} from 'react';

import "antd/dist/antd.css";
import './app.css';

import AuthPage from "../../views/auth-page";
import ContactPage from "../../views/contact-page";
import {Layout, Typography} from "antd";
import {IContact} from "../../views/contact-page/interfaces";

function App() {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [contactList, setContactList] = useState<IContact[]>([]);

  const initUser = (password: string, list: IContact[]) => {
      setPassword(password)
      setIsUserAuth(true);
      setContactList(list)
  }

  return (
      <Layout>
        <Layout.Header className="site-layout-background">
          <Typography.Title level={3} className="site-header-title">Secure Contact Manager</Typography.Title>
        </Layout.Header>
          <Layout.Content className="site-layout-main-content">
            {isUserAuth
                ? <ContactPage
                    contactList={contactList}
                    setContactList={setContactList}
                />
                : <AuthPage initUser={initUser} />
            }
          </Layout.Content>
      </Layout>
  )
}

export default App;
