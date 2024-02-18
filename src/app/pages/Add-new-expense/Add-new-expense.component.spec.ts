import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewExpenseComponent } from './Add-new-expense.component';

describe('vendor-expense', () => {
  let component: AddNewExpenseComponent;
  let fixture: ComponentFixture<AddNewExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
