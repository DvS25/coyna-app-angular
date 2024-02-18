import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDepartmentComponent } from './sales-department.component';

describe('SalesDepartmentComponent', () => {
  let component: SalesDepartmentComponent;
  let fixture: ComponentFixture<SalesDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
