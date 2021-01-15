import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-restpassword',
  templateUrl: './restpassword.component.html',
  styleUrls: ['./restpassword.component.scss']
})
export class RestpasswordComponent implements OnInit {

  ngAfterViewInit() {

    $(".btn").on("click", function () {
      $(".container").stop().addClass("active");
    });

    $(".close").on("click", function () {
      $(".container").stop().removeClass("active");
    });
  }
  constructor() { }

  ngOnInit(): void {
  }

}
