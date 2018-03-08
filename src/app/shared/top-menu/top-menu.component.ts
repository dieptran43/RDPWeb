import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
    constructor(private rou: Router) { }

    ngOnInit() { }

    public redirectLink() {
        window.location.href = "https://www.reddotpower.com.sg";
    }
}