import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOfCatagoryComponent } from './detail-of-catagory.component';

describe('DetailOfCatagoryComponent', () => {
  let component: DetailOfCatagoryComponent;
  let fixture: ComponentFixture<DetailOfCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOfCatagoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOfCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
