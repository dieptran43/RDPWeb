import { Component, OnInit } from '@angular/core';
import { SalesforceProvider } from '../../providers/providers';

@Component({
    selector: 'app-biz-signup',
    templateUrl: './biz-signup.component.html',
    styleUrls: ['./biz-signup.component.css']
})

export class BizSignupComponent implements OnInit {
    public vm: any = {};

    constructor(private pro: SalesforceProvider) { }

    ngOnInit() {
        this.getFormData();
        document.getElementById("residentialTab").setAttribute("class", "");
    }

    private getFormData() {
        this.pro.getFormData().subscribe((rsp: any) => {
            if (rsp.callstatus == "success") {
                this.vm = rsp.result;
            }
        });
    }
}