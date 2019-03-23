import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css']
})
export class ListorderComponent implements OnInit {

   constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }

  labList:any=[];
  users
  orderlist:any=[];
  ngOnInit() {
  	this.http.post("http://localhost:3000/getAllLabs",{}).subscribe((resp)=>{
      this.csf.setShowNavs(true)
       if(resp['status']==true){
          this.labList=resp['data']
          console.log(this.labList)
          this.http.post("http://localhost:3000/getallorders",{}).subscribe((resp)=>{
          	this.orderlist=resp['data'].filter(i=>{

          		let chk=this.labList.filter(j=>j._id==i.lab)

          		if(chk.length>0){
          			i.labname=chk[0].labname
          			return i;
          		}

          	})
          	console.log(this.orderlist);
          });
       }else{
          alert(resp['err']);
       }
   })
  }

}
