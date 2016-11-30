import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileLoaderService {

  /**
   * Create FileLoaderService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
  }

  /**
   * Returns an Observable for an HTTP GET request for a given markdown resource.
   * @param {string} resource - The relative path to the resource (i.e. 'assets/file.md')
   */
  get(resource:string):Observable<any> {
    return this.http.get(resource)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'File error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
