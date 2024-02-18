import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorExpenseComponent } from './vendor-expense.component';

describe('vendor-expense', () => {
  let component: VendorExpenseComponent;
  let fixture: ComponentFixture<VendorExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
