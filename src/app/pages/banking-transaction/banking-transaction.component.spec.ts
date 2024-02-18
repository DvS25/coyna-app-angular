import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingTransactionComponent } from './banking-transaction.component';

describe('BankingTransactionComponent', () => {
  let component: BankingTransactionComponent;
  let fixture: ComponentFixture<BankingTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
