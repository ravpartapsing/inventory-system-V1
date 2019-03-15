import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }
  public showNavs:any=false;

  setShowNavs(s:boolean){
  	//alert("show")
  	this.showNavs=s;
  	console.log(this.showNavs)
  }

  isShowNav(){
  	return this.showNavs;
  }

}
