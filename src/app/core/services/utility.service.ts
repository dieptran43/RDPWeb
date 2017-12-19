import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UrlConstants } from '../../core/common/url.constants';
import { AuthenService } from './authen.service';

@Injectable()
export class UtilityService {
    private _router: Router;

    constructor(router: Router, private http: Http, private authenService: AuthenService) {
        this._router = router;
    }

    convertDateTime(date: Date) {
        var _formattedDate = new Date(date.toString());
        return _formattedDate.toDateString();
    }

    navigate(path: string) {
        this._router.navigate([path]);
    }
    navigateToLogin() {
        this._router.navigate([UrlConstants.LOGIN]);
    }
}