import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMessagesListComponent } from './school-messages-list.component';

describe('SchoolMessagesListComponent', () => {
  let component: SchoolMessagesListComponent;
  let fixture: ComponentFixture<SchoolMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolMessagesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
