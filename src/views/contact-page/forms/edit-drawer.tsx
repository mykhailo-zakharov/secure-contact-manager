import React from "react";
import {Button, Drawer, Space} from "antd";

import {IContactFormData, IContact} from "../interfaces";
import ContactForm from "./form"
import { useFormHook } from "./form/use-form-hook";

interface Props {
    save: (coontact: IContactFormData) => void;
    close: () => void;
    visible: boolean;
    contact?: IContact;
}

const EditDrawer: React.FC<Props> = ({ save, visible, close, contact }) => {
    const [form, submit, cancel] = useFormHook(save, close);

    const footer = (
        <Space>
            <Button
                type="primary"
                onClick={submit}
            >
                Edit
            </Button>
            <Button onClick={cancel}>Cancel</Button>
        </Space>
    );

    return (
        <Drawer
            visible={visible}
            width={500}
            title="New Contact"
            closable={false}
            footer={footer}
        >
            {visible && <ContactForm form={form} initValues={contact} />}
        </Drawer>
    )
}

export default EditDrawer
