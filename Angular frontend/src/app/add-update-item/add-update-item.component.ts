import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.css']
})
export class AddUpdateItemComponent implements OnInit {

  constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(true)
   }


  ngOnInit() {
  	this.csf.setShowNavs(true)
  }
  itemAddForm=[
         {
                  "type": "text",
                  "name": "name",
                  "label": "Item Name",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 3,
                           "maxlength": 30,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "price",
                  "label": "Item Price",
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
         {
                  "type": "text",
                  "name": "company",
                  "label": "Company",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 2,
                           "maxlength": 30,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "number",
                  "name": "quantity",
                  "label": "Quantity",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 1,
                           "maxlength": 6,
                           "regx": "[0-9]+"
                  }
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
   data.photo="hphhphp"
   console.log(data);
   //data.photo="asdfasdf.jpg"
  this.http.post("http://localhost:3000/addItem",data).subscribe((resp)=>{
      
       if(resp['status']==true){
          this.rt.navigate(['/list-items'])
       }else{
          alert(resp['err']);
       }
   })
}

}
