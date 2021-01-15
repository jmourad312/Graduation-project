import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteitemComponent } from './favoriteitem.component';

describe('FavoriteitemComponent', () => {
  let component: FavoriteitemComponent;
  let fixture: ComponentFixture<FavoriteitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
