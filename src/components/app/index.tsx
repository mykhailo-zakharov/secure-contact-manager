import React, {useState} from 'react';
import {Button, Col, Layout, Row, Typography} from "antd";
import "antd/dist/antd.css";

import AuthPage from "../../views/auth-page";
import ContactPage from "../../views/contact-page";
import {IContact} from "../../views/contact-page/interfaces";
import {handleDownloadFile} from "../../helpers/handle-download-file";
import './app.css';

function App() {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [contactList, setContactList] = useState<IContact[]>([]);

  const initUser = (password: string, list: IContact[]) => {
      setPassword(password)
      setIsUserAuth(true);
      setContactList(list)
  }

  const quit = () => {
      setPassword("")
      setIsUserAuth(false);
      setContactList([])
  }

  return (
      <Layout>
        <Layout.Header className="site-layout-background">
            <Row gutter={[8,8]}>
                <Col flex="auto">
                    <Typography.Title level={3} className="site-header-title">Secure Contact Manager</Typography.Title>
                </Col>
                <Col>
                    <Button onClick={() => handleDownloadFile(password, contactList)}>Download</Button>
                </Col>
                <Col>
                    <Button onClick={quit}>Quit</Button>
                </Col>
            </Row>
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
