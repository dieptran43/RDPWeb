import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cuppa-oauth',
  template: `
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
      <button (click)="googleLogin()" class="btn btn-block btn-lg btn-social btn-google">
          <span class="fa fa-google"></span> Sign in with Google
      </button>
      <button (click)="facebookLogin()" class="btn btn-block btn-lg btn-social btn-facebook">
          <span class="fa fa-facebook"></span> Sign in with Facebook
      </button>     
      </div>
    </div>`,
  styleUrls: ['./auth-styles.css']
})
export class cuppaOAuth {

  @Input()
  authConfig: any;

  constructor(public authService: AuthService,
    private route: ActivatedRoute
  ) {
  }
  facebookLogin() {
    this.removeSocialStorage();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || window.location.href;
    localStorage.setItem('returnUrlSocial', returnUrl as string);

    this.authService.auth('facebook', this.authConfig);
  }
  googleLogin() {
    this.removeSocialStorage();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || window.location.href;
    localStorage.setItem('returnUrlSocial', returnUrl as string);

    this.authService.auth('google', this.authConfig);
  }

  private removeSocialStorage() {
    localStorage.removeItem('returnUrlSocial');
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('cachedurl');
    localStorage.removeItem('provider');
  }
}