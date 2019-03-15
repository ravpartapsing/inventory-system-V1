import { Component, OnInit } from '@angular/core';
import {CommonService} from "../common.service"
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private csf:CommonService) { 
  	this.csf.setShowNavs(true)
  }

  ngOnInit() {
  }

}
