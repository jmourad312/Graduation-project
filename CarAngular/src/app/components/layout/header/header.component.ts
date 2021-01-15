import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  IsMenuOpen = true;
  CarBrand = ['BMW', 'Fiat', 'Honda', 'Mercedes', 'Mazda', 'KIA', 'Alfa', 'Audi', 'BYD', 'Chevrolet', 'Citroen', 'Ford', 'Hyundai', 'Jeep', 'Land-Rover', 'Mitsubishi', 'Opel', 'Peugeot', 'Porche', 'Renault', 'Skoda', 'Subaru', 'Suzuki', 'Toyota', 'Volvo'];
  selectedCarBrand: any;
  CarModel: [];
  selectedCarModel: any;
  CarPartName: [];

  constructor() { }

  ngOnInit(): void {
  }

  ToggleMenu(): boolean {
    this.IsMenuOpen = !this.IsMenuOpen;
    return this.IsMenuOpen;
}
}



