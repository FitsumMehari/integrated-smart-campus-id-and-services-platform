import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateMessagesListComponent } from './gate-messages-list.component';

describe('GateMessagesListComponent', () => {
  let component: GateMessagesListComponent;
  let fixture: ComponentFixture<GateMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GateMessagesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
