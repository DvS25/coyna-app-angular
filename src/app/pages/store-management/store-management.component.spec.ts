import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoremgntComponent } from './store-management.component';

describe('StoremgntComponent', () => {
  let component: StoremgntComponent;
  let fixture: ComponentFixture<StoremgntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoremgntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoremgntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
