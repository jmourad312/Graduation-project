import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteitemComponent } from './favoriteitem/favoriteitem.component';
import { FavoriteblogComponent } from './favoriteblog/favoriteblog.component';
import { SearchhistoryComponent } from './searchhistory/searchhistory.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:ProfileComponent},
  {path:'favoriteitem',component:FavoriteitemComponent},
  {path:'favoriteblog',component:FavoriteblogComponent},
  {path:'searchhistory',component:SearchhistoryComponent},
  {path:'edit',component:EditComponent},
  ];

@NgModule({
  declarations: [ProfileComponent, FavoriteitemComponent, FavoriteblogComponent, SearchhistoryComponent, EditComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
