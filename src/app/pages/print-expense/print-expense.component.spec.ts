import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintExpenseComponent } from './print-expense.component';

describe('vendor-expense', () => {
  let component: PrintExpenseComponent;
  let fixture: ComponentFixture<PrintExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
