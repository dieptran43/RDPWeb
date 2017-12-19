import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenService } from '../../core/services/authen.service';
import { UrlConstants } from '../../core/common/url.constants';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  model: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenService: AuthenService,
    private dataService: DataService
  ) { }

  ngOnInit() {
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

}