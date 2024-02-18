import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAssociationsComponent } from './customer-associations.component';

describe('CustomerAssociationsComponent', () => {
  let component: CustomerAssociationsComponent;
  let fixture: ComponentFixture<CustomerAssociationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAssociationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
