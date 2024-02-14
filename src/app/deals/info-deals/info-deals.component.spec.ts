import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDealsComponent } from './info-deals.component';

describe('InfoDealsComponent', () => {
  let component: InfoDealsComponent;
  let fixture: ComponentFixture<InfoDealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDealsComponent]
    });
    fixture = TestBed.createComponent(InfoDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
