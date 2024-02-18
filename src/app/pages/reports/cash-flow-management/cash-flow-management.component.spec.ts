import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowManagementComponent } from './cash-flow-management.component';

describe('CashFlowManagementComponent', () => {
  let component: CashFlowManagementComponent;
  let fixture: ComponentFixture<CashFlowManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
