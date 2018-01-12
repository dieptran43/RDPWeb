import { Component, OnInit, Input } from '@angular/core';
import { Signup2Component } from '../signup-2/signup-2.component';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-signup-3',
  templateUrl: './signup-3.component.html',
  styleUrls: ['./signup-3.component.css']
})
export class Signup3Component implements OnInit {

  constructor(private _dataService: DataService) { 

  }

  ngOnInit() {
    console.log(this._dataService.entitySignUp);
    console.log(sessionStorage.getItem("dataSignUp2"))
  }

}
