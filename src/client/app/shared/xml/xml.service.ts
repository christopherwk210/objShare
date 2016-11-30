import { Injectable } from '@angular/core';

@Injectable()
export class XmlService {
  physicsShapes: Array<string>;

  /**
   * Create XmlService.
   * @constructor
   */
  constructor() {
    this.physicsShapes = ['Circle', 'Box', 'Shape'];
  }

  /**
   * Converts object data to GM:S valid XML.
   * @param {any} oData - The complete object data
   * @returns XML string
   */
  objectDataToXml(oData:any) {
    let objectDataXML:string = '<!--This Document was generated by objShare-->\n';
    objectDataXML += this.elmtStr('object') + '\n';
    objectDataXML += this.xmlStr('sprite', '&lt;undefined&gt;', 1);
    objectDataXML += this.xmlStr('solid', oData.properties.solid ? '-1' : '0', 1);
    objectDataXML += this.xmlStr('visible', oData.properties.visible ? '-1' : '0', 1);
    objectDataXML += this.xmlStr('depth', oData.properties.depth.toString(), 1);
    objectDataXML += this.xmlStr('persistent', oData.properties.persistent ? '-1' : '0', 1);
    objectDataXML += this.xmlStr('parentName', '&lt;undefined&gt;', 1);
    objectDataXML += this.xmlStr('maskName', '&lt;undefined&gt;', 1);
    objectDataXML += '  ' + this.elmtStr('events') + '\n';

    for(var i = 0; i < oData.events.length; i++) {
      if (oData.events[i].type === 4) {
        objectDataXML += '    ' + this.elmtStr('event', false, `eventtype="${oData.events[i].type}" ename="${oData.events[i].enumb}"`) + '\n';
      } else {
        objectDataXML += '    ' + this.elmtStr('event', false, `eventtype="${oData.events[i].type}" enumb="${oData.events[i].enumb}"`) + '\n';
      }
      objectDataXML += this.xmlCode(oData.events[i].gml, 3);
      objectDataXML += '    ' + this.elmtStr('event', true) + '\n';
    }

    objectDataXML += '  ' + this.elmtStr('events', true) + '\n';
    objectDataXML += this.xmlStr('PhysicsObject', oData.properties.physics.uses ? '-1' : '0', 1);
    objectDataXML += this.xmlStr('PhysicsObjectSensor', oData.properties.physics.sensor ? '-1' : '0', 1);
    objectDataXML += this.xmlStr('PhysicsObjectShape', this.physicsShapes.indexOf(oData.properties.physics.shape).toString(), 1);
    objectDataXML += this.xmlStr('PhysicsObjectDensity', oData.properties.physics.density.toString(), 1);
    objectDataXML += this.xmlStr('PhysicsObjectRestitution', oData.properties.physics.restitution.toString(), 1);
    objectDataXML += this.xmlStr('PhysicsObjectGroup', oData.properties.physics.collision.toString(), 1);
    objectDataXML += this.xmlStr('PhysicsObjectLinearDamping', oData.properties.physics.linear.toString(), 1);
    objectDataXML += this.xmlStr('PhysicsObjectAngularDamping', oData.properties.physics.angular.toString(), 1);
    objectDataXML += this.xmlStr('PhysicsObjectFriction', oData.properties.physics.friction.toString(), 1);
    objectDataXML += this.xmlStr('PhysicsObjectAwake', oData.properties.physics.awake ? '-1' : '0', 1);
    objectDataXML += this.xmlStr('PhysicsObjectKinematic', oData.properties.physics.kinematic ? '-1' : '0', 1);
    if (oData.properties.physics.uses) {
      objectDataXML += '  ' + this.elmtStr('PhysicsShapePoints', true) + '\n';
      objectDataXML += this.xmlStr('point', '0,0', 2);
      objectDataXML += this.xmlStr('point', '16,16', 2);
      objectDataXML += '  ' + this.elmtStr('PhysicsShapePoints') + '\n';
    } else {
      objectDataXML += '<PhysicsShapePoints/>\n';
    }

    objectDataXML += this.elmtStr('object', true) + '\n';

    return objectDataXML;
  }

  /**
   * Returns a properly formatted XML action for a code block
   * @param {gml} string - The GML to insert inside of the code block
   * @param {number} indentation=0 - How far to indent (in increments of 2 space soft-tabs)
   */
  xmlCode(gml:string, indentation: number = 0) {
    if (gml.length === 0) {
      gml = '///Empty';
    } else {
      gml = gml.replace('&', '&amp;');
      gml = gml.replace('<', '&lt;');
      gml = gml.replace('>', '&gt;');
    }

    let actionXml: string = '';

    actionXml += this.repeatStr('  ', indentation) + this.elmtStr('action') + '\n';

    actionXml += this.xmlStr('libid', '1', indentation + 1);
    actionXml += this.xmlStr('id', '603', indentation + 1);
    actionXml += this.xmlStr('kind', '7', indentation + 1);
    actionXml += this.xmlStr('userelative', '0', indentation + 1);
    actionXml += this.xmlStr('isquestion', '0', indentation + 1);
    actionXml += this.xmlStr('useapplyto', '-1', indentation + 1);
    actionXml += this.xmlStr('exetype', '2', indentation + 1);
    actionXml += this.xmlStr('functionname', '', indentation + 1);
    actionXml += this.xmlStr('codestring', '', indentation + 1);
    actionXml += this.xmlStr('whoName', 'self', indentation + 1);
    actionXml += this.xmlStr('relative', '0', indentation + 1);
    actionXml += this.xmlStr('isnot', '0', indentation + 1);

    actionXml += this.repeatStr('  ', indentation + 1) + this.elmtStr('arguments') + '\n';
    actionXml += this.repeatStr('  ', indentation + 2) + this.elmtStr('argument') + '\n';
    actionXml += this.xmlStr('kind', '1', indentation + 3);
    actionXml += this.xmlStr('string', gml, indentation + 3);
    actionXml += this.repeatStr('  ', indentation + 2) + this.elmtStr('argument', true) + '\n';
    actionXml += this.repeatStr('  ', indentation + 1) + this.elmtStr('arguments', true) + '\n';

    actionXml += this.repeatStr('  ', indentation) + this.elmtStr('action', true) + '\n';

    return actionXml;
  }

  /**
   * Returns a one line string of an xml formatted element with the provided
   * content and indentation level.
   * @param {string} element - The XML element to create
   * @param {string} [content=''] - Inner content of element
   * @param {number} [indent=0] - Indentation level using soft tabs of 2 spaces
   * @param {string} [attr] - String to place in opening tag where attributes go
   */
  xmlStr(element:string, content:string = '', indent:number = 0, attr?:string) {
    let openElementString:string, closeElementString:string,
        completeStr:string;

    if (attr) {
      openElementString = this.elmtStr(element, false, attr);
    } else {
      openElementString = this.elmtStr(element);
    }
    closeElementString = this.elmtStr(element, true);
    completeStr = openElementString + content + closeElementString;

    let spaces = this.repeatStr('  ', indent);
    return spaces + completeStr + '\n';
  }

  /**
   * Returns a string representation of any xml element tag
   * @param {string} element - The XML element to use
   * @param {boolean} [closed=false] - Returns a closed version of the tag if true
   * @param {string} [attr] - String to place in tag where attributes go
   */
   elmtStr(element:string, closed:boolean = false, attr?:string) {
     let closing:string = '',
         attributes:string = '';

     if (closed) {
       closing = '/';
     }

     if (attr) {
       attributes = ' ' + attr;
     }

     return `<${closing}${element}${attributes}>`;
   }

   /** Disable tslint beyond this point to preserve polyfill */
   /* tslint:disable */

   /**
    * Polyfill for String.prototype.repeat, taken from
    * https://github.com/mathiasbynens/String.prototype.repeat/blob/master/repeat.js
    * Modified to play nicely with TS
    * @param {string} string - String to repeat
    * @param {number} count - Number of times to repeat
    */
   repeatStr(string:string, count:number) {
     // `ToInteger`
     var n = count ? Number(count) : 0;
     if (n != n) { // better `isNaN`
       n = 0;
     }
     // Account for out-of-bounds indices
     if (n < 0 || n == Infinity) {
       throw RangeError();
     }
     var result = '';
     while (n) {
       if (n % 2 == 1) {
         result += string;
       }
       if (n > 1) {
         string += string;
       }
       n >>= 1;
     }
     return result;
   };

}
