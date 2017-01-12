import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

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
   * Returns an Observable for an HTTP json POST request
   * @param {string} url - URL to post to
   * @param {string} data - Stringified JSON to post
   */
   post(url:string, data:string):Observable<any> {
     let headers = new Headers({'Content-Type': 'application/json'});
     let options = new RequestOptions({ headers: headers });

     return this.http.post(url, data, options)
                     .map(res => res.json())
                     .catch((error:any) => Observable.throw(error));
   }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'HTTP error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
