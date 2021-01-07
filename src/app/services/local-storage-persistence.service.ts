import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoragePersistenceService {

  constructor() { }

  set(key: string, data: string): void {
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  remove(key: string) {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      console.error('Error to trying remove data from localStorage', e);
      return null;
    }
  }

  clear() {
    localStorage.clear();
  }

}