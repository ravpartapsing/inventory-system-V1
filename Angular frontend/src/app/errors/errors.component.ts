import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'errors',
  template: `
    <ul *ngIf="showErrors()">
      <li class="help-box text-danger" *ngFor="let error of errors()"><small>{{error}}</small></li>
    </ul>
  `,
})
export class ErrorsComponent {

  private   errorMessages = {
    'required': () => 'This field is required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + this.pattrenName(params.requiredPattern),
    'age': (params) => params.message,
    'validEmail': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  @Input()
  private formsubmitted: boolean;

  showErrors(): boolean {
    return this.control &&
      this.control.errors &&
      ((this.control.dirty || this.control.touched) || this.formsubmitted);
  }

  errors(): string[] {
  //  console.log(this.control.errors)
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {

    return this.errorMessages[type](params);
  }

  pattrenName(pattren){
    if(pattren=="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"){
      return "email pattern"
    }

   // ^[a-zA-Z]+$/////
    if(pattren=='^[a-zA-Z]+$'){
      return "A-Z or a-z pattern"
    }

     if(pattren=='^([a-zA-Z0-9@*#]{8,30})$'){
      return "does not match password patten"    } 


 if(pattren=='^[0-9]{8,10}$' ){
      return "Phone Number must be of 10 numerics only"
    } 

    if(pattren=='^[0-9]+$' ){
      return "Must be Number only"
    } 



    return pattren+"  pattren";
  }

}
