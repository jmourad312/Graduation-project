import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() {
  }
  IsMenuOpen = true;
  CarBrand = ['BMW', 'Fiat', 'Honda', 'Mercedes', 'Mazda', 'KIA', 'Alfa', 'Audi', 'BYD', 'Chevrolet', 'Citroen', 'Ford', 'Hyundai', 'Jeep', 'Land-Rover', 'Mitsubishi', 'Opel', 'Peugeot', 'Porche', 'Renault', 'Skoda', 'Subaru', 'Suzuki', 'Toyota', 'Volvo'];
  selectedCarBrand: any;
  CarModel: [];
  selectedCarModel: any;
  CarPartName: [];
  ngOnInit(): void {
  }
  ToggleMenu(): boolean {
    this.IsMenuOpen = !this.IsMenuOpen;
    return this.IsMenuOpen;
  }
}
