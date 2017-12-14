import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparerrateComponent } from './comparerrate.component';

describe('ComparerrateComponent', () => {
  let component: ComparerrateComponent;
  let fixture: ComponentFixture<ComparerrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparerrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparerrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
