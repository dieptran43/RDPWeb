import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendPlanComponent } from './recomend-plan.component';

describe('RecomendPlanComponent', () => {
  let component: RecomendPlanComponent;
  let fixture: ComponentFixture<RecomendPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
