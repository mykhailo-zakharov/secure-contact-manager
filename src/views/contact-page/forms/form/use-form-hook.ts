import { Form } from "antd";
import {FormInstance} from "antd/lib/form/hooks/useForm";

import {IContactFormData} from "../../interfaces";

export const useFormHook = (
    submitFn: (data: IContactFormData) => void,
    cancelFn: () => void,
): [FormInstance<IContactFormData>, () => void, () => void] => {
    const [form] = Form.useForm<IContactFormData>();
    const submit = () => {
        form.validateFields()
            .then((values) => {
                submitFn(values)
                form.resetFields();
            })
    };
    const cancel = () => {
        form.resetFields();
        cancelFn();
    }

    return [form, submit, cancel];
};
