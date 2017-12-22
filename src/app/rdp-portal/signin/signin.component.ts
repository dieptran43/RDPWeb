import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenService } from '../../core/services/authen.service';
import { UrlConstants } from '../../core/common/url.constants';
import { DataService } from '../../core/services/data.service';
import { ConfigConstants } from '../../core/common/config.constants';

import { Observable } from 'rxjs/Observable';
import { PreloadSelectedModules } from '../../selective-preload-strategy';
import { User } from '../../admin/profile.interface';
import { AuthService } from '../../core/services/cuppaOAuth/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  model: any = {};
  config = ConfigConstants.config;
  private user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenService: AuthenService,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    let token = localStorage.removeItem('token');
    let cachedurl = localStorage.removeItem('cachedurl');
    let provider = localStorage.removeItem('provider');
    if(isLoggedIn && token){
      this.getUserProfile();
    }

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

  testGetValue() {
    this.dataService.get2('http://occapp.ddns.net:9696/resx/api/values')
      .subscribe((res: any) => {
        console.log(res);
      }, err => {
        console.log('Error testGetValue');
      });
  }



  getUserProfile() {

    this.dataService.getProfile()
      .subscribe(
      profile => {
        console.log(`This profile` + profile);
        console.log(this.user = new User(profile._id, profile.displayName, profile.email, profile.picture, profile.provider, profile.provider_id));
      },
      err => {
        console.log(err);
      });
  }

  logout() {
    this.authService.logout();
  }

}
