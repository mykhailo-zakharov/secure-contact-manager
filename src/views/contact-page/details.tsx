import React from "react";
import {Button, Col, Popconfirm, Row, Typography} from "antd";

import {IContact} from "./interfaces";

interface Props {
    contact?: IContact;
    onEditContactDrawerOpen: () => void;
    onDeleteContact: (key: number) => void;
}

const Details: React.FC<Props> = ({ contact, onEditContactDrawerOpen , onDeleteContact}) => {
    if (!contact) {
        return <Typography.Paragraph>Create your first contact</Typography.Paragraph>;
    }

    return (
        <>
            <Row gutter={[8, 8]}>
                <Col flex="auto">
                    <Typography.Title level={3}>{contact.name}</Typography.Title>
                </Col>
                <Col>
                    <Button onClick={onEditContactDrawerOpen}>Edit</Button>
                </Col>
                <Col>
                    <Popconfirm
                        title={`Are you sure to delete ${contact.name} contact?`}
                        onConfirm={() => onDeleteContact(contact?.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Typography.Text strong>Phone: </Typography.Text>
                    <Typography.Text>{contact.phone}</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Typography.Text strong>Email: </Typography.Text>
                    <Typography.Text>{contact.email || "- -"}</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Typography.Text strong>Address: </Typography.Text>
                    {contact.address
                        ? <div style={{ whiteSpace: "pre-line"}}>{contact.address}</div>
                        : <Typography.Text>- -</Typography.Text>
                    }
                </Col>
            </Row>
        </>
    )
}

export default Details;
