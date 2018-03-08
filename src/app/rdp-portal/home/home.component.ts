import { Component, OnInit } from '@angular/core';
import { ModalDirective, TooltipModule } from 'ngx-bootstrap';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public listSlider: any[] = [];
    
    constructor() {
        
     }


    ngOnInit() {

        this.listSlider = [
            {
                "imageName": "Slider1.jpg",
                "title" : "Red Dot Power",
                "description": "No.1 independent electricity retailer in Singapore"
            },
            {
                "imageName": "Slider2.jpg",
                "title" : "eSAVE",
                "description": "Assured savings on your bill every month"
            },
            {
                "imageName": "Slider3.jpg",
                "title" : "eFIX",
                "description": ""
            },
            {
                "imageName": "Slider4.jpg",
                "title" : "eQ",
                "description": ""
            }
        ];
     }
}