import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinvoicedComponent } from './customerinvoice-detail.component';

describe('CustomerinvoicedComponent', () => {
  let component: CustomerinvoicedComponent;
  let fixture: ComponentFixture<CustomerinvoicedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerinvoicedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerinvoicedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
