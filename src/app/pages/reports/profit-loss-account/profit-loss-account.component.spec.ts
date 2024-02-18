import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossAccountComponent } from './profit-loss-account.component';

describe('ProfitLossAccountComponent', () => {
  let component: ProfitLossAccountComponent;
  let fixture: ComponentFixture<ProfitLossAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitLossAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
