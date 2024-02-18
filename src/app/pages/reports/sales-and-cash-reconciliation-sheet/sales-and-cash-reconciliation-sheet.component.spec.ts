import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAndCashReconciliationSheetComponent } from './sales-and-cash-reconciliation-sheet.component';

describe('SalesAndCashReconciliationSheetComponent', () => {
  let component: SalesAndCashReconciliationSheetComponent;
  let fixture: ComponentFixture<SalesAndCashReconciliationSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAndCashReconciliationSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAndCashReconciliationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
