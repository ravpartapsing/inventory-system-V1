import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-listmylabs',
  templateUrl: './listmylabs.component.html',
  styleUrls: ['./listmylabs.component.css']
})
export class ListmylabsComponent implements OnInit {

 
constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }

  labList:any=[];
  users
  ngOnInit() {
  	this.users=JSON.parse(localStorage.getItem('user'));
  	
	         
	          	this.http.post("http://localhost:3000/getLabByUser",{_id:this.users._id}).subscribe((resp)=>{
			      this.csf.setShowNavs(true)
			       if(resp['status']==true){
			          this.labList=resp['data'].map((i)=>{
			          	i.name=this.users.email;
			          	return i;
			         });
			          console.log(this.labList)
			       }else{
			          alert(resp['err']);
			       }
			   })
	        
  	
  }

}
