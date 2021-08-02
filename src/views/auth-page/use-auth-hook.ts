import {useState} from "react";
import {IContact} from "../contact-page/interfaces";
import {readFileAsync} from "../../helpers/read-file-async";
import {decryptJson} from "../../helpers/decrypt-json";
import {AuthFormData, InitUser} from "./interfaces";

interface Payload {
    onChangeForm: () => void;
    onChangeTab: () => void;
    onFinish: (values: AuthFormData) => Promise<void>;
    isExistingForm: boolean;
    isFormValid: boolean;
}

export const useAuthHook = (initUser: InitUser): Payload => {
    const [isExistingForm, setIsExistingForm] = useState(true);
    const [isFormValid, setIsFormValid] = useState(true);

    const onFinish = async (values: AuthFormData) => {
        setIsFormValid(true);
        const password = values.password;
        let list: IContact[] = [];
        if (!isExistingForm) {
            initUser(password, list);
            return;
        }
        const fileContent = (await readFileAsync(values.files[0].originFileObj as Blob)) as string;
        const { data, error } = await decryptJson(fileContent, password);
        if (error) {
            setIsFormValid(false);
        } else {
            // @ts-ignore
            initUser(password, data.list);
        }
    };

    const onChangeTab = () => {
        setIsExistingForm(!isExistingForm)
        setIsFormValid(true);
    }

    const onChangeForm = () => {
        setIsFormValid(true);
    }

    return {
        onChangeForm,
        onChangeTab,
        onFinish,
        isExistingForm,
        isFormValid,
    }
}
