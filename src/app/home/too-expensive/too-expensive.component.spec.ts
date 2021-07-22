import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooExpensiveComponent } from './too-expensive.component';

describe('TooExpensiveComponent', () => {
  let component: TooExpensiveComponent;
  let fixture: ComponentFixture<TooExpensiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooExpensiveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooExpensiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
