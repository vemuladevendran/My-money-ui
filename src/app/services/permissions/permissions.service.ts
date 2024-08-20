import { Injectable } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor() {}

  async getContacts(): Promise<any> {
    // Request permission to access contacts
    const permission = await Contacts.requestPermissions();

    if (permission.contacts === 'granted') {
      // Retrieve contacts
      const result = await Contacts.getContacts({
        projection: {
          name: true,
          phones: true,
          image: true,
        },
      });
      return result;
    } else {
      console.log('Permission not granted to access contacts');
      return [];
    }
  }
}
