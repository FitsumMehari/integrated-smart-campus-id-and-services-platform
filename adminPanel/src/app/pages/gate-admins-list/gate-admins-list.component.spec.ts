import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateAdminsListComponent } from './gate-admins-list.component';

describe('GateAdminsListComponent', () => {
  let component: GateAdminsListComponent;
  let fixture: ComponentFixture<GateAdminsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GateAdminsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateAdminsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
