import { Component } from '@angular/core';
import { AlertService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css']
})
export class ModalComponent {
  /** Represents the most recent callback function */
  callback:Function;

  /**
   * Initialize callback and subscribe to the callback from the AlertService.
   * @param {AlertService} alertService - The injected AlertService.
   * @constructor
   */
  constructor(private alertService: AlertService) {
    this.callback = () => {return false;};
    alertService.callback.subscribe((cb) => {
      this.callback = cb;
    });
  }

  /**
   * Dismisses the modal, and executes the callback.
   * @param {boolean} cb - Represents whether or not the user hit okay or cancel/clicked the X.
   *    This value is passed into the callback function.
   */
  dismiss(cb:boolean = false) {
    this.alertService.alertVisible = false;
    this.callback(cb);
  }
}
