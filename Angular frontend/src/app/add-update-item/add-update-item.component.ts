import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { CommonService } from "../common.service"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.css']
})
export class AddUpdateItemComponent implements OnInit {

  showform = false;
  constructor(private csf: CommonService, private http: HttpClient, private rt: Router, private at: ActivatedRoute) {
    this.csf.setShowNavs(true)
  }

  isUpdate = false
  itmcode;
  dataToInit = {};
  ngOnInit() {
    this.csf.setShowNavs(true)
    this.at.params.subscribe(async i => {
      if (i.itmcode) {
        this.isUpdate = true;
        this.itmcode = i.itmcode
        let data = { code: i.itmcode }
        let result = await this.http.post("http://localhost:3000/getItemByCode", data).toPromise()
        if (result['status'] == true) {
          this.showform = false
          console.log(result['data']);
          this.dataToInit = result['data']
          setTimeout(() => {
            this.showform = true;
          }, 50)

        } else {
          this.rt.navigate(['/list-items'])
        }
      } else {
        this.showform = true;
      }

    })
  }
  itemAddForm = [
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
    },
    {
      "type": "file",
      "name": "photo",
      "label": "Upload Image",
      "filetype": [
        "jpg",
        "png"
      ],
      "col": 12,
      "validation": {
        "required": true
      }
    }
  ]

  update(data) {
    /*
  
    {
              name: "abcXyZ",
              price: "12.50",
              code:"ITM-ASDF12345", //requried field  
              quantity: "50",
              company: "Dell",
              photo:"hphhphp"
            }
          */

    data.code = this.itmcode;

    this.http.post("http://localhost:3000/updateItem", data).subscribe((resp) => {

      if (resp['status'] == true) {
        this.rt.navigate(['/list-items'])
      } else {
        alert(resp['err']);
      }
    })
  }

  save(data) {
    /*
     name: "abcXyZ",
              price: "12.50",
              quantity: "50",
              company: "Dell",
              photo:"hphhphp"
    */
    //data.photo="hphhphp"
    console.log(data);
    //data.photo="asdfasdf.jpg"
    this.http.post("http://localhost:3000/addItem", data).subscribe((resp) => {

      if (resp['status'] == true) {
        this.rt.navigate(['/list-items'])
      } else {
        alert(resp['err']);
      }
    })
  }

}
