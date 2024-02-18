import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GMAnalysisComponent } from './gmanalysis.component';

describe('GMAnalysisComponent', () => {
  let component: GMAnalysisComponent;
  let fixture: ComponentFixture<GMAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GMAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GMAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
