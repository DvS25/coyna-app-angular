import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerexpenseComponent } from './customerexpense-management.component';

describe('CustomerexpenseComponent', () => {
  let component: CustomerexpenseComponent;
  let fixture: ComponentFixture<CustomerexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerexpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
