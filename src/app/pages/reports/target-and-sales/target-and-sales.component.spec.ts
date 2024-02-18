import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAndSalesComponent } from './target-and-sales.component';

describe('TargetAndSalesComponent', () => {
  let component: TargetAndSalesComponent;
  let fixture: ComponentFixture<TargetAndSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAndSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetAndSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
