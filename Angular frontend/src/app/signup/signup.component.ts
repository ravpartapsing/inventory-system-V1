import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private csf:CommonService,private http:HttpClient ,private rt:Router) {
     this.csf.setShowNavs(false)
   }

  ngOnInit() {
  }
mainHeading="User Registration Form"
formJson=[
         {
                  "type": "text",
                  "name": "firstName",
                  "label": "First Name",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 3,
                           "maxlength": 15,
                           "regx": "[a-zA-Z]+"
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "lastName",
                  "label": "Last Name",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 3,
                           "maxlength": 20,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "email",
                  "label": "Email",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 4,
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
                           "required": true,
                           "minlength": 8,
                           "maxlength": 30,
                           "regx": "([a-zA-Z0-9@*#]{8,30})"
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "text",
                  "label": "Phone No",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 10,
                           "maxlength": 10,
                           "regx": "[0-9]{8,10}"
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         }
]

formJson2=[
         {
                  "type": "text",
                  "name": "labname",
                  "label": "Lab Name",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 3,
                           "maxlength": 35,
                           "regx": "[a-zA-Z]+"
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "Incharge Name",
                  "label": "InchargeName",
                  "col": 12,
                  "validation": {
                           "required": false,
                           "minlength": 3,
                           "maxlength": 5,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "labAssis",
                  "label": "Assistant",
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
         }
];

itemAddForm=[
         {
                  "type": "text",
                  "name": "iname",
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
                  "name": "iprice",
                  "label": "Item Price",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 3,
                           "maxlength": 5,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "text",
                  "label": "Category",
                  "col": 12,
                  "validation": {
                           "required": false,
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
                  "name": "number",
                  "label": "Quantity",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 1,
                           "maxlength": 6,
                           "regx": ""
                  }
         }
]


formjson6=[
         {
                  "type": "text",
                  "name": "iname",
                  "label": "Item Name",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 3,
                           "maxlength": 25,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "icode",
                  "label": "Item Code",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 3,
                           "maxlength": 15,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "number",
                  "name": "iprice",
                  "label": "Item Price",
                  "col": 6,
                  "validation": {
                           "required": true,
                           "minlength": 1,
                           "maxlength": 10,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "number",
                  "name": "quantity",
                  "label": "Item Quantity",
                  "col": 6,
                  "validation": {
                           "required": true,
                           "minlength": 1,
                           "maxlength": 15,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "ivendor",
                  "label": "Item Vendor",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 1,
                           "maxlength": 15,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "text",
                  "name": "icompany",
                  "label": "Item company",
                  "col": 12,
                  "validation": {
                           "required": true,
                           "minlength": 1,
                           "maxlength": 25,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "file",
                  "name": "iimage",
                  "label": "Item Image",
                  "filetype": [
                           "jpg",
                           "png"
                  ],
                  "col": 12,
                  "validation": {
                           "required": false
                  }
         }
]


login=[
         {
                  "type": "text",
                  "name": "text",
                  "label": "Email",
                  "col": 12,
                  "validation": {
                           "required": false,
                           "minlength": 5,
                           "maxlength": 5,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         },
         {
                  "type": "password",
                  "name": "text",
                  "label": "Password",
                  "col": 12,
                  "validation": {
                           "required": false,
                           "minlength": 5,
                           "maxlength": 5,
                           "regx": ""
                  },
                  "readonly": false,
                  "relationWith": "",
                  "requiredIf": []
         }
]

data={
   email: "email@gmail.com",
   fname: "attinderpal",
   lname: "Singh",
   password: "Admin123",
   text: "1234567890"
}





save(data){
   console.log(data);
   data.photo="asdfasdf.jpg"
  this.http.post("http://localhost:3000/signup",data).subscribe((resp)=>{
      
       if(resp['status']==true){
          localStorage.setItem('user',JSON.stringify(resp['data']))
          this.rt.navigate(['/dashboard'])
       }else{
          alert(resp['err']);
       }
   })
}
}
