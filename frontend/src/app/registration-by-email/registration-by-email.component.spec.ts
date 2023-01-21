import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationByEmailComponent } from './registration-by-email.component';

describe('RegistrationByEmailComponent', () => {
  let component: RegistrationByEmailComponent;
  let fixture: ComponentFixture<RegistrationByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationByEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
