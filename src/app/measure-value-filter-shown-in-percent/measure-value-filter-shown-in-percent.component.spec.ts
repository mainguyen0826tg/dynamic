import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureValueFilterShownInPercentComponent } from './measure-value-filter-shown-in-percent.component';

describe('MeasureValueFilterShownInPercentComponent', () => {
  let component: MeasureValueFilterShownInPercentComponent;
  let fixture: ComponentFixture<MeasureValueFilterShownInPercentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureValueFilterShownInPercentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureValueFilterShownInPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
