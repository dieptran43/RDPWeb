import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-res-signup-2',
  templateUrl: './res-signup-2.component.html',
  styleUrls: ['./res-signup-2.component.css',
    '../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class ResSignup2Component implements OnInit {
  bsValue = new Date();

  constructor() { }

  ngOnInit() {
  }

}
