import CryptoJS from "crypto-js";

interface Payload {
    data?: unknown;
    error: boolean;
}

export const decryptJson = async (data: string, password: string): Promise<Payload> => {
    try {
        const decryptedData = CryptoJS.AES.decrypt(data, password).toString(CryptoJS.enc.Utf8);
        const parsedData = JSON.parse(decryptedData);
        return {
            data: parsedData,
            error: false,
        };
    } catch (event) {
        return { error: true }
    }
}
