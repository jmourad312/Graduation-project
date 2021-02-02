import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HotproductComponent } from './hotproduct/hotproduct.component';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product/product.component';

const routes:Routes=[
  {path:'details',component:DetailsComponent},
  {path:'hotproduct',component:HotproductComponent},
  {path:'list',component:ListComponent},
  {path:'product',component:ProductComponent},
  {path:'',component:ProductComponent},


  ];

@NgModule({
  declarations: [DetailsComponent,HotproductComponent,ListComponent,ProductComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
