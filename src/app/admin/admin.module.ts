import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from '../admin/admin.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ClientdetailsComponent } from './clientdetails/clientdetails.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent, UserdetailsComponent, ProductdetailsComponent, ClientdetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
