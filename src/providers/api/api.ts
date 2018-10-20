import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://fede-todo-list.herokuapp.com/api';
  }

  public auth(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth`, {
      auth: params
    }).pipe(map((response: any) => {
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }))
  }

  public register(params): Observable<boolean> {
    return this.http.post(`${this.url}/v1/user`, {
      user: params
    }).pipe(map((response: any) => {
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }))
  }
}
