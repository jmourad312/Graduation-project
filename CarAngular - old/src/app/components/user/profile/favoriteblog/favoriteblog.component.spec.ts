import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteblogComponent } from './favoriteblog.component';

describe('FavoriteblogComponent', () => {
  let component: FavoriteblogComponent;
  let fixture: ComponentFixture<FavoriteblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
