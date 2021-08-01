import React, {useEffect} from "react";
import {Form, Input} from "antd";
import {FormInstance} from "antd/lib/form/hooks/useForm";

import {IContactFormData} from "../../interfaces";
import {defaultValues, validateMessages} from "./constants";

interface Props {
    form: FormInstance<IContactFormData>;
    initValues?: IContactFormData;
}

const ContactForm: React.FC<Props> = ({ form, initValues = defaultValues }) => {
    useEffect(() => {
        form.setFieldsValue(initValues);
    }, [form, initValues]);

    return (
        <Form
            layout="vertical"
            form={form}
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }, { min: 3 }, { max: 50 }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                required
                rules={[{ required: true }, { min: 3 }, { max: 15 }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ type: 'email' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
            >
                <Input.TextArea showCount maxLength={200} />
            </Form.Item>
        </Form>
    )
}

export default ContactForm;
