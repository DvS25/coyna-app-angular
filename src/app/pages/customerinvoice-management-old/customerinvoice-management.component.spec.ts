import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinvoiceComponent } from './customerinvoice-management.component';

describe('CustomerinvoiceComponent', () => {
  let component: CustomerinvoiceComponent;
  let fixture: ComponentFixture<CustomerinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerinvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
