import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  tab:number = 3;
  
  ngAfterViewInit() {
    //tooltip
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  constructor() { }

  ngOnInit(): void {

  }

changeTap(tab:number){
  this.tab = tab;
}
}
