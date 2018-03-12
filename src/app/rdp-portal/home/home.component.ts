import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, TooltipModule } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';

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

    public vmESAVE: any = {
        "currentElectricityRate": this.currentElectricityRate,
        "rate": 0,
        "nightRate": 0,
        "percentDiscount": 28,
    };
    public vmEFIX: any = {
        "currentElectricityRate": this.currentElectricityRate,
        "rate": 0.1507,
        "nightRate": 0,
        "percentDiscount": 0,
    };
    public vmEQPlus: any = {
        "currentElectricityRate": this.currentElectricityRate,
        "rate": 0.1508,
        "nightRate": 0.1358,
        "percentDiscount": 0,

    };

    constructor() {
    }

    ngOnInit() {
        this.listSlider = [
            {
                "imageName": "Slider1.jpg",
                "title": "Red Dot Power",
                "description": "No.1 independent electricity retailer in Singapore"
            },
            {
                "imageName": "Slider2.jpg",
                "title": "eSAVE",
                "description": "Assured savings on your bill every month"
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
    }

    CalculateClicked(form: NgForm) {
        if (form.valid) {
            this.vmESAVE = this.calcalateObject("eSave", this.vmESAVE.currentElectricityRate, this.vmESAVE.rate, this.vmESAVE.nightRate,
                this.vmESAVE.percentDiscount, this.entity.usage1, this.entity.usage2, this.entity.usage3);
            this.vmEFIX = this.calcalateObject("eFix", this.vmEFIX.currentElectricityRate, this.vmEFIX.rate, this.vmEFIX.nightRate,
                this.vmEFIX.percentDiscount, this.entity.usage1, this.entity.usage2, this.entity.usage3);
            this.vmEQPlus = this.calcalateObject("eQPlus", this.vmEQPlus.currentElectricityRate, this.vmEQPlus.rate, this.vmEQPlus.nightRate,
                this.vmEQPlus.percentDiscount, this.entity.usage1, this.entity.usage2, this.entity.usage3);

            let maxPCSaving = this.vmESAVE.percentSaving;
            this.flagPCSavingESave = true;
            if (this.vmEFIX.percentSaving > maxPCSaving) {
                maxPCSaving = this.vmEFIX.percentSaving;
                this.flagPCSavingEFix = true;
                this.flagPCSavingESave = false;
            }
            if (this.vmEQPlus.percentSaving > maxPCSaving) {
                maxPCSaving = this.vmEFIX.percentSaving;
                this.flagPCSavingEFix = false;
                this.flagPCSavingESave = false;
                this.flagPCSavingEQPlus = true;
            }
            this.FindOutSavingModal.hide();
            form.resetForm();
        }
    }

    private calcalateObject(type: string, currentElectricityRate: number,
        rate: number, nightRate: number,
        percentDiscount: number,
        usage1: number, usage2: number, usage3: number) {
        //newPlan =B2*(100-E2)%
        let newPlan = currentElectricityRate * (100 - percentDiscount) / 100;
        let avg = (usage1 + usage2 + usage3) / 3;

        //existingCode =B2*AVERAGE(F2,G2,H2)*12
        let existingCost = currentElectricityRate * avg * 12;

        if (type == "eFix") {
            newPlan = rate;
        }
        if (type == "eQPlus") {
            newPlan = 0;
        }
        //NewPlanCost =I2*AVERAGE(F2,G2,H2)*12
        let newPlanCost = newPlan * avg * 12;
        //=SUM(C4*(AVERAGE(F4,G4,H4)*36%)*12,D4*(AVERAGE(F4,G4,H4)*64%)*12)
        if (type == "eQPlus") {
            let a1 = rate * avg * (36 / 100) * 12;
            let a2 = nightRate * avg * (64 / 100) * 12;
            newPlanCost = a1 + a2;
        }
        //saving =J2-K2
        let saving = existingCost - newPlanCost;
        //%Saving =L2/J2*100
        let percentSaving = saving / existingCost * 100;
        if (type == "eQPlus") {
            newPlan = rate;
        }
        if (type == "eFix") {
            newPlan = 0;
        }
        let obj: any = {
            "currentElectricityRate": currentElectricityRate,
            "rate": rate,
            "nightRate": nightRate,
            "percentDiscount": percentDiscount
        };
        obj.existingCost = existingCost;
        obj.newPlanCost = newPlanCost;
        obj.saving = saving;
        obj.percentSaving = percentSaving;
        return obj;
    }
}