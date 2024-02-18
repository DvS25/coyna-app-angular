import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydComponent } from './company-detail.component';

describe('CompanydComponent', () => {
  let component: CompanydComponent;
  let fixture: ComponentFixture<CompanydComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanydComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
