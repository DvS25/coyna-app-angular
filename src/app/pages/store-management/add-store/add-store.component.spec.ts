import { ComponentFixture, TestBed } from '@angular/core/testing';

// @ts-ignore
import { AStoremgntComponent } from './add-store.component';

describe('AStoremgntComponent', () => {
  let component: AStoremgntComponent;
  let fixture: ComponentFixture<AStoremgntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AStoremgntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AStoremgntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
