import {IContact} from "../views/contact-page/interfaces";
import {downloadFile} from "./download-file";

export const handleDownloadFile = (password: string, list: IContact[]) => {
    const fileData = { password, list };
    const body = JSON.stringify(fileData, null, 4);
    downloadFile(body, "contacts", "json");
}
