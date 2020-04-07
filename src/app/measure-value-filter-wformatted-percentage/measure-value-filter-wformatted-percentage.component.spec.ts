import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureValueFilterWFormattedPercentageComponent } from './measure-value-filter-wformatted-percentage.component';

describe('MeasureValueFilterWFormattedPercentageComponent', () => {
  let component: MeasureValueFilterWFormattedPercentageComponent;
  let fixture: ComponentFixture<MeasureValueFilterWFormattedPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureValueFilterWFormattedPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureValueFilterWFormattedPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
