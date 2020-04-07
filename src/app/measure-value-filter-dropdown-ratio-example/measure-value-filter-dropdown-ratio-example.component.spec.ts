import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureValueFilterDropdownRatioExampleComponent } from './measure-value-filter-dropdown-ratio-example.component';

describe('MeasureValueFilterDropdownRatioExampleComponent', () => {
  let component: MeasureValueFilterDropdownRatioExampleComponent;
  let fixture: ComponentFixture<MeasureValueFilterDropdownRatioExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureValueFilterDropdownRatioExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureValueFilterDropdownRatioExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
