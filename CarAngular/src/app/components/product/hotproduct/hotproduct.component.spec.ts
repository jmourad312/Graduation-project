import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotproductComponent } from './hotproduct.component';

describe('HotproductComponent', () => {
  let component: HotproductComponent;
  let fixture: ComponentFixture<HotproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
