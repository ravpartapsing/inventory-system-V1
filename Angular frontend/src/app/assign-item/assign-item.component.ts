import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
 
@Component({
  selector: 'app-assign-item',
  templateUrl: './assign-item.component.html',
  styleUrls: ['./assign-item.component.css']
})
export class AssignItemComponent implements OnInit {

   constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }

    items;
    labs
    chitem=[];
    valitem=[];
    chlab=[]
    vallab=[]
    itmcount={}
  	ngOnInit() {
  		this.http.post("http://localhost:3000/getAllLabs",{}).subscribe((resp)=>{
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




	labAddForm=[
         {
                  "type": "select",
                  "name": "lab",
                  "label": "Lab",
                  "choices": this.chlab,
                  "value": this.vallab,
                  "col": "12",
                  "validation": {
	                           "required": true
	                  },
         },
         {
                  "type": "select",
                  "name": "itmes",
                  "label": "Item",
                  "choices": this.chitem,
                  "value": this.valitem,
                  "col": "12",
                  "validation": {
	                           "required": true
	                  },
         },
         {
	                  "type": "text",
	                  "name": "itmcount",
	                  "label": "Quantity ",
	                  "col": 12,
	                  "validation": {
	                           "required": true,
	                           "minlength": 1,
	                           "maxlength": 10,
	                           "regx": "[0-9]+"
	                  },
	                  "readonly": false,
	                  "relationWith": "",
	                  "requiredIf": []
	         },
	]

	save(data){
	/*
	 name: "abcXyZ",
            price: "12.50",
            quantity: "50",
            company: "Dell",
            photo:"hphhphp"
	*/
   			data.logo="hphhphp"
   			console.log(data);
   			//data.photo="asdfasdf.jpg"
   			console.log(data.itmcount,"==================",this.itmcount[data.itmes])
   			console.log(this.itmcount,"=======",data.itmes)
   			if(data.itmcount<this.itmcount[data.itmes]){
   				this.http.post("http://localhost:3000/addlabmap",data).subscribe((resp)=>{
      	
      			
		       if(resp['status']==true){
		       	let itmA=this.items.filter((i)=>i._id==data.itmes)
      			let itm=itmA[0]
      			itm.quantity=parseInt(itm.quantity)-parseInt(data.itmcount)
      			this.http.post("http://localhost:3000/updateitem",itm).subscribe((resp)=>{

      			})

		          this.rt.navigate(['/dashboard'])
		       }else{
		          alert(resp['err']);
		          console.log(resp)
		       }
		   		})
   			}else{
   				alert("Please add Less than max count");
   			}
  		    
	}

}
