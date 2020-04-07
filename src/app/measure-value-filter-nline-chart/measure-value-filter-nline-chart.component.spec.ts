import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureValueFilterNLineChartComponent } from './measure-value-filter-nline-chart.component';

describe('MeasureValueFilterNLineChartComponent', () => {
  let component: MeasureValueFilterNLineChartComponent;
  let fixture: ComponentFixture<MeasureValueFilterNLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureValueFilterNLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureValueFilterNLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
