export interface IContactFormData {
    name: string;
    address: string;
    phone: string;
    email: string;
}

export interface IContact extends IContactFormData {
    key: number;
}
