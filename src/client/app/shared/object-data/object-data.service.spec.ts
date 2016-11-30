import { ObjectDataService } from './object-data.service';

export function main() {
  describe('ObjectData Service', () => {
    let objectDataService: ObjectDataService = new ObjectDataService;
    let encodedObject: any;
    let encodedTemplateObject: any;

    beforeEach(() => {
      encodedObject = objectDataService.encodeObject();
      encodedTemplateObject = objectDataService.encodeTemplateObject();
    });

    it('should have empty object data equal to template', () => {
      expect(encodedObject).toEqual(encodedTemplateObject);
    });

    it('should catch bad imports', () => {
      let badImport = 'eyJwcm9wZXJ0aWVzIjp7Im5hbWUiOiIiLCJkZXB0a';
      let res = objectDataService.importObject(badImport);
      expect(res).toEqual(false);
    });

    describe('event handling', () => {
      let testGML = 'var test = 0;';

      it('should add an event successfully', () => {
        objectDataService.addEvent('Create','',testGML);
        expect(objectDataService.eventExists('Create')).not.toEqual(false);
      });

      it('should change an event successfully', () => {
        objectDataService.changeEvent('Create', 'Destroy');
        expect(objectDataService.eventExists('Create')).toEqual(false);
      });

      it('should get an events GML successfully', () => {
        let gml = objectDataService.getEventGml('Destroy');
        expect(gml).toEqual(testGML);
      });

      it('should save new GML to an event successfully', () => {
        let newGml = '//This is a test';
        objectDataService.saveGml('Destroy', newGml);
        let gml = objectDataService.getEventGml('Destroy');
        expect(gml).toEqual(newGml);
      });

      it('should remove an event successfully', () => {
        objectDataService.removeEvent('Destroy');
        expect(objectDataService.eventExists('Destroy')).toEqual(false);
      });
    });

    it('should see a modified object as dirtied', () => {
      expect(objectDataService.saved).toEqual(false);
    });
  });
}
