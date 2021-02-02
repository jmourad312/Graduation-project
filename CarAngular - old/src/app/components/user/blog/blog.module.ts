import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'add',component:AddComponent},
  {path:'list',component:ListComponent},
  {path:'details',component:DetailsComponent},
  {path:'edit',component:EditComponent},

  ];

@NgModule({
  declarations: [AddComponent, ListComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class BlogModule { }
