import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureValueFilterPercentageDropdownComponent } from './measure-value-filter-percentage-dropdown.component';

describe('MeasureValueFilterPercentageDropdownComponent', () => {
  let component: MeasureValueFilterPercentageDropdownComponent;
  let fixture: ComponentFixture<MeasureValueFilterPercentageDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureValueFilterPercentageDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureValueFilterPercentageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
