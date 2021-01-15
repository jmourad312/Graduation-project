import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';

const routes:Routes=[
  {path:'contactus',component:ContactusComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'privacy',component:PrivacyComponent},
  {path:'terms&contition',component:TermsandconditionComponent},
  {path:'vendor', component:VendorComponent}

  ];

@NgModule({
  declarations: [AboutusComponent, ContactusComponent, PrivacyComponent, TermsandconditionComponent, VendorComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class InfoModule { }
