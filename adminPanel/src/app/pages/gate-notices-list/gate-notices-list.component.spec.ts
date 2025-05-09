import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateNoticesListComponent } from './gate-notices-list.component';

describe('GateNoticesListComponent', () => {
  let component: GateNoticesListComponent;
  let fixture: ComponentFixture<GateNoticesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GateNoticesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateNoticesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
