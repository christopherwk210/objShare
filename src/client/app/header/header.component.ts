import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertService, FileLoaderService, ObjectDataService, XmlService } from '../shared/index';

/** Declare externals for TS */
declare var Drop:any;
declare var saveAs:any;

@Component({
  moduleId: module.id,
  selector: 'sd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  aboutMessage:string;

  /** Drop down holders */
  fileDrop:any;
  helpDrop:any;

  /**
   * Inject services.
   * @param {AlertService} alertService - The injected AlertService.
   * @param {FileLoaderService} fileLoaderService - The injected FileLoaderService.
   * @param {ObjectDataService} objectDataService - The injected ObjectDataService.
   * @param {XmlService} xmlService - The injected XmlService.
   * @constructor
   */
  constructor(private alertService: AlertService,
    private fileLoaderService: FileLoaderService,
    private objectDataService: ObjectDataService,
    private xmlService: XmlService) {
  }

  /**
   * Get the the about file OnInit
   */
  ngOnInit() {
    this.getAbout();
  }

  /** Init drops */
  ngAfterViewInit() {
    this.fileDrop = new Drop({
      target: document.querySelector('#file-btn'),
      content: document.querySelector('#file-drop'),
      position: 'bottom left',
      openOn: 'click'
    });
    this.helpDrop = new Drop({
      target: document.querySelector('#help-btn'),
      content: document.querySelector('#help-drop'),
      position: 'bottom left',
      openOn: 'click'
    });
  }

  /** Dismisses all dropdowns */
  dismissDrops() {
    this.fileDrop.close();
    this.helpDrop.close();
  }

  /**
   * Get the about file and keep it in memory
   */
  getAbout() {
    this.fileLoaderService.get('assets/markdown/about.md')
      .subscribe(
        file => this.aboutMessage = file._body,
        error => this.alertService.showModal('Woops!',
        'Something went wrong. Please try reloading the page.', true, 'Okay')
      );
  }

  /**
   * Gets the encoded object data to use in a url, and opens
   * a new tab
   */
  handlePermalink() {
    let encodedObject = this.objectDataService.encodeObject();
    return location.origin + '/?__=' + encodedObject;
  }

  /**
   * Returns a link to a fresh object
   */
  handleNewObject() {
    let encodedObject = this.objectDataService.encodeTemplateObject();
    return location.origin + '/?__=' + encodedObject;
  }

  /**
   * Exports the current object to a GM:S 1 XML formatted object file to download
   */
  exportObject() {
    this.dismissDrops();

    /** Detect file saving capability */
    let isFileSaverSupported = false;
    try {
      isFileSaverSupported = !!new Blob;
    } catch (e) {
      let msg = 'This feature is not supported in your browser!\n' +
      'Try using a [cooler](https://www.google.com/chrome/browser/desktop/index.html) one.';
      this.alertService.showModal('Uh-oh', msg, true, 'Okay');
      isFileSaverSupported = false;
    }

    /** Save XML */
    if (isFileSaverSupported) {
      let objName:string = this.objectDataService.objectData.properties.name;
      if (objName.length === 0) {
        objName = "myObject";
      }
      let xml = this.xmlService.objectDataToXml(this.objectDataService.objectData);
      var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
      saveAs(blob, objName + ".object.gmx");
      this.objectDataService.saved = true;
    }

  }

  /**
   * Show the about modal
   */
  showAbout() {
    this.dismissDrops();
    this.alertService.showModal('About', this.aboutMessage, true, 'Dismiss', 'Visit Github Page', function(res:boolean) {
      if (res === false) {
        //Navigate to github page
      }
    });
  }
}
