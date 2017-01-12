import { Component, AfterViewInit } from '@angular/core';
import { ObjectDataService } from '../shared/index';
import { AlertService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css']
})
export class EventsComponent implements AfterViewInit {

  /** Event list size property */
  listSizeProperty:number;

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
    this.listSizeProperty = 4;
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
   * Mimic resizing on load to render list properly.
   * Use a timeout to prevent incorrectchange detection firing.
   */
  ngAfterViewInit() {
    let that = this;
    setTimeout(function() {
      that.onResize({
        target: {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight
        }
      });
    }, 100);
  }

  /**
   * Handler for resizing the window. Fixes the event list size on mobile.
   * @param {any} event - Window event
   */
  onResize(e:any) {
    this.listSizeProperty = 4;
    let maxWidth:number = 768;
    let maxHeight:number = 540;

    if ((e.target.innerWidth <= maxWidth) || (e.target.innerHeight <= maxHeight)) {
      this.listSizeProperty = 0;
    }
  }

  /**
   * Set the changingEvent to the event we want to change, and show the add event component.
   * @param {string} event - The event we want to change.
   */
  changeExistingEvent(event:string) {
    if (event.length !== 0) {
      this.changingEvent = event;
      this.addEventVisible = true;
    }
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
    if (event.length !== 0) {
      let that = this;
      let cautionMsg = `Are you sure you want to remove the ${event} event? You will lose your GML for this event.`;
      this.alertService.showModal('Wait...', cautionMsg, true, 'Yes', 'No', function(res:boolean) {
        if (res) {
          that.objectDataService.removeEvent(event);
          that.changeCurrentEvent('');
        }
      });
    }
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
