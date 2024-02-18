import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExpenseIncomeRegistersComponent } from './get-expense-income-registers.component';

describe('GetExpenseIncomeRegistersComponent', () => {
  let component: GetExpenseIncomeRegistersComponent;
  let fixture: ComponentFixture<GetExpenseIncomeRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetExpenseIncomeRegistersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetExpenseIncomeRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
