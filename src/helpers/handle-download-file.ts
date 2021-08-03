import {IContact} from "../views/contact-page/interfaces";
import {downloadFile} from "./download-file";
import {encryptJson} from "./encrypt-json";

export const handleDownloadFile = (password: string, list: IContact[]) => {
    const data = {
        list,
        date: +new Date(),
    };
    const encryptData = encryptJson(data, password);
    downloadFile(encryptData, "contacts", "txt");
}
