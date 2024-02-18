import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndcollComponent } from './individual-collection.component';

describe('IndcollComponent', () => {
  let component: IndcollComponent;
  let fixture: ComponentFixture<IndcollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndcollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndcollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
