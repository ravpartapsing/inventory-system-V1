import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadFormComponent} from './load-form/load-form.component'
import { RouterModule, Routes } from '@angular/router';

import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUpdateItemComponent } from './add-update-item/add-update-item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListLabsComponent } from './list-labs/list-labs.component';
import { AddUpdateLabComponent } from './add-update-lab/add-update-lab.component';

import { AssignItemComponent } from './assign-item/assign-item.component'
const routes: Routes = [
  { path: 'loadForm', component: LoadFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-items', component: AddUpdateItemComponent },
   { path: 'list-items', component: ListItemsComponent },
  { path: 'list-labs', component: ListLabsComponent },
  { path: 'add-lab', component: AddUpdateLabComponent },
   { path: 'jsontool', component: FormGeneratorComponent },
   { path: 'assign-item', component: AssignItemComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
