import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDepartmentComponent } from './get-department.component';

describe('GetDepartmentComponent', () => {
  let component: GetDepartmentComponent;
  let fixture: ComponentFixture<GetDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
