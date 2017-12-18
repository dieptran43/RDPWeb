import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from '../common/system.constants';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
            return true;
        }
        return false;
    }
}
