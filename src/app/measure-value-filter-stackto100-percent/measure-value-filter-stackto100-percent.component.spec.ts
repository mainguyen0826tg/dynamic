import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureValueFilterStackto100PercentComponent } from './measure-value-filter-stackto100-percent.component';

describe('MeasureValueFilterStackto100PercentComponent', () => {
  let component: MeasureValueFilterStackto100PercentComponent;
  let fixture: ComponentFixture<MeasureValueFilterStackto100PercentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureValueFilterStackto100PercentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureValueFilterStackto100PercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
