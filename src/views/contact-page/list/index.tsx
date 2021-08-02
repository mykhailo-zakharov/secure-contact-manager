import React, {useState} from "react";
import {Button, Col, Input, List, Row, Typography} from "antd";

import {IContact} from "../interfaces";
import "./list.css";
import {sortAndFilterContactList} from "../../../helpers/sort-and-filter-contact-list";

interface Props {
    contactList: IContact[];
    onCreate: () => void;
    isCreateContact: boolean;
    selectedContactKey?: number;
    setSelectedContactKey: (key: number) => void;
}

const ContactList: React.FC<Props> = ({
    contactList,
    onCreate,
    isCreateContact,
    selectedContactKey,
    setSelectedContactKey
}) => {
    const [search, setSearch] = useState("");
    const sortedFilteredList = sortAndFilterContactList(contactList, search);

    const header = (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Input.Search
                    allowClear
                    onChange={(event) => setSearch(event.target.value)}
                    disabled={!contactList.length}
                />
            </Col>
            <Col flex="auto">
                <Typography.Title level={5}>
                    Contacts ({search ? `${sortedFilteredList.length} / ` : ""}{contactList.length})
                </Typography.Title>
            </Col>
            <Col>
                <Button onClick={onCreate} disabled={isCreateContact}>Add</Button>
            </Col>
        </Row>
    )
    return (
        <List
            header={header}
            dataSource={sortedFilteredList}
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
