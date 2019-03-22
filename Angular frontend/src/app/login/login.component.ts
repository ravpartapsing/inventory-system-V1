import { Component, OnInit } from '@angular/core';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   
  constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) { 
  
  	csf.setShowNavs(false)
  	 this.http.get("http://localhost:3000/create-admin").subscribe((resp)=>{
  	 	console.log(resp)
  	 })
  }

   headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json', 
      'Access-Control-Allow-Origin': '*'
    }; 

  login=[
         {
                  "type": "text",
                  "name": "email",
                  "label": "Email",
                  "col": 12,
                  "validation": {
                           "required": false,
                           "minlength": 5,
                           "maxlength": 45,
                           "regx": "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "password",
                  "name": "password",
                  "label": "Password",
                  "col": 12,
                  "validation": {
                           "required": false,
                           "minlength": 5,
                           "maxlength": 35,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         }
]

  ngOnInit() {
  
 // this.csf.setShowNavs(false)

  }

save(data){
   console.log(data);
   this.http.post("http://localhost:3000/login",data).subscribe((resp)=>{
   	
      console.log(resp)

   	 if(resp['status']==true){
        if(resp['data'].email=="admin@gmail.com"){
          resp['data'].isadmin=true
        }
       localStorage.setItem("user",JSON.stringify(resp['data']))
   	 	this.rt.navigate(['/dashboard'])
   	 }else{
   	 	alert(resp['err']);
   	 }
   })
}


}
