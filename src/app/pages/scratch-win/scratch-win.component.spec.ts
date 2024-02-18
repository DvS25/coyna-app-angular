import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchwinComponent } from './scratch-win.component';

describe('ScratchwinComponent', () => {
  let component: ScratchwinComponent;
  let fixture: ComponentFixture<ScratchwinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScratchwinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScratchwinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
