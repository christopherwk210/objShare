import { Component } from '@angular/core';
import { ObjectDataService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-properties',
  templateUrl: 'properties.component.html',
  styleUrls: ['properties.component.css']
})
export class PropertiesComponent {
  showPhysics:boolean;

  /**
   * Injects ObjectDataService service for template access.
   * @param {ObjectDataService} objectDataService - The injected ObjectDataService
   * @constructor
   */
  constructor(private objectDataService: ObjectDataService) {
    this.showPhysics = false;
  }

  /**
   * Sanitizes input to catch non alpha-numeric and spaces
   * @param {any} e - Event
   */
  catchNameKeyPress(e:any) {
    e = (e) ? e : window.event;

    let rx = /(?![A-Za-z0-9_ ])./g;
    let charCode = (e.which) ? e.which : e.keyCode;

    let key = String.fromCharCode(charCode);
    if(rx.test(key)) {
      return false;
    }

    return true;
  }

  /**
   * Sanitizes input to catch pasting, first character numbers, spaces, and length > 25
   * @param {any} e - Event
   */
  catchNameInput(e:any) {
    e.srcElement.value = e.srcElement.value.replace(' ', '_');

    let rx = /(?![A-Za-z0-9_ ])./g;
    e.srcElement.value = e.srcElement.value.replace(rx, '');

    let firstChar = e.srcElement.value.substr(0, 1);
    if (/^[0-9]/.test(firstChar)) {
      e.srcElement.value = e.srcElement.value.substr(1);
    }

    if (e.srcElement.value.length > 25) {
      e.srcElement.value = e.srcElement.value.substr(0, 25);
    }
  }
}
