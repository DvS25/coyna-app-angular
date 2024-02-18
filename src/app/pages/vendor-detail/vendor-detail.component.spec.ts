import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordComponent } from './vendor-detail.component';

describe('VendordComponent', () => {
  let component: VendordComponent;
  let fixture: ComponentFixture<VendordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
