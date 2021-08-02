import CryptoJS from "crypto-js";

export const encryptJson = (data: unknown, password: string) => {
    const textData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(textData, password).toString();
}
