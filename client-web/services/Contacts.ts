import RestUtilities from './RestUtilities';

export interface IContact {
    contactId?: number,
    lastName: string;
    firstName: string;
    phone: string;
    email: string;
}

export default class Contacts {
    fetchAll() {
        return RestUtilities.get<Array<IContact>>('/api/contacts');
    }

    fetch(contactId: number) {
        return RestUtilities.get<IContact>(`/api/contacts/${contactId}`);
    }

    search(query: string, pageSize: number, pageNumber: number, orderRow: string, isAscending: boolean) {
        return RestUtilities.get<{ contact: Array<IContact>, total: number}>(`/api/contacts/search/?q=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}&orderRow=${orderRow}&isAscending=${isAscending}`);
    }

    update(contact: IContact) {
        return RestUtilities.put<IContact>(`/api/contacts/${contact.contactId}`, contact);
    }

    create(contact: IContact) {
        return RestUtilities.post<IContact>('/api/contacts', contact);
    }

    save(contact: IContact) {
        if (contact.contactId) {
            return this.update(contact);
        } else {
            return this.create(contact);
        }
    }

    delete(contactId: number) {
        return RestUtilities.delete(`/api/contacts/${contactId}`);
    }
}

