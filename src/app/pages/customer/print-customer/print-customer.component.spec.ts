import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCustomerComponent } from './print-customer.component';

describe('PrintCustomerComponent', () => {
  let component: PrintCustomerComponent;
  let fixture: ComponentFixture<PrintCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
