import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-list-labs',
  templateUrl: './list-labs.component.html',
  styleUrls: ['./list-labs.component.css']
})
export class ListLabsComponent implements OnInit {

  constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }

  labList:any=[];
  users
  ngOnInit() {

  	this.http.get("http://localhost:3000/listUser").subscribe((resp)=>{
      
	       if(resp['status']==true){
	          this.users=resp['data'];
	          	this.http.post("http://localhost:3000/getAllLabs",{}).subscribe((resp)=>{
			      this.csf.setShowNavs(true)
			       if(resp['status']==true){
			          this.labList=resp['data'].map((i)=>{
			          	for(let j=0;j<this.users.length; j++){
			          		if(this.users[j]._id==i.instructor){
			          			i.name=this.users[j].email;
			          			break;
			          		}
			          	}
			          	return i;
			         });
			          console.log(this.labList)
			       }else{
			          alert(resp['err']);
			       }
			   })
	          
	       }else{
	          alert(resp['err']);
	          console.log(resp)
	       }
	   })
  	
  }


  delete(code){
   this.http.post("http://localhost:3000/deletelab",{code:code}).subscribe((resp)=>{
       
       if(resp['status']==true){
          window.location.reload();

       }else{
          alert(resp['err']);
       }
   })
 }


}
