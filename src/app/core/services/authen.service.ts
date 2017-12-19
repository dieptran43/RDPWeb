import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { SystemConstants } from '../../core/common/system.constants';
import { LoggedInUser } from '../models/loggedin-user';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  login(username: string, password: string) {
    let body = "userName=" + encodeURIComponent(username) +
      "&password=" + encodeURIComponent(password) +
      "&grant_type=password";

    console.log(body);
    let headers = new Headers();
    // headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(SystemConstants.BASE_API + "/api/oauth/token", body, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user: LoggedInUser = response.json();
        console.log(response)
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        }
      });
  }

  login2(username: string, password: string) {
    console.log(username +" - "+ password)
    let body = "&UserName=" + encodeURIComponent(username) +
      "&Password=" + encodeURIComponent(password);

      let headers = new Headers();
     // headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http
      //.post(SystemConstants.BASE_API + "/auth/api/Token/auth2?GrantType=password&ClientId=100&ClientSecret=888"+ body, null, options)
      .post("http://occapp.ddns.net:9696/auth/api/Token/auth2?GrantType=password&ClientId=100&ClientSecret=888" + body,null, null)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        //console.log(JSON.stringify(user));
        let access_tokenStr =JSON.parse(user.data);
        console.log(JSON.stringify(user.data));
        console.log(JSON.stringify(access_tokenStr.access_token));
        if (user && access_tokenStr) {

         // console.log(JSON.stringify(user));
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
          localStorage.removeItem('token');
          localStorage.setItem('token',access_tokenStr.access_token);
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    var _user: any = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (_user != null)
      return true;
    else
      return false;
  }

  getLoggedInUser(): LoggedInUser {
    var _user: LoggedInUser;

    if (this.isUserAuthenticated()) {
      var _userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      _user = new LoggedInUser(
        _userData.access_token,
        _userData.username,
        _userData.fullName,
        _userData.email,
        _userData.phone,
        _userData.avatar
      );
    }
    else {
      _user = null;
    }

    return _user;
  }
}
