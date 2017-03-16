import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/** Declare markdown to prevent TS errors */
declare var markdownit:any;

@Injectable()
export class AlertService {
  md = markdownit();

  /** Subject for passing callback to modal component */
  callback: Subject<Function> = new BehaviorSubject<Function>(function(){return false;});

  /** Modal properties */
  alertVisible: boolean; /** Modal visibility */
  closeButton: boolean; /** Toggles showing of close button */
  alertTitle: string; /** Modal title */
  alertText: string; /** Modal text */
  buttonText: string; /** Confirm button text */
  cancelButtonText: string; /** Cancel button text */

  /**
   * Init component variables to default modal options.
   * @constructor
   */
  constructor() {
    this.alertVisible = false;
    this.closeButton = true;
    this.alertTitle = '';
    this.alertText = '';
    this.buttonText = '';
    this.cancelButtonText = '';
  }

  /**
   * Shows the modal by setting alertVisible to true, which is read by the modal component.
   * @param {string} title - Modal title
   * @param {string} text - Modal text (rendered as markdown)
   * @param {boolean} showClose - Whether to show X button or not
   * @param {string} btnText - Confirm button text
   * @param {string} [cancelBtnText] - Cancel button text. If not provided, button will not show.
   * @param {Function} [callback] - Callback function on dismissal.
   */
  showModal(title:string, text:string, showClose:boolean, btnText:string, cancelBtnText:string = '',
  callback:Function = function(){return false;}) {
    this.alertVisible = true;
    this.closeButton = showClose;
    this.alertTitle = title;
    this.alertText = this.md.render(text);
    this.buttonText = btnText;
    this.cancelButtonText = cancelBtnText;
    this.callback.next(callback);
  }

}
