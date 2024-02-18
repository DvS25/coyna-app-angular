import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpaymentComponent } from './customerpayment-processing.component';

describe('CustomerpaymentComponent', () => {
  let component: CustomerpaymentComponent;
  let fixture: ComponentFixture<CustomerpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
