import { Component } from '@angular/core';
import { ObjectDataService } from '../shared/index';
import { AlertService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css']
})
export class EventsComponent {
  /** Represents the currently selected item in the event list */
  selectedListEvent: string;

  /** Represents the visibility of the add event component */
  addEventVisible: boolean;

  /**
   * Represents if we are adding a new event (false) or changing a current one (string of event).
   */
  changingEvent: any;

  /**
   * Initialize componenet variables and inject services.
   * @param {ObjectDataService} objectDataService - The injected ObjectDataService.
   * @param {AlertService} alertService - The injected AlertService.
   * @constructor
   */
  constructor(private objectDataService: ObjectDataService,
  private alertService: AlertService) {
    this.addEventVisible = false;
    this.changingEvent = false;

    let that = this;
    objectDataService.currentEvent.subscribe((event) => {
      if (that.selectedListEvent !== event.event) {
        that.selectedListEvent = event.event;
      }
    });
  }

  /**
   * Set the changingEvent to the event we want to change, and show the add event component.
   * @param {string} event - The event we want to change.
   */
  changeExistingEvent(event:string) {
    this.changingEvent = event;
    this.addEventVisible = true;
  }

  /**
   * Changes the currently-editting event in the ObjectDataService.
   * @param {string} event - The event to set
   */
  changeCurrentEvent(event:string) {
    this.objectDataService.setEvent(event);
  }

  /**
   * Handles the removing of an existing event. Shows a confirmation modal.
   * @param {string} event - The event to remove
   */
  handleRemoveEvent(event:string) {
    let that = this;
    let cautionMsg = `Are you sure you want to remove the ${event} event? You will lose your GML for this event.`;
    this.alertService.showModal('Wait...', cautionMsg, true, 'Yes', 'No', function(res:boolean) {
      if (res) {
        that.objectDataService.removeEvent(event);
        that.changeCurrentEvent('');
      }
    });
  }

  /**
   * Handles adding a new event.
   * @param {Array<any>} event - The event to add, order index, type, and enum. Should come from the event config.
   */
  handleNewEvent(event:Array<any>) {
    if (this.changingEvent) {
      let result = this.objectDataService.changeEvent(this.changingEvent, event[0]);
      if (result === false) {
        this.alertService.showModal('Oops...', 'That event already exists!', true, 'OK');
      }
      this.changingEvent = false;
    } else {
      let result = this.objectDataService.addEvent(event);
      if (result === false) {
        /**
         * Instead of showing an error message, the already existing event is selected.
         * This might change in the future, so the error is left here as a comment.
         */
        // this.alertService.showModal('Oops...', 'That event already exists!', true, 'OK');
      }
    }
  }
}
