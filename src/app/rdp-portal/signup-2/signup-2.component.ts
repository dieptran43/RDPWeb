import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-signup-2',
  templateUrl: './signup-2.component.html',
  styleUrls: ['./signup-2.component.css']
})
export class Signup2Component implements OnInit, OnDestroy {

  public entity: any = {};
  public salutations: any[];

  constructor(private _dataService: DataService, private router: Router) { }

  ngOnInit() {
  }
  ngOnDestroy(){
    this._dataService.entitySignUp = this.entity;
  }

  public saveSignup2(valid: boolean) {
    debugger
    if (valid) {
      let enti = JSON.stringify(this.entity);
      sessionStorage.setItem("dataSignUp2",enti);
      this.router.navigate(["/signup-3"]);
      // this._dataService.post("api/singup-2/add", enti).subscribe((res: any)=>{
      //   this.entity = res;        
      // }, err =>this._dataService.handleError(err));
    }
  }

}
