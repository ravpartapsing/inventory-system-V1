import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders, } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-processorder',
  templateUrl: './processorder.component.html',
  styleUrls: ['./processorder.component.css']
})
export class ProcessorderComponent implements OnInit {
	orderId;
	orderItems:any=[];
	order;
   constructor(private csf:CommonService,private http:HttpClient ,private rt:Router,private at:ActivatedRoute) {
     this.csf.setShowNavs(true)
     at.params.subscribe(i=>{
     	this.orderId=i.id;
     })
   }

   itemList:any=[];
  ngOnInit() {
  	this.http.post("http://localhost:3000/getorderbyid",{_id:this.orderId}).subscribe((resp)=>{
  		console.log(resp)
  		this.order=resp['data'];
  		this.orderItems=this.order.itmes;
  		this.http.post("http://localhost:3000/getallitems",{}).subscribe((resp)=>{
	      this.csf.setShowNavs(true)
	       if(resp['status']==true){
	          this.itemList=resp['data'];
	          this.orderItems=this.orderItems.filter((i)=>{
	          	let itm=this.itemList.filter(j=>j._id==i._id)
	          	if(itm.length>0){
	          		i.max=itm[0].quantity;
	          		i.code=itm[0].code
	          	}else{
	          	    i.max=0;
	          	}
	          	return i
	          })
	          console.log(this.orderItems,"=============")
	       }else{
	          alert(resp['err']);
	       }
	   })

  	})

  }



  save(){
  	
    this.orderItems.map((i)=>{
      this.http.post("http://localhost:3000/getlabmap",{_id:this.order.lab,itm:i._id}).subscribe((resp)=>{

       let itminlab=resp['data'];
       
    	let data ={
    		itmes:i._id,
    		lab:this.order.lab,
    		itmcount:i.count,
    		code:i.code,
    		max:i.max
    	}
    	let data2 ={
    		itmes:i._id,
    		lab:this.order.lab,
    		itmcount:(itminlab.length>0)?parseInt(i.count)+itminlab[0].itmcount:i.count
    	}

      

    	this.http.post("http://localhost:3000/addlabmap",data2).subscribe((resp)=>{
    		if(resp['status']==true){
      			let itm={_id:data.itmes,code:data.code,quantity:(parseInt(data.max)-parseInt(data.itmcount))}
      			//itm.quantity=parseInt(itm.quantity)-parseInt(data.itmcount)
      			this.http.post("http://localhost:3000/updateitem",itm).subscribe((resp)=>{});
      		}
      		
    	})
    });
    })
    this.http.post("http://localhost:3000/deleteorder",{_id:this.order._id}).subscribe((resp)=>{
    	this.rt.navigate(['/orders'])
    })
  }

  delete(){
  	this.http.post("http://localhost:3000/deleteorder",{_id:this.order._id}).subscribe((resp)=>{
    	this.rt.navigate(['/orders'])
    })
  }



}
