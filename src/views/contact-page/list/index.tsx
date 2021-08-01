import React from "react";
import {Button, Col, List, Row, Typography} from "antd";

import {IContact} from "../interfaces";
import "./list.css";

interface Props {
    contactList: IContact[];
    onCreate: () => void;
    isCreateContact: boolean;
    selectedContactKey?: number;
    setSelectedContactKey: (key: number) => void;
}

const ContactList: React.FC<Props> = ({
    contactList,
    onCreate, isCreateContact,
    selectedContactKey,
    setSelectedContactKey
}) => {
    const header = (
        <Row>
            <Col flex="auto">
                <Typography.Title level={5}>Contacts</Typography.Title>
            </Col>
            <Col>
                <Button onClick={onCreate} disabled={isCreateContact}>Add</Button>
            </Col>
        </Row>
    )
    return (
        <List
            header={header}
            dataSource={contactList}
            renderItem={({ name, key }) => (
                <List.Item onClick={() => setSelectedContactKey(key)} style={{ cursor: "pointer" }}>
                    <Typography.Text strong={selectedContactKey === key}>{name}</Typography.Text>
                </List.Item>
            )}
            className="contact-page-list"
        />
    )
}

export default ContactList;
