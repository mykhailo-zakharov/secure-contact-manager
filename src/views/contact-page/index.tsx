import React, {useEffect, useState} from "react";
import {Col, Layout, Row} from 'antd';

import ContactList from "./list";
import Details from "./details";
import NewDrawer from "./forms/new-drawer";
import EditDrawer from "./forms/edit-drawer";
import {IContact, IContactFormData} from "./interfaces";

interface Props {
    contactList: IContact[];
    setContactList: (list: IContact[]) => void;
}

const ContactPage: React.FC<Props> = ({ contactList, setContactList }) => {
    const [selectedContactKey, setSelectedContactKey] = useState<number>();
    const [isCreateContactDrawerVisible, setIsCreateContactDrawerVisible] = useState(false);
    const [isEditContactDrawerVisible, setIsEditContactDrawerVisible] = useState(false);

    useEffect(() => {
        if (!selectedContactKey && contactList.length) {
            setSelectedContactKey(contactList[0].key);
        }
    }, [selectedContactKey, contactList])

    const onCreateContact = (contact: IContactFormData) => {
        setContactList([...contactList, {...contact, key: +new Date()}]);
        setIsCreateContactDrawerVisible(false);
    }
    const onSaveContact = (contact: IContactFormData) => {
        const newList = contactList.map((item) => {
            if (item.key === selectedContactKey) {
                return {...contact, key: selectedContactKey};
            }
            return item;
        })
        setContactList(newList);
        setIsEditContactDrawerVisible(false);
    }
    const onDeleteContact = (contactKey: number) => {
        const newList = contactList.filter(({ key }) => key !== contactKey);
        setContactList(newList);
        setSelectedContactKey(newList.length ? newList[0].key : undefined);
    }
    const onCreateContactDrawerOpen = () => setIsCreateContactDrawerVisible(true);
    const onCreateContactDrawerClose = () => setIsCreateContactDrawerVisible(false);
    const onEditContactDrawerClose = () => setIsEditContactDrawerVisible(false);
    const onEditContactDrawerOpen = () => setIsEditContactDrawerVisible(true);
    const selectedContact = contactList.find(({key}) => key === selectedContactKey);

    return (
        <Row gutter={[16, 24]} style={{ height: "100%" }}>
            <Col style={{ width: 400 }}>
                <Layout.Content className="site-layout-background site-layout-content" style={{ height: "100%", position: "relative" }}>
                    <ContactList
                        contactList={contactList}
                        onCreate={onCreateContactDrawerOpen}
                        isCreateContact={isCreateContactDrawerVisible}
                        selectedContactKey={selectedContactKey}
                        setSelectedContactKey={setSelectedContactKey}
                    />
                </Layout.Content>
            </Col>
            <Col flex="auto">
                <Layout.Content className="site-layout-background site-layout-content">
                    <Details
                        contact={selectedContact}
                        onEditContactDrawerOpen={onEditContactDrawerOpen}
                        onDeleteContact={onDeleteContact}
                    />
                </Layout.Content>
            </Col>
            <NewDrawer
                visible={isCreateContactDrawerVisible}
                create={onCreateContact}
                close={onCreateContactDrawerClose}
            />
            <EditDrawer
                visible={isEditContactDrawerVisible}
                close={onEditContactDrawerClose}
                save={onSaveContact}
                contact={selectedContact}
            />
        </Row>
    )
}

export default ContactPage;
