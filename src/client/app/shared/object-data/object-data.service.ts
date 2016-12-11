import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { eventTypes, eventOrder, events, mouseEnumbs,
  otherEnumbs, drawEnumbs, asyncEnumbs, keyCodeList } from '../index';

@Injectable()
export class ObjectDataService {
  /** Represents all events, gml, and properties of object */
  objectData:any;

  /** Represents how the initial object should always look */
  initialObjectData:any = {
    properties: {
      name: '',
      depth: '0',
      visible: true,
      persistent: false,
      solid: false,
      physics: {
        uses: false,
        sensor: false,
        awake: true,
        kinematic: false,
        shape: 'Circle',
        density: 0,
        restitution: 0,
        collision: 0,
        linear: 0,
        angular: 0,
        friction: 0.2
      }
    },
    events: []
  };

  /** Represents the message to show if the user tries to leave without saving */
  dirtyMessage:string;

  /** Represents if the user has permalinked or exported the object */
  saved:boolean;

  /** Represents the currently editting event as a Subject for other components to subscribe to */
  currentEvent: Subject<any> = new BehaviorSubject<any>('');

  /**
   * Init objectData to default object properties and no events.
   * @param {AlertService} alertService - The alert service
   * @constructor
   */
  constructor() {
    this.dirtyMessage = 'You have unsaved changes!';
    this.saved = false;

    this.objectData = {
      properties: {
        name: '',
        depth: '0',
        visible: true,
        persistent: false,
        solid: false,
        physics: {
          uses: false,
          sensor: false,
          awake: true,
          kinematic: false,
          shape: 'Circle',
          density: 0,
          restitution: 0,
          collision: 0,
          linear: 0,
          angular: 0,
          friction: 0.2
        }
      },
      events: []
    };

    /** Prevent the user from leaving if the object is dirtied and unsaved */
    let that = this;
    window.onbeforeunload = function() {
      let stringyObject = JSON.stringify(that.objectData),
          stringyInitialObject = JSON.stringify(that.initialObjectData);

      if ((stringyObject !== stringyInitialObject) && (that.saved === false)) {
        return that.dirtyMessage;
      }
    };
  }

  /**
   * Encodes the objectData object and returns it.
   */
  encodeObject():string {
    let stringyObject = JSON.stringify(this.objectData);
    let btoaString = btoa(stringyObject);
    let encodedStr = encodeURIComponent(btoaString);
    let fixedEncoding = encodedStr.replace('%', '-_-');
    return fixedEncoding;
  }

  /**
   * Encodes the initialObjectData object and returns it.
   */
  encodeTemplateObject():string {
    let stringyObject = JSON.stringify(this.initialObjectData);
    let btoaString = btoa(stringyObject);
    let encodedStr = encodeURIComponent(btoaString);
    let fixedEncoding = encodedStr.replace('%', '-_-');
    return fixedEncoding;
  }

  /**
   * Limits a decimal number to a certain number of places
   * @param {String} num - The string to edit
   * @param {number} limit - The amount of places to limit
   */
  limitDecimal(num:String, limit:number) {
    let strs = num.split('.');
    let res = strs[0];
    if (strs[1]) {
      if (strs[1].length > limit) {
        strs[1] = strs[1].substring(0, limit);
      }
      res = strs[0] + '.' + strs[1];
    }
    return Number(res);
  }

  /**
   * Convert a native GM:S object to objectData object
   * @param {any} nativeObject - The native XML to json object
   * @param {String} objectName - The name of the object
   */
  nativeObjectImport(nativeObject:any, objectName:String) {
    this.currentEvent.next('');
    let that = this;
    let shapes = ['Circle', 'Box', 'Shape'];
    let fixedObject:any = {
      properties: {
        depth: nativeObject.depth,
        name: objectName,
        persistent: nativeObject.persistent === '-1' ? true : false,
        solid: nativeObject.solid === '-1' ? true : false,
        visible: nativeObject.visible === '-1' ? true : false,
        physics: {
          angular: that.limitDecimal(nativeObject.PhysicsObjectAngularDamping, 5),
          awake: nativeObject.PhysicsObjectAwake === '-1' ? true : false,
          collision: Number(nativeObject.PhysicsObjectGroup),
          density: that.limitDecimal(nativeObject.PhysicsObjectDensity, 5),
          friction: that.limitDecimal(nativeObject.PhysicsObjectFriction, 5),
          kinematic: nativeObject.PhysicsObjectKinematic === '-1' ? true : false,
          linear: that.limitDecimal(nativeObject.PhysicsObjectLinearDamping, 5),
          restitution: that.limitDecimal(nativeObject.PhysicsObjectRestitution, 5),
          sensor: nativeObject.PhysicsObjectSensor === '-1' ? true : false,
          shape: shapes[nativeObject.PhysicsObjectShape],
          uses: nativeObject.PhysicsObject === '-1' ? true : false
        }
      },
      events: []
    };

    /** Import events */
    if (nativeObject.events.event) {
      nativeObject.events.event.forEach(function(event:any) {
        let newEvent:any = {};
        newEvent.type = Number(event['-eventtype']);
        if (newEvent.type === 4) {
          newEvent.enumb = Number(event['-ename']);
        } else {
          newEvent.enumb = Number(event['-enumb']);
        }
        newEvent.event = that.getEventName(newEvent.type,newEvent.enumb);
        newEvent.order = that.getEventOrder(newEvent.type);

        let concatGml:string = '';
        if (Array.isArray(event.action)) {
          let resGml = '';
          let actionCount = 1;
          for(var i:number = 0; i < event.action.length; i++) {
            resGml = '';
            resGml = that.getCode(event.action[i]);
            if (resGml) {
              concatGml += '/* Action ' + (actionCount).toString() + ' */\n\n' + resGml + '\n';
              actionCount++;
            }
          }
        } else {
          concatGml = that.getCode(event.action);
        }

        newEvent.gml = concatGml;

        fixedObject.events.push(newEvent);
      });
    }

    this.objectData = fixedObject;
    this.sortEvents();
    this.selectTopEvent();
  }

  /**
   * Determines if a native action is a valid code block or not, and returns
   * the code if it is, or an empty string if it isn't.
   * @param {any} action - The native event action object
   */
  getCode(action:any) {
    if ((action.id === '603') && (action.kind === '7')) {
      return action.arguments.argument.string;
    } else {
      return '';
    }
  }

  /**
   * Gives the proper order index based on type
   * @param {number} type - The event type number
   */
  getEventOrder(type:number) {
    for (let eventType in eventTypes) {
      if (eventTypes.hasOwnProperty(eventType)) {
        if (eventTypes[eventType] === type) {

          for (let orderIndex in eventOrder) {
            if (eventOrder.hasOwnProperty(orderIndex)) {
              if (orderIndex === eventType) {
                return eventOrder[orderIndex];
              }
            }
          }

        }
      }
    }
  }

  /**
   * Returns the proper event name for a given type and enumb
   * @param {number} type - The event type number
   * @param {any} enumb - The enumb value
   */
  getEventName(type:number, enumb:any) {
    for (let eventType in eventTypes) {
      if (eventTypes.hasOwnProperty(eventType)) {
        if (eventTypes[eventType] === type) {
          let res = '';
          switch(eventType) {
            case 'create': {
              res = events.create;
              break;
            }
            case 'destroy': {
              res = events.destroy;
              break;
            }
            case 'alarm': {
              res = events.alarm[enumb];
              break;
            }
            case 'step': {
              switch(enumb) {
                case 0: {
                  res = events.step.normal;
                  break;
                }
                case 1: {
                  res = events.step.begin;
                  break;
                }
                case 2: {
                  res = events.step.end;
                  break;
                }
              }
              break;
            }
            case 'mouse': {
              res = mouseEnumbs[enumb.toString()];
              break;
            }
            case 'other': {
              res = otherEnumbs[enumb.toString()];
              break;
            }
            case 'draw': {
              res = drawEnumbs[enumb.toString()];
              break;
            }
            case 'async': {
              res = asyncEnumbs[enumb.toString()];
              break;
            }
            case 'collision': {
              res = events.collision + enumb;
              break;
            }
            case 'keyboard': {
              res = events.keyboard.keyboard + keyCodeList[enumb.toString()];
              break;
            }
            case 'keypress': {
              res = events.keyboard.pressed + keyCodeList[enumb.toString()];
              break;
            }
            case 'keyrelease': {
              res = events.keyboard.released + keyCodeList[enumb.toString()];
              break;
            }
          }
          return res;
        }
      }
    }
  }

  /**
   * Decodes encoded object and sets objectData to use
   * the new data. Sets saved to true, since we are loading.
   * @param {string} objectData - encoded object data
   * @returns {boolean} Success result of import
   */
  importObject(objectData:string):boolean {
    let unfixedEncoding:string, decodedString:string, atobString:string, parsedString:any, success:boolean = true;

    try {
      unfixedEncoding = objectData.replace('-_-','%');
      decodedString = decodeURIComponent(unfixedEncoding);
      atobString = atob(decodedString);
      parsedString = JSON.parse(atobString);
    } catch(err) {
      success = false;
    }

    if (success) {
      this.objectData = parsedString; //Check this object for validity
      this.saved = true;
      this.selectTopEvent();
    }

    return success;
  }

  /**
   * Saves the provided GML to the given event in the objectData.event array.
   * @param {string} event - The event to save GML to
   * @param {string} gml - The GML to save
   */
  saveGml(event:string, gml:string) {
    for(var i:number=0; i<this.objectData.events.length; i++) {
      if (this.objectData.events[i].event === event) {
        this.objectData.events[i].gml = gml;
        this.saved = false;
      }
    }
  }

  /**
   * Sets the currently editting event to the event matching the given string. Otherwise
   * sets the event to none, which sets the editor to readonly.
   * @param {string} event - The event to set to.
   */
  setEvent(event:string) {
    let exists:any = this.eventExists(event);
    if (exists !== false) {
      this.currentEvent.next({
        event: event,
        gml: exists.gml
      });
      return true;
    } else {
      this.currentEvent.next('');
      return false;
    }
  }

  /**
   * Removes the given event (if it exists) from the object.
   * @param {string} event - The event to remove
   */
  removeEvent(event:string) {
    for(var i:number=0; i<this.objectData.events.length; i++) {
      if (this.objectData.events[i].event === event) {
        this.objectData.events.splice(i, 1);
      }
    }
  }

  /**
   * Changes an existing event to a new one.
   * @param {string} origEvent - Event to be changed
   * @param {string} newEvent - Event to change to
   */
  changeEvent(origEvent: string, newEvent: string) {
    let exists = this.eventExists(newEvent);
    if (exists === false) {
      for(var i:number=0; i<this.objectData.events.length; i++) {
        if (this.objectData.events[i].event === origEvent) {
          this.objectData.events[i].event = newEvent;
        }
      }
      this.setEvent(newEvent);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Adds a new event to the object and sets it to be the active editting one.
   * @param {Array<any>} event - The event title string, order index, type, and enumb as an array.
   * @param {string} [custom] - Custom text to go after event title
   * @param {string} [gml] - Initial GML to put in the event
   */
  addEvent(event: Array<any>, custom: string = '', gml: string = '') {
    let exists = this.eventExists(event[0] + custom);
    if (exists === false) {
      this.objectData.events.push({
        event: event[0] + custom,
        gml: gml,
        order: event[1],
        type: event[2],
        enumb: event[3]
      });
      this.sortEvents();
      this.setEvent(event[0] + custom);
      return true;
    } else {
      this.setEvent(event[0] + custom);
      return false;
    }
  }

  /**
   * Returns the GML for the given event, or false if the event doesn't exist.
   * @param {string} event - The event to get the GML for
   */
  getEventGml(event:string) {
    let exists:any = this.eventExists(event);
    if (exists) {
      return exists.gml;
    } else {
      return false;
    }
  }

  /**
   * Checks if an event exists on the object
   * @param {string} event - The event to check
   */
  eventExists(event:string) {
    let exists = false;
    for(var i:number=0; i<this.objectData.events.length; i++) {
      if (this.objectData.events[i].event === event) {
        exists = this.objectData.events[i];
      }
    }
    return exists;
  }

  /**
   * Sorts the event list by the event order property
   */
   sortEvents() {
     this.objectData.events.sort(function(a:any,b:any) {
       if (a.order < b.order) {
         return -1;
       } else if (a.order > b.order) {
         return 1;
       }
       return 0;
     });
   }

   /**
    * Selects the top event as the active one.
    * To be used when loading an object.
    */
   selectTopEvent() {
     if (this.objectData.events[0]) {
       this.setEvent(this.objectData.events[0].event);
     }
   }
}
