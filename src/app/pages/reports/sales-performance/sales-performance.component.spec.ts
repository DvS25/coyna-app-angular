import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerformanceComponent } from './sales-performance.component';

describe('SalesPerformanceComponent', () => {
  let component: SalesPerformanceComponent;
  let fixture: ComponentFixture<SalesPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
