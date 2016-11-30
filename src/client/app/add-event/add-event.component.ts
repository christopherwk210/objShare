import { Component, Input, Output, EventEmitter } from '@angular/core';
import { events, eventOrder, eventTypes, eventEnumbs } from '../shared/index';
import { AlertService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-add-event',
  templateUrl: 'add-event.component.html',
  styleUrls: ['add-event.component.css']
})
export class AddEventComponent {
  /** Toggle visibility of add-event dialog */
  @Input() visible: boolean;

  /**
   * Emitters that represent when we want to be dismissed, and when we want to
   * pass our selected event.
   */
  @Output() dismiss = new EventEmitter<boolean>();
  @Output() eventSelected = new EventEmitter<Array<any>>();

  /** Event config */
  eventList:any;
  eventsOrder:any;
  eTypes:any;
  eEnumbs:any;

  /** Our current 'view' of events (controlled by ngSwitch in template) */
  selection:string;

  /**
   * Gets the events from the event config, and configure the init view
   * to root events (see ngSwitch in template).
   * @param {AlertService} alertService - The injected AlertService.
   * @constructor
   */
  constructor(private alertService: AlertService) {
    this.eventList = events; /** Assign the events */
    this.eventsOrder = eventOrder; /** Assign the event order */
    this.eTypes = eventTypes; /** Assign available XML event types */
    this.eEnumbs = eventEnumbs; /** Assign XML enumbs */
    this.selection = 'base'; /** Init view to root events */
  }

  /**
   * Emits the dismiss signal, and if chosen, the selected event.
   * @param {Array<any>} send - The chosen event to send in position 0, and the order index at position 1
   */
  sendAndDismiss(send?:Array<any>) {
    if (send) {
      this.eventSelected.emit(send);
    }
    this.selection = 'base';
    this.dismiss.emit(false);
  }

  /**
   * Emits the dismiss signal with a custom string at the end. Currently
   * only used for collision events.
   * @param {string} send - The event string
   * @param {string} custom - The custom string to tack on the end of the event.
   */
  sendAndDismissCustom(send:string, custom:string) {
    let that = this;
    if (custom) {
      this.sendAndDismiss([send + custom, this.eventsOrder.collision, this.eTypes.collision, custom]);
    } else {
      /** Dismiss the add event modal */
      this.dismiss.emit(false);

      /** Show an error message */
      let msg = 'You need to enter a valid string!';
      this.alertService.showModal('Oops...', msg, true, 'OK', '',
      function(res:boolean) {
        /** Bring the modal back when the user dismisses the modal */
        that.dismiss.emit(true);
      });
    }

  }

  /**
   * Emits the dismiss signal with the proper event name for keyboard events.
   * @param {string} type - The type of keyboard event to send
   * @param {string} key - The selected key
   * @param {string} enumb - The keycode for the selected key
   */
  sendAndDismissKeyboard(type:string, key:string, enumb: any) {
    switch(type) {
      case 'keyboard': {
        this.sendAndDismiss([this.eventList.keyboard.keyboard + key, this.eventsOrder.keyboard, this.eTypes.keyboard, enumb]);
        break;
      }
      case 'keypress': {
        this.sendAndDismiss([this.eventList.keyboard.pressed + key, this.eventsOrder.keyboard, this.eTypes.keypress, enumb]);
        break;
      }
      case 'keyrelease': {
        this.sendAndDismiss([this.eventList.keyboard.released + key, this.eventsOrder.keyboard, this.eTypes.keyrelease, enumb]);
        break;
      }
    }
  }
}
