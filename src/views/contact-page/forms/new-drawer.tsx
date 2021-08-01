import React from "react";
import {Button, Drawer, Space} from "antd";

import {IContactFormData} from "../interfaces";
import ContactForm from "./form"
import { useFormHook } from "./form/use-form-hook";

interface Props {
    create: (coontact: IContactFormData) => void;
    close: () => void;
    visible: boolean;
}

const NewDrawer: React.FC<Props> = ({create, close, visible}) => {

    const [form, submit, cancel] = useFormHook(create, close);

    const footer = (
        <Space>
            <Button
                type="primary"
                onClick={submit}
            >
                Create
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
            <ContactForm form={form} />
        </Drawer>
    )
}

export default NewDrawer
