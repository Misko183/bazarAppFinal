import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailOfProductComponent } from './datail-of-product.component';

describe('DatailOfProductComponent', () => {
  let component: DatailOfProductComponent;
  let fixture: ComponentFixture<DatailOfProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatailOfProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
