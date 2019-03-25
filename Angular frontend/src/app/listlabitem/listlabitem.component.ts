import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-listlabitem',
  templateUrl: './listlabitem.component.html',
  styleUrls: ['./listlabitem.component.css']
})
export class ListlabitemComponent implements OnInit {
  labid;
  constructor(private csf:CommonService,private http:HttpClient ,private rt:Router,private at:ActivatedRoute) {
     this.csf.setShowNavs(true)
      at.params.subscribe(i=>{
     	this.labid=i.id;
     })
   }


 labItemList:any=[];
  users
  itemList:any=[];
  labItemListtoShow:any=[];
  ngOnInit() {
  	this.users=JSON.parse(localStorage.getItem('user'));
  	
	         
	          	this.http.post("http://localhost:3000/getlabmapByCode",{_id:this.labid}).subscribe((resp)=>{
			      this.csf.setShowNavs(true)
			       if(resp['status']==true){
			       	this.labItemList=resp['data']
			         /* this.labItemList=resp['data'].map((i)=>{
			          	i.name=this.users.email;
			          	return i;
			         });*/

			         this.http.post("http://localhost:3000/getallitems",{}).subscribe((resp)=>{
					      this.csf.setShowNavs(true)
					       if(resp['status']==true){
					          this.itemList=resp['data'];
					          
					          this.labItemListtoShow=this.itemList.filter((i)=>{
					          	console.log(i)
					          	let aa;
						          	 aa=this.labItemList.filter((j)=>{
						          	 	//alert()
						          	 	//console.log(i._id,'==',j.itmes)
						          	 	//console.log(j)
							          	 	if(j.itmes==i._id){
							          	 		//console.log(i._id,'==',j.itmes)
							          	 		console.log(j)
							          	 		i.count=j.itmcount
							          	 		return j;
							          	 	}
						          	 	}
						          	 	);

						          	//return i;
						          	if(aa.length>0){
							           	return i
							        }
						         });

					           
					       }else{
					          alert(resp['err']);
					       }
					   })
			          console.log(this.labItemList)
			       }else{
			          alert(resp['err']);
			       }
			   })
	        
  	
  }

  /*mapItems(id,i){
  	this.http.post("http://localhost:3000/getlabmapByCode",{_id:this.labid}).subscribe((resp)=>{
			      this.csf.setShowNavs(true)
			       if(resp['status']==true){
			          this.labItemList=resp['data'].map((i)=>{
			          	i.name=this.users.email;
			          	return i;
			         });
			          console.log(this.labItemList)
			       }else{
			          alert(resp['err']);
			       }
			   })
  }*/
}
