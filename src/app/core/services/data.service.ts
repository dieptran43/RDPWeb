import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthenService } from './authen.service';
import { SystemConstants } from './../common/system.constants';
import { MessageContstants } from './../common/message.constants';
import { UtilityService } from './utility.service';
import { ReplaySubject } from 'rxjs';
import { InterceptorService } from 'ng2-interceptors/lib/interceptor-service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    private headers: Headers;
    constructor(
        public http: Http,
        private route: Router,
        public authenService: AuthenService,
        private utilityService: UtilityService,
        private _httpInterceptorService: InterceptorService
    ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    get(uri: string) {
        this.headers.delete('Authorization');
        this.headers.append("Authorization", "Bearer " + this.authenService.getLoggedInUser().access_token);
        return this.http.get(SystemConstants.BASE_API + uri, { headers: this.headers })
            .map(this.extractData);
    }

    get2(uri: string) {
        //console.log(localStorage.getItem('token'))
        this.headers.delete('Authorization');
        let a = localStorage.getItem('token');
        console.log(a);
        this.headers.append("Authorization", "Bearer " + a);
        console.log(uri)
        console.log(this.headers)
        return this.http.get("http://occapp.ddns.net:9696/resx/api/values", { headers: this.headers })
            .map(this.extractData);
    }

    post(uri: string, data?: any) {
        this.headers.delete('Authorization');
        this.headers.append("Authorization", "Bearer " + this.authenService.getLoggedInUser().access_token);
        return this.http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers })
            .map(this.extractData);
    }
    put(uri: string, data?: any) {
        this.headers.delete('Authorization');
        this.headers.append("Authorization", "Bearer " + this.authenService.getLoggedInUser().access_token);
        return this.http.put(SystemConstants.BASE_API + uri, data, { headers: this.headers })
            .map(this.extractData);
    }

    delete(uri: string, key: string, id: string) {
        this.headers.delete('Authorization');
        this.headers.append("Authorization", "Bearer " + this.authenService.getLoggedInUser().access_token);
        return this.http.delete(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
            .map(this.extractData);

    }
    deleteWithMultiParams(uri: string, params) {
        this.headers.delete('Authorization');
        this.headers.append("Authorization", "Bearer " + this.authenService.getLoggedInUser().access_token);
        var paramStr: string = '';
        for (let param in params) {
            paramStr += param + "=" + params[param] + '&';
        }
        return this.http.delete(SystemConstants.BASE_API + uri + "/?" + paramStr, { headers: this.headers })
            .map(this.extractData);

    }
    postFile(uri: string, data?: any) {
        let newHeader = new Headers();
        newHeader.append("Authorization", "Bearer " + this.authenService.getLoggedInUser().access_token);
        return this.http.post(SystemConstants.BASE_API + uri, data, { headers: newHeader })
            .map(this.extractData);
    }

    //#region  --Get Data app/profile
    //private commentsUrl = 'https://cuppa-angular2-oauth.herokuapp.com/api/profile'; 
    private commentsUrl = SystemConstants.AUTH_BASE_URL + '/api/profile';

    getProfile(): Observable<any> {
        // ...using get request
        return this._httpInterceptorService.get(this.commentsUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }
    //#endregion

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    public handleError(error: any) {
        if (error.status == 401) {
            localStorage.removeItem(SystemConstants.CURRENT_USER);
            //this.notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
            this.utilityService.navigateToLogin();
        }
        else if (error.status == 403) {
            localStorage.removeItem(SystemConstants.CURRENT_USER);
            //this.notificationService.printErrorMessage(MessageContstants.FORBIDDEN);
            this.utilityService.navigateToLogin();
        }
        else {
            let errMsg = JSON.parse(error._body).Message;
            //this.notificationService.printErrorMessage(errMsg);

            return Observable.throw(errMsg);
        }

    }
}