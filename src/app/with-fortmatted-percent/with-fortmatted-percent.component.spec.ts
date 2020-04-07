import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithFortmattedPercentComponent } from './with-fortmatted-percent.component';

describe('WithFortmattedPercentComponent', () => {
  let component: WithFortmattedPercentComponent;
  let fixture: ComponentFixture<WithFortmattedPercentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithFortmattedPercentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithFortmattedPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
