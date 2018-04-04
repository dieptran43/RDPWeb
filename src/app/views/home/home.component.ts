import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, TooltipModule } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { SalesforceProvider } from '../../providers/providers';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    @ViewChild("FindOutSavingModal") public FindOutSavingModal: ModalDirective;
    public listSlider: any[] = [];
    public entity: any = {};
    public currentElectricityRate: number = 0.203;
    public typeSelect: string = 'Businness'; //or Residential
    public flagPCSavingESave = false;
    public flagPCSavingEFix = false;
    public flagPCSavingEQPlus = false;
    public listPlan: any[] = [];
    public isResidential: boolean = true;
    public eSave: string;
    public eQPlus: string;
    public eFix: string;
    public isShow: boolean = false;
    public heightDes = "";
    public heightDiscount = "";

    public vmESAVE: any = {
        "name": "eSAVE"
    };

    public vmEFIX: any = {
        "name": "eFIX"
    };

    public vmEQPlus: any = {
        "name": "eQ+"
    };

    public listQuestion: any = {
        "q1": "",
        "q2": "",
        "q3": ""
    };

    constructor(private pro: SalesforceProvider) {
    }

    ngOnInit() {
        //eSave
        this.eSave = btoa("eSAVE;a010k000004VKMkAAO");

        //eQ+
        this.eQPlus = btoa("eQ+;a010k000004VKMOAA4");

        //eFix
        this.eFix = btoa("eFIX;a010k000004VKMIAA4");

        this.getPackage();

        this.listSlider = [
            {
                "imageName": "Slider1.jpg",
                "title": "Red Dot Power",
                "description": "No.1 independent electricity retailer in Singapore"
            },
            {
                "imageName": "Slider2.jpg",
                "title": "eSAVE",
                "description": "Assured savings on your monthly bills with fixed discount off tariff."
            },
            {
                "imageName": "Slider3.jpg",
                "title": "eFIX",
                "description": "Budgeting made easy. Pay a fixed rate every month."
            },
            {
                "imageName": "Slider4.jpg",
                "title": "eQ+",
                "description": "Save according to your usage patterns"
            }
        ];

        document.getElementById("residentialTab").setAttribute("class", "highlight-header");
    }

    CalculateClicked(form: NgForm) {
        if (form.valid) {
            //refresh when placing the new featured plan
            this.flagPCSavingEFix = false;
            this.flagPCSavingESave = false;
            this.flagPCSavingEQPlus = false;

            this.vmESAVE = this.calcalateObject(this.vmESAVE, this.vmESAVE.rateOem, this.vmESAVE.nightRateDollarsOem,
                this.vmESAVE.percentDiscountOem, this.entity.usage1, this.entity.usage2, this.entity.usage3);
            this.vmEFIX = this.calcalateObject(this.vmEFIX, this.vmEFIX.rateOem, this.vmEFIX.nightRateDollarsOem,
                this.vmEFIX.percentDiscountOem, this.entity.usage1, this.entity.usage2, this.entity.usage3);
            this.vmEQPlus = this.calcalateObject(this.vmEQPlus, this.vmEQPlus.rateOem, this.vmEQPlus.nightRateDollarsOem,
                this.vmEQPlus.percentDiscountOem, this.entity.usage1, this.entity.usage2, this.entity.usage3);

            let maxPCSaving = this.vmESAVE.percentSaving;
            this.flagPCSavingESave = true;
            if (this.vmEFIX.percentSaving > maxPCSaving) {
                maxPCSaving = this.vmEFIX.percentSaving;
                this.flagPCSavingEFix = true;
                this.flagPCSavingESave = false;
                document.getElementById("eFixDiv").focus();
            }
            if (this.vmEQPlus.percentSaving > maxPCSaving) {
                maxPCSaving = this.vmEFIX.percentSaving;
                this.flagPCSavingEFix = false;
                this.flagPCSavingESave = false;
                this.flagPCSavingEQPlus = true;
                document.getElementById("eQPlusDiv").focus();
            }
            this.FindOutSavingModal.hide();
            this.isShow = true;
            form.resetForm();
        }
    }

    private calcalateObject(vm: any,
        rate: number, nightRate: number,
        percentDiscount: number,
        usage1: number, usage2: number, usage3: number) {
        //newPlan =B2*(100-E2)%
        let newPlan = vm.currentElectricityRate * (100 - percentDiscount) / 100;
        let total = usage1 + usage2 + usage3;
        let avg = total / 3;

        //existingCode =B2*AVERAGE(F2,G2,H2)*12
        // [st 4/4/2018] - currentElectricityRate needs to divide by 100, because the value is in cents
        let existingCost = (vm.currentElectricityRate / 100) * avg * 12;

        if (vm.name == "eFIX") {
            newPlan = rate;
        }
        if (vm.name == "eQ+") {
            newPlan = 0;
        }
        //NewPlanCost =I2*AVERAGE(F2,G2,H2)*12
        let newPlanCost = newPlan * avg * 12;
        //=SUM(C4*(AVERAGE(F4,G4,H4)*36%)*12,D4*(AVERAGE(F4,G4,H4)*64%)*12)
        if (vm.name == "eQ+") {
            let a1 = rate * avg * (36 / 100) * 12;
            let a2 = nightRate * avg * (64 / 100) * 12;
            newPlanCost = a1 + a2;
        }
        //saving =J2-K2
        // [st 4/4/2018] - newPlanCost needs to divide by 100, because the value is in cents
        let saving = existingCost - (newPlanCost / 100);
        //%Saving =L2/J2*100
        let percentSaving = saving / existingCost * 100;

        let obj: any = {};
        obj.existingCost = existingCost;
        obj.newPlanCost = newPlanCost;
        obj.saving = saving.toFixed(0);
        obj.percentSaving = percentSaving.toFixed(0);
        obj.name = vm.name;
        obj.packageDescription = vm.packageDescription;

        obj.nightRateDollars = vm.nightRateDollarsOem;
        obj.nightRateDollarsOem = vm.nightRateDollarsOem;
        obj.packageDescription = vm.packageDescription;
        obj.percentDiscount = vm.percentDiscount;
        obj.percentDiscountOem = vm.percentDiscountOem;
        obj.publishToWeb = vm.publishToWeb;
        obj.rate = vm.rate;
        obj.rateOem = vm.rateOem;
        obj.sfid = vm.sfid;
        obj.currentElectricityRate = vm.currentElectricityRate;

        return obj;
    }

    private getPackage() {
        this.pro.getPackage().subscribe((rsp: any) => {
            if (rsp.callstatus === "success") {
                this.listPlan = rsp.result.data
                //console.log(this.listPlan);
                this.getData();

                setTimeout(function () {
                    //Calculator Max Height
                    let eSaveHeightDiscount = document.getElementById("eSaveHeightDiscount").offsetHeight;
                    let eFixHeightDiscount = document.getElementById("eFixHeightDiscount").offsetHeight;
                    let eQPlusHeightDiscount = document.getElementById("eQPlusHeightDiscount").offsetHeight;
                    this.heightDiscount = Math.max(eSaveHeightDiscount, eFixHeightDiscount, eQPlusHeightDiscount);

                    document.getElementById("eSaveHeightDiscount").style.height = this.heightDiscount + "px";
                    document.getElementById("eFixHeightDiscount").style.height = this.heightDiscount + "px";
                    document.getElementById("eQPlusHeightDiscount").style.height = this.heightDiscount + "px";

                    let eSaveHeightDes = document.getElementById("eSaveHeightDes").offsetHeight;
                    let eFixHeightDes = document.getElementById("eFixHeightDes").offsetHeight;
                    let eQPlusHeightDes = document.getElementById("eQPlusHeightDes").offsetHeight;
                    this.heightDes = Math.max(eSaveHeightDes, eFixHeightDes, eQPlusHeightDes);

                    document.getElementById("eSaveHeightDes").style.height = this.heightDes + "px";
                    document.getElementById("eFixHeightDes").style.height = this.heightDes + "px";
                    document.getElementById("eQPlusHeightDes").style.height = this.heightDes + "px";
                }, 500);
            }
            else {
            }
        }, err => this.pro.handleError(err));
    }

    private getData() {
        let x = this.listPlan.find(x => x.name === this.vmESAVE.name);
        this.vmESAVE = {
            name: x.name,
            nightRateDollars: x.nightRateDollarsOem ? x.nightRateDollarsOem : 0,
            nightRateDollarsOem: x.nightRateDollarsOem ? x.nightRateDollarsOem : 0,
            packageDescription: x.packageDescription,
            percentDiscount: x.percentDiscount ? x.percentDiscount : 0,
            percentDiscountOem: x.percentDiscountOem ? x.percentDiscountOem : 0,
            publishToWeb: x.publishToWeb,
            rate: x.rate ? x.rate : 0,
            rateOem: x.rateOem ? x.rateOem : 0,
            sfid: x.sfid,
            currentElectricityRate: x.currentElectricityRate
        }
        //console.log(this.vmESAVE);

        x = this.listPlan.find(x => x.name === this.vmEFIX.name);
        this.vmEFIX = {
            name: x.name,
            nightRateDollars: x.nightRateDollarsOem ? x.nightRateDollarsOem : 0,
            nightRateDollarsOem: x.nightRateDollarsOem ? x.nightRateDollarsOem : 0,
            packageDescription: x.packageDescription,
            percentDiscount: x.percentDiscount ? x.percentDiscount : 0,
            percentDiscountOem: x.percentDiscountOem ? x.percentDiscountOem : 0,
            publishToWeb: x.publishToWeb,
            rate: x.rate ? x.rate : 0,
            rateOem: x.rateOem ? x.rateOem : 0,
            sfid: x.sfid,
            currentElectricityRate: x.currentElectricityRate
        }
        //console.log(this.vmEFIX);

        x = this.listPlan.find(x => x.name === this.vmEQPlus.name);
        this.vmEQPlus = {
            name: x.name,
            nightRateDollars: x.nightRateDollarsOem ? x.nightRateDollarsOem : 0,
            nightRateDollarsOem: x.nightRateDollarsOem ? x.nightRateDollarsOem : 0,
            packageDescription: x.packageDescription,
            percentDiscount: x.percentDiscount ? x.percentDiscount : 0,
            percentDiscountOem: x.percentDiscountOem ? x.percentDiscountOem : 0,
            publishToWeb: x.publishToWeb,
            rate: x.rate ? x.rate : 0,
            rateOem: x.rateOem ? x.rateOem : 0,
            sfid: x.sfid,
            currentElectricityRate: x.currentElectricityRate
        }
        //console.log(this.vmEQPlus);
    }

    public calHelpMeRecommend() {
        let tmp = this.listQuestion;
        let a = "a";
        let b = "b";
        if (tmp) {
            //refresh when placing the new featured plan
            this.flagPCSavingEFix = false;
            this.flagPCSavingESave = false;
            this.flagPCSavingEQPlus = false;

            if (tmp.q1 == a) {
                //eQ+
                this.flagPCSavingEQPlus = true;
                this.flagPCSavingEFix = false;
                this.flagPCSavingESave = false;

                document.getElementById("eQPlusDiv").focus();
            }
            else if ((tmp.q2 == a && tmp.q3 == a) || (tmp.q2 == b && tmp.q3 == a)) {
                //eFIX
                this.flagPCSavingEQPlus = false;
                this.flagPCSavingEFix = true;
                this.flagPCSavingESave = false;

                document.getElementById("eFixDiv").focus();
            }
            else if ((tmp.q2 == b && tmp.q3 == b) || (tmp.q2 == a && tmp.q3 == b)) {
                //eSave
                this.flagPCSavingEQPlus = false;
                this.flagPCSavingEFix = false;
                this.flagPCSavingESave = true;

                document.getElementById("eSaveDiv").focus();
            }
        }
    }

    public helpMeRecommendClicked() {
        this.listQuestion = {
            "q1": "",
            "q2": "",
            "q3": ""
        };
    }
}