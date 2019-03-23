import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-topnave',
  templateUrl: './topnave.component.html',
  styleUrls: ['./topnave.component.css']
})
export class TopnaveComponent implements OnInit {

  constructor(private rt:Router) { }

  ngOnInit() {
  }

  logout(){
  	localStorage.removeItem('user');
  	this.rt.navigate(['/'])
  }
}
