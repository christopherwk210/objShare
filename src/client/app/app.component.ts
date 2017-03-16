import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectDataService, AlertService } from './shared/index';
import './operators';

@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {

  /**
   * Inject ActivatedRoute
   * @param {ActivatedRoute} route - ActivatedRoute
   * @param {ObjectDataService} objectDataService - ObjectDataService
   * @param {AlertService} alertService - AlertService
   * @constructor
   */
  constructor(private route: ActivatedRoute,
    private objectDataService: ObjectDataService,
    private alertService: AlertService) {}

  /**
   * Read the queryParams onInit
   */
  ngOnInit() {
    this.route.queryParams.subscribe(data => this.sendObjectData(data['__']));
  }

  /**
   * Sends object data to the ObjectDataService
   * to be parsed and loaded
   * @param {string} data - encoded object data
   */
  sendObjectData(data:string) {
    if (data) {
      let res:boolean = this.objectDataService.importObject(data);
      if (res === false) {
        let errorMsg:string = 'The link that brought you here is invalid, so an object was unable to be loaded.\n\n' +
        'If you believe this message is the result of a bug, you can report it ' +
        '[here](https://github.com/christopherwk210/objShare/issues).';

        this.alertService.showModal('Oops!', errorMsg, false, 'Okay');
      }
    }
  }
}
