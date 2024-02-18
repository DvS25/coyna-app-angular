import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPrintListComponent } from './print-vendor.component';

describe('vendor-expense', () => {
  let component: VendorPrintListComponent;
  let fixture: ComponentFixture<VendorPrintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPrintListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorPrintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
