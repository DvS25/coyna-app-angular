import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredComponent } from './store-detail.component';

describe('StoredComponent', () => {
  let component: StoredComponent;
  let fixture: ComponentFixture<StoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
