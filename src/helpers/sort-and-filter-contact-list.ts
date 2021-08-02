import {IContact} from "../views/contact-page/interfaces";

export const sortAndFilterContactList = (list: IContact[], search: string): IContact[] => {
    let newList = list;
    if (search) {
        newList = list.filter(({name, phone, email, address}) =>
            name?.includes(search) ||
            phone?.includes(search) ||
            email?.includes(search) ||
            address?.includes(search)
        )
    }
    return newList.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        }
        if (a.name < b.name) {
            return -1
        }
        return 0;
    });
}
