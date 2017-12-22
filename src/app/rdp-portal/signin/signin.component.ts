import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenService } from '../../core/services/authen.service';
import { UrlConstants } from '../../core/common/url.constants';
import { DataService } from '../../core/services/data.service';

import { AuthSocialService } from '../../core/services/auth-social.service';
import { SocialUser } from '../../core/models/social-user';
import { GoogleLoginProvider } from '../../core/providers/google-login-provider';
import { FacebookLoginProvider } from '../../core/providers/facebook-login-provider';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  model: any = {};
  user: SocialUser;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenService: AuthenService,
    private dataService: DataService,
    private authSocialService: AuthSocialService
  ) { }

  ngOnInit() {
    this.authSocialService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  login() {
    this.authenService.login2(this.model.username, this.model.password)
      .subscribe(
      data => {
       // this.router.navigate([UrlConstants.HOME]);
      },
      error => {
        console.log("Sign in page " + error);
        // this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      });
  }

  testGetValue(){
    this.dataService.get2('http://occapp.ddns.net:9696/resx/api/values')
    .subscribe((res:any) =>{
      console.log(res);
    }, err =>{
      console.log('Error testGetValue');
    });
  }

  signInWithGoogle(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authSocialService.signOut();
  }

}
