import {ValidateMessages} from "rc-field-form/lib/interface";

import {IContactFormData} from "../../interfaces";

export const validateMessages: ValidateMessages = {
// eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
        // eslint-disable-next-line no-template-curly-in-string
        email: '${label} is not a valid email!',
    },
    string: {
        // eslint-disable-next-line no-template-curly-in-string
        min: '${label} must be at least ${min} characters',
        // eslint-disable-next-line no-template-curly-in-string
        max: '${label} cannot be longer than ${max} characters',
    }
};
export const defaultValues: IContactFormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
};
