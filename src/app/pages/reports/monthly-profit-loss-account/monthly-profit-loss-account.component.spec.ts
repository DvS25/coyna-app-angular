import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyProfitLossAccountComponent } from './monthly-profit-loss-account.component';

describe('MonthlyProfitLossAccountComponent', () => {
  let component: MonthlyProfitLossAccountComponent;
  let fixture: ComponentFixture<MonthlyProfitLossAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyProfitLossAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyProfitLossAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
