import { Component, OnInit, ViewEncapsulation, AfterContentChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SalesforceProvider } from '../../providers/providers';
import { ModalDirective, TooltipModule } from 'ngx-bootstrap';

@Component({
    selector: 'app-res-signup',
    templateUrl: './res-signup.component.html',
    styleUrls: ['./res-signup.component.css',
        '../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css',
    ],
    encapsulation: ViewEncapsulation.None
})
export class ResSignupComponent implements OnInit, AfterContentChecked {
    vm: any = {
        "percentDiscount": '',
    };

    public bsValue = new Date();
    public planList: any[] = [];
    public currentPlanName: string = "";
    public showReadFactSheet = false;
    public showReadTerms = false;
    public showPlanName: string = '';
    public maxDate: Date;
    public minDate: Date;
    public minDatePreferred: Date;
    public showValid_eQPlus: boolean = false;
    public loader: boolean = false;
    public listCompany: any[] = [];
    public data: any[] = [];
    public isBlank: boolean = true;
    public planNameYR: any;
    public nameOfPricePlanMeter: String = '';
    public aMIMeterInstallationFee: String = '';
    public decode_planName: string;
    public existingMeterTypePop: string = '';
    public accountNumberTooltip: string = `
    <div>
      <img class="img-width" src="../assets/img/AccountNumber.jpg" />
    </div>
  `;
    public meterTypeTooltip: string = `
  <div>
      <img class="img-width" src="../assets/img/MeterType.png" />
    </div>
  `;
    public finalTypeTooltip: string = `
  <div class="div-border">
      <p>This refers to final meter reading before transferring out from SP Group. If you select No, SP Group will charge $20 for ad-hoc meter reading.</p>
    </div>
  `;

    public iseQPlus: string = '';

    @ViewChild('factSheetModal') public factSheetModal: ModalDirective;
    @ViewChild('termConditionsModal') public termConditionsModal: ModalDirective;
    @ViewChild('meterTypeModal') public meterTypeModal: ModalDirective;
    @ViewChild('requestForMeterChangeModal') public requestForMeterChangeModal: ModalDirective;
    @ViewChild('changeToAmiMeterModal') public changeToAmiMeterModal: ModalDirective;

    constructor(private router: Router,
        private pro: SalesforceProvider,
        private act: ActivatedRoute) { }

    ngOnInit() {
        this.getPlanList();
        // this.act.params.subscribe((params: Params) => {
        //     let par_planName = params["planName"];
        //     console.log(par_planName)
        //     this.decode_planName = atob(par_planName);

        //     if (par_planName != "bnVsbA==") {
        //         let code = this.decode_planName.split(";");
        //         this.showPlanName = code[0];
        //         this.vm.planName = code[1];
        //         if (this.vm.planName == undefined) {
        //             this.vm.planName = '';
        //         }
        //         this.currentPlanName = this.vm.planName;
        //     }
        // });

        //this.getPlanList();
        this.maxDate = new Date();
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() - 21);
        //this.minDatePreferred = new Date(2018, 3, 1);
        this.vm.registrationDate = new Date();
        let dateAfterWorking = this.nextWorkingDay(this.vm.registrationDate, 5);
        this.minDatePreferred = this.vm.preferredDateOfSupply = dateAfterWorking;

        document.getElementById("userName").focus();
        //this.validLead("x", "x");
    }

    ngAfterContentChecked() { }

    public newResSignUp(valid: boolean) {
        if (!valid) {
            return;
        }

        let d = new Date();
        this.vm.createdDate = d.toISOString();
        this.vm.systemModStamp = d.toISOString();

        let obj: any = {
            "address1": this.vm.address1,
            "address2": this.vm.address2,
            "agreedFactSheet": this.vm.agreedFactSheet,
            "agreedTermsConditions": this.vm.agreedTermsConditions,
            "changeToAmiMeter": this.vm.changeToAmiMeter,
            "company": this.vm.userName,
            "createdDate": this.vm.createdDate,
            "currentMeterType": this.vm.existingMeterType,
            "duration": this.vm.duration,
            "ebsNumber": this.vm.accountNumber,
            "email": this.vm.userEmail,
            "isDeleted": false,
            "lastName": this.vm.userName,
            "leadSource": "Website",
            "masterRecordExternalId": null,
            "masterRecordId": "",
            "meterSelfRead": this.vm.selfRead,
            "mobilePhone": this.vm.contactNo,
            "name": this.vm.userName,
            "planName": this.vm.planName,
            "postalCode": this.vm.postalCode,
            "residentialType": this.vm.residentialType,
            "salesPerson": this.vm.salePersion ? this.vm.salePersion : "",
            "status": "New",
            "systemModStamp": this.vm.systemModStamp,
            "nightRate": this.vm.nightRate,
            "percentDiscount": this.vm.percentDiscount ? this.vm.percentDiscount : 0,
            "rate": this.vm.rate,
            "phone": this.vm.telNo,
            "nricNo": this.vm.nricNo,
            "type": "R"
        };

        if (this.vm.preferredDateOfSupply != undefined) {
            obj.planStartDate = this.vm.preferredDateOfSupply.toISOString();
        }

        if (this.vm.registrationDate != undefined) {
            obj.registrationDate = this.vm.registrationDate.toISOString();
        }

        if (this.vm.contractEndDate != undefined) {
            obj.contractEndDateOem = this.vm.contractEndDate.toISOString();
        }

        // Invoking loading spinner
        this.loader = true;

        this.pro.saveLead(obj).subscribe((rsp: any) => {
            if (rsp.callstatus == "success") {
                // Encode
                let factSheet = btoa(rsp.result.factSheet);
                let salesAgreement = btoa(rsp.result.salesAgreement);
                let webReferenceNo = btoa(rsp.result.webReferenceNo);

                let param = '/res-welcome/' + factSheet + '/' + salesAgreement + '/' + webReferenceNo;
                this.router.navigate([param]);
            }
            else {
                alert("Fail, pls try again..." + rsp.message);
            }

            this.loader = false;
        }, err => { alert("Error connection"); });
    }

    public updatePlanDetails() {
        // eQ+
        if (this.vm.planName == "a010k000004VKMOAA4") {
            this.vm.duration = "24";
            this.showValid_eQPlus = false;
        } else {
            this.showValid_eQPlus = false;
        }

        if (this.vm.duration == undefined) {
            return;
        }

        let x = {
            "duration": this.vm.duration,
            "sfid": this.vm.planName
        }

        this.pro.searchPackage(x).subscribe((rsp: any) => {
            if (rsp.callstatus === "success") {
                let x = rsp.result;
                let planDetails = "";

                if (x.sfid === "a010k000004VKMkAAO") { // eSAVE
                    planDetails = x.percentDiscount + "% discount off regulated tariff.";
                }
                if (x.sfid === "a010k000004VKMIAA4") { // eFIX
                    planDetails = "Electricity rate at " + x.rate + " cents/kWh.";
                }
                if (x.sfid === "a010k000004VKMOAA4") { // eQ+
                    planDetails = "Electricity rate at " + x.rate + " cents/kWh (peak period), " + x.nightRateDollars
                        + " cents/kWh (off-peak period).";
                }

                this.vm.planDetails = planDetails;
                this.showPlanName = x.name;
                this.vm.percentDiscount = x.percentDiscount;
                this.vm.rate = x.rate;
                this.vm.nightRate = x.nightRateDollars;
                this.planNameYR = this.vm.duration / 12;
                let a = this.vm.existingMeterType;
                let b = this.vm.changeToAmiMeter;
                this.existingMeterTypePop = a;

                if (this.existingMeterTypePop != null || this.existingMeterTypePop != undefined) {
                    this.existingMeterTypePop = this.existingMeterTypePop.replace('_', ' / ');
                }

                if (a && b && a == 'Cumulative_SRLP') {
                    if (b == 'No') {
                        this.nameOfPricePlanMeter = '-EXISTING METER';
                        this.aMIMeterInstallationFee = 'Not Applicable';
                    }
                    else {
                        this.nameOfPricePlanMeter = '-SMART METER';
                        this.aMIMeterInstallationFee = 'A one-time installation fee of $40 will apply.';
                    }
                }
            }
            else {
            }
        }, err => this.pro.handleError(err));

        this.updateContractEndDate(this.vm.preferredDateOfSupply);
    }

    public clickSupply(dp) {
        this.updateContractEndDate(dp._bsValue);
    }

    public clickRegistrationDate(dpr) {
        if (dpr._bsValue != null || dpr._bsValue != undefined) {
            this.vm.registrationDate = dpr._bsValue;
            let dateAfterWorking = this.nextWorkingDay(this.vm.registrationDate, 5);
            this.minDatePreferred = this.vm.preferredDateOfSupply = dateAfterWorking;
        }
    }

    public search() {
        let x = {
            "block": "", // 10
            "postcode": this.vm.postalCode, // 408600
            "streetName": "" // Eunos Road 8
        }

        if (this.vm.postalCode != "") {
            this.isBlank = false;
        }
        else {
            this.isBlank = true;
        }

        this.pro.sgLocate(x).subscribe((rsp: any) => {
            if (rsp.Postcodes) {
                //this.data = rsp.Postcodes;

                if (rsp.Postcodes.length > 0) {
                    let item = rsp.Postcodes[0];
                    this.vm.address1 = item.BuildingNumber + ' ' + item.StreetName;
                    this.vm.address2 = item.BuildingName;
                    this.vm.postalCode = item.Postcode;
                }
                else {
                    this.vm.address1 = "";
                    this.vm.address2 = "";
                    this.vm.postalCode = "";
                }
            }
        }, err => this.pro.handleError(err));
    }

    public selectItem(item) {
        this.vm.address1 = item.BuildingNumber + ' ' + item.StreetName;
        this.vm.address2 = item.BuildingName;
        this.vm.postalCode = item.Postcode;

        this.isBlank = true;
    }

    public clickReadFactSheet() {
        if (this.vm.userName && this.showPlanName && this.vm.duration) {
            this.factSheetModal.show();
        }
    }

    public existingMeterTypeChange() {
        if (this.vm.existingMeterType == "AMI") {
            //this.meterTypeModal.show();
        }
        if (this.vm.existingMeterType == "Cumulative_SRLP" && this.vm.changeToAmiMeter == "Yes") {
            this.requestForMeterChangeModal.show();
        }
    }

    public closeModal(modal) {
        modal.hide();
    }

    public changeToAmiMeterChange() {
        // if (this.vm.changeToAmiMeter == "No") {
        //   this.changeToAmiMeterModal.show();
        // } else
        if (this.vm.changeToAmiMeter == "Yes") {
            this.requestForMeterChangeModal.show();
        }
    }

    public nextWorkingDay(dateInput: Date, days: number) {
        let d: Date = new Date(dateInput);
        let addWorkingDay = 0;
        let week = Math.floor(days / 5);

        switch (d.getDay()) {
            case 0: //sunday
                if (week < days / 5) {
                    addWorkingDay = days + 2 * week;
                } else {
                    addWorkingDay = days + 2 * (week - 1);
                }
                break;

            case 6: //saturday
                if (week < days / 5) {
                    addWorkingDay = days + 1 + 2 * week;
                } else {
                    addWorkingDay = days + 1 + 2 * (week - 1);
                }
                break;

            default: //monday -> friday
                let dayInWeek = [5, 4, 3, 2, 1];
                let afk = days % 5;

                if (afk == 0) {
                    addWorkingDay = days + 2 * week;
                } else {
                    if (dayInWeek[d.getDay() - 1] <= afk)
                        addWorkingDay = days + 2 * (week + 1);
                    else
                        addWorkingDay = days + 2 * week;
                }
                break;
        }

        let ok = d.getDate() + addWorkingDay;
        return new Date(d.setDate(ok));
    }

    public clickReadTermsAndConditions() {
        if (this.vm.userName && this.showPlanName && this.vm.duration) {
            this.termConditionsModal.show();
        }
    }

    private getPlanList() {
        this.pro.getPackage().subscribe((rsp: any) => {
            if (rsp.callstatus == "success") {
                this.planList = rsp.result.data;
                let x = this.planList.find(x => x.name === 'eQ+');
                this.act.params.subscribe((params: Params) => {
                    let par_planName = params["planName"];
                    console.log(par_planName)
                    this.decode_planName = atob(par_planName);
        
                    if (par_planName != "null") {
                        let code = this.decode_planName.split(";");
                        this.showPlanName = code[0];
                        this.vm.planName = code[1];
                        this.iseQPlus = this.vm.planName;
                        if(this.iseQPlus != x.sfid){
                            this.iseQPlus = x.sfid;
                        }
                        console.log("FFFFFF"+this.vm.planName);
                        let ss = this.vm.planName == undefined || this.vm.planName == '' ? true : false;
                        if (ss) {
                            this.vm.planName = x.sfid;
                            this.iseQPlus = x.sfid;
                        }
                        this.currentPlanName = this.vm.planName;
                    }
                });
            }
        });
    }

    private validLead(name, post) {
        let x = {
            "name": name,
            "postalCode": post
        };

        this.pro.validLead(x).subscribe((rsp: any) => {
            console.log(rsp.result);
        }, err => this.pro.handleError(err));
    }

    private updateContractEndDate(frDate) {
        if (this.vm.duration == undefined
            || frDate == undefined) {
            return;
        }

        if (frDate != null) {
            let toDate = new Date(frDate);

            let months = toDate.getMonth() + parseInt(this.vm.duration);
            let tmp1 = new Date(toDate.setMonth(months));

            let days = tmp1.getDate() - 1
            let tmp2 = new Date(tmp1.setDate(days));

            this.vm.contractEndDate = tmp2;
        }
        else {
            this.vm.contractEndDate = null;
        }
    }
}