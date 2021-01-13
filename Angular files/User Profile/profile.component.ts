import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  aboutMe = false;
  carDetails = true;
  comments = true;
  starsItem = true;
  ngOnInit(): void {
    };
    showAboutMe(){
      this.aboutMe = !this.aboutMe;
      this.carDetails = true;
      this.comments = true;
      this.starsItem = true;
    return this.aboutMe;
    }
    showCarDetails(){
      this.carDetails = !this.carDetails;
      this.aboutMe = true;
      this.comments = true;
      this.starsItem = true;
    return this.carDetails;
    }
    showComments(){
      this.comments = !this.comments;
      this.aboutMe = true;
      this.carDetails = true;
      this.starsItem = true;
    return this.comments;
    }
    showStarsItem(){
      this.starsItem = !this.starsItem;
      this.aboutMe = true;
      this.carDetails = true;
      this.comments = true;
    return this.starsItem;
    }
  }

