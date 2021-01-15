import { listLazyRoutes, parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';

const routes: Routes = [
  {
    path:'user/auth', 
    component:HeaderComponent,
    loadChildren:() => import ('./components/user/authentication/authentication.module').then(m=>m.AuthenticationModule)
  },

  {
    path:'product',
    component:HeaderComponent, 
    loadChildren:() => import ('./components/product/product.module').then(m=>m.ProductModule)
  },

  {
    path:'user/blog', 
    component:HeaderComponent,
    loadChildren:() => import ('./components/user/blog/blog.module').then(m=>m.BlogModule)
  },

  {
    path:'user/profile', 
    component:HeaderComponent,
    loadChildren:() => import ('./components/user/profile/profile.module').then(m=>m.ProfileModule)
  },

  {
    path:'', 
    component:HeaderComponent,
    loadChildren:() => import ('./components/user/profile/profile.module').then(m=>m.ProfileModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
