import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchhistoryComponent } from './searchhistory.component';

describe('SearchhistoryComponent', () => {
  let component: SearchhistoryComponent;
  let fixture: ComponentFixture<SearchhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
