import React from "react";
import {IContact} from "./interfaces";
import {Button, Col, List, Row, Typography} from "antd";

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
        />
    )
}

export default ContactList;
