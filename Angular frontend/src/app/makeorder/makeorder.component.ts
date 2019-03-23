import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
 
@Component({
  selector: 'app-makeorder',
  templateUrl: './makeorder.component.html',
  styleUrls: ['./makeorder.component.css']
})
export class MakeorderComponent implements OnInit {

  constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }
    user
    items=[];
    labs=[]
    chitem=[];
    valitem=[];
    chlab=[]
    vallab=[]
    itmcount={}
    lab=null;
    itemSelected=null;
    orderItems=[];
  	ngOnInit() {
  		this.user=JSON.parse(localStorage.getItem('user'));
  		this.http.post("http://localhost:3000/getLabByUser",{_id:this.user._id}).subscribe((resp)=>{
  		//this.http.get("http://localhost:3000/listUser").subscribe((resp)=>{
  			 if(resp['status']==true){
	          this.labs=resp['data'];
	          this.labs.map((i)=>{
	          	this.vallab.push(i._id)
	          	this.chlab.push(i.labname)
	          })
	          	this.http.post("http://localhost:3000/getallitems",{}).subscribe((resp)=>{
	          		this.items=resp['data'];
	          		this.items.map((i)=>{
		          	this.valitem.push(i._id)
		          	this.chitem.push(i.name)
		          	this.itmcount[i._id]=i.quantity
	          })

	          	});
		       }else{
		          alert(resp['err']);
		          console.log(resp)
		       }
      	
	      
	   })
  	}

   addItem(){
     if(this.itemSelected!==null){
       let iArr=this.items.filter(i=>i._id==this.itemSelected)
       let chk=this.orderItems.filter(i=>i._id==this.itemSelected)
       if(chk.length>0){
         alert('Already there Please increase count')
       }else{
        this.orderItems.push({name:iArr[0].name,_id:iArr[0]._id,count:1,max:iArr[0].quantity}); 
       }
       
     }
   }

   inc(j){
     if(this.orderItems[j].count<this.orderItems[j].max)
     this.orderItems[j].count++;
   }
   dec(j){
     if(this.orderItems[j].count>1)
     this.orderItems[j].count--;
   }

   makeOrder(){
     if(this.lab !=null && this.orderItems.length>0){
       let oi=this.orderItems.map(i=>{return {_id:i._id,count:i.count}})
       
       let data={
          itmes: oi,
          lab: this.lab
       }
       console.log(data)
       this.http.post("http://localhost:3000/addorder",data).subscribe((resp)=>{
            console.log(resp)
           if(resp['status']==true){
              this.rt.navigate(['/dashboard'])
           }else{
              alert(resp['err']);
              console.log(resp)
           }
           })
     }else{
       if(this.lab ==null){
         alert("please select lab");
       }else{
         alert("please Select Items")
       }

     }
   }

}
