import { StorageService } from './storage.service';

export function main() {
  describe('Storage Service', () => {
    let storageService: StorageService = new StorageService;
    let testObj = { foo: 'foo', bar: 'bar' };

    it('should set and get an object from storage properly', () => {
      storageService.setObject('test', testObj);
      let getObj = storageService.getObject('test');
      expect(getObj).toEqual(testObj);
    });

    it('should set defaults when getting an unset storage key', () => {
      let defaultRes = storageService.get('defKey', 'default');
      expect(defaultRes).toEqual('default');
    });

    it('should return boolean when applicable', () => {
      let booleanRes = storageService.get('boolKey', true);
      expect(booleanRes).toEqual(true);
    });
  });
}
