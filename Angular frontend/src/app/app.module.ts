import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {MaterialModule} from './material.module';
import { ErrorsComponent } from './errors/errors.component';
import { AppComponent } from './app.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { LoadFormComponent } from './load-form/load-form.component';
import { AppRoutingModule } from './app-routing.module';
import { provideRoutes} from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUpdateItemComponent } from './add-update-item/add-update-item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListLabsComponent } from './list-labs/list-labs.component';
import { AddUpdateLabComponent } from './add-update-lab/add-update-lab.component';

import {CommonService} from "./common.service";
import { SidenaveComponent } from './sidenave/sidenave.component';
import { TopnaveComponent } from './topnave/topnave.component';
import { AssignItemComponent } from './assign-item/assign-item.component';
import { MakeorderComponent } from './makeorder/makeorder.component';
import { ProcessorderComponent } from './processorder/processorder.component';
import { ListorderComponent } from './listorder/listorder.component';
import { ListlabitemComponent } from './listlabitem/listlabitem.component';
import { ListmylabsComponent } from './listmylabs/listmylabs.component';
import { DetailItemComponent } from './detail-item/detail-item.component'
@NgModule({
  declarations: [
    AppComponent,
    ErrorsComponent,
    FormGeneratorComponent,
    LoadFormComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    AddUpdateItemComponent,
    ListItemsComponent,
    ListLabsComponent,
    AddUpdateLabComponent,
    SidenaveComponent,
    TopnaveComponent,
    AssignItemComponent,
    MakeorderComponent,
    ProcessorderComponent,
    ListorderComponent,
    ListlabitemComponent,
    ListmylabsComponent,
    DetailItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  //  MaterialModule,
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
