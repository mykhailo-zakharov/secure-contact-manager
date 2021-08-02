import {IContact} from "../contact-page/interfaces";
import {UploadFile} from "antd/lib/upload/interface";

export interface AuthFormData {
    files: UploadFile[];
    password: string;
}

export type InitUser = (password: string, list: IContact[]) => void;
