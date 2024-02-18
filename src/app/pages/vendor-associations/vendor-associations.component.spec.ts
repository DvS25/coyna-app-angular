import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAssociationsComponent } from './vendor-associations.component';

describe('VendorAssociationsComponent', () => {
  let component: VendorAssociationsComponent;
  let fixture: ComponentFixture<VendorAssociationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAssociationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
