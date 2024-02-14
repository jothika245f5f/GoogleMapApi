import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatdialoComponent } from './matdialo.component';

describe('MatdialoComponent', () => {
  let component: MatdialoComponent;
  let fixture: ComponentFixture<MatdialoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatdialoComponent]
    });
    fixture = TestBed.createComponent(MatdialoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
