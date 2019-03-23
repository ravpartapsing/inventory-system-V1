import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenave',
  templateUrl: './sidenave.component.html',
  styleUrls: ['./sidenave.component.css']
})
export class SidenaveComponent implements OnInit {

  constructor() { }
  user
  ngOnInit() {
  	this.user=JSON.parse(localStorage.getItem('user'));
  	//console.log(this.user,"========")
  }

}
