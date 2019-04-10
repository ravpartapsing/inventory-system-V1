import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {CommonService} from "../common.service"
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css']
})
export class DetailItemComponent implements OnInit {

   constructor(private csf:CommonService,private http:HttpClient ,private rt:Router, private at: ActivatedRoute) {
     this.csf.setShowNavs(true)
   }

  
  labcode;
  dataToInit = {};
  ngOnInit() {
  	this.at.params.subscribe(async i => {
	      if (i.itmcode) {
       
        let data = { code: i.itmcode }
        let result = await this.http.post("http://localhost:3000/getItemByCode", data).toPromise()
        if (result['status'] == true) {
          
          console.log(result['data']);
          this.dataToInit = result['data']
         
        } else {
          this.rt.navigate(['/list-items'])
        }
    }
    })
  }


  delete(code){
   this.http.post("http://localhost:3000/deleteItem",{code:code}).subscribe((resp)=>{
       
       if(resp['status']==true){
          window.location.reload();

       }else{
          alert(resp['err']);
       }
   })
 }

}
