import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealscComponent } from './deals.component';

describe('DealscComponent', () => {
  let component: DealscComponent;
  let fixture: ComponentFixture<DealscComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealscComponent]
    });
    fixture = TestBed.createComponent(DealscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
