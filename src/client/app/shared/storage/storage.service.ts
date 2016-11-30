import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  /**
   * Create StorageService.
   * @constructor
   */
  constructor() {}

  /**
   * Gets a value from local storage. If the value
   * isn't set, it will set it using the default value given.
   * @param {string} key - Local storage key to check
   * @param {any} def - Default value to use if key does not exist
   * @returns {any} Returns a string value from storage, or boolean if string is 'true' or 'false'
   */
  get(key:string, def:any) {
    let val:any = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, def.toString());
      return def;
    }
    if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    }
    return val;
  }

  /**
   * Stores an object to local storage by stringifying it.
   * @param {string} key - key to use
   * @param {any} object - object to store
   */
  setObject(key:string, object: any) {
    let stringyObject = JSON.stringify(object);
    localStorage.setItem(key, stringyObject);
  }

  /**
   * Get an object stored to local storage.
   * @param {string} key - key to use
   */
  getObject(key:string) {
    let obj = localStorage.getItem(key);
    return JSON.parse(obj);
  }
}
