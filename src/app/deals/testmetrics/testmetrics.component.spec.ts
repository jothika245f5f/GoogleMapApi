import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmetricsComponent } from './testmetrics.component';

describe('TestmetricsComponent', () => {
  let component: TestmetricsComponent;
  let fixture: ComponentFixture<TestmetricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestmetricsComponent]
    });
    fixture = TestBed.createComponent(TestmetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
