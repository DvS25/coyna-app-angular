import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderEditComponent } from './sales-order-edit.component';

describe('SalesOrderEditComponent', () => {
  let component: SalesOrderEditComponent;
  let fixture: ComponentFixture<SalesOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOrderEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
