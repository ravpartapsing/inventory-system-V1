import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-update-lab',
  templateUrl: './add-update-lab.component.html',
  styleUrls: ['./add-update-lab.component.css']
})
export class AddUpdateLabComponent implements OnInit {

  constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }

    users;
    ch=[];
    val=[];
  	ngOnInit() {
  		this.http.get("http://localhost:3000/listUser").subscribe((resp)=>{
      
	       if(resp['status']==true){
	          this.users=resp['data'];
	          console.log(this.users)
	          this.users.map((i)=>{
	          	this.val.push(i._id)
	          	this.ch.push(i.email)
	          })
	       }else{
	          alert(resp['err']);
	          console.log(resp)
	       }
	   })
  	}


	labAddForm=[
	         {
	                  "type": "text",
	                  "name": "labname",
	                  "label": "Lab Name",
	                  "col": 12,
	                  "validation": {
	                           "required": true,
	                           "minlength": 3,
	                           "maxlength": 35,
	                           "regx": ""
	                  },
	                  "readonly": false,
	                  "relationWith": "",
	                  "requiredIf": []
	         },
         {
                  "type": "select",
                  "name": "instructor",
                  "label": "InchargeName",
                  "choices": this.ch,
                  "value": this.val,
                  "col": "12",
                  "validation": {
	                           "required": true
	                  },
         }
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
  		    this.http.post("http://localhost:3000/addlab",data).subscribe((resp)=>{
      
	       if(resp['status']==true){
	          this.rt.navigate(['/list-labs'])
	       }else{
	          alert(resp['err']);
	          console.log(resp)
	       }
	   })
	}
}



