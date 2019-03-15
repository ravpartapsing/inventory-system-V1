import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

 constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }

  itemList:any=[];

  ngOnInit() {
  	this.http.post("http://localhost:3000/getallitems",{}).subscribe((resp)=>{
      this.csf.setShowNavs(true)
       if(resp['status']==true){
          this.itemList=resp['data'];
       }else{
          alert(resp['err']);
       }
   })
  }

}
