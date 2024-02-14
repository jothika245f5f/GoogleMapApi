import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketdetComponent } from './marketdet.component';

describe('MarketdetComponent', () => {
  let component: MarketdetComponent;
  let fixture: ComponentFixture<MarketdetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketdetComponent]
    });
    fixture = TestBed.createComponent(MarketdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
