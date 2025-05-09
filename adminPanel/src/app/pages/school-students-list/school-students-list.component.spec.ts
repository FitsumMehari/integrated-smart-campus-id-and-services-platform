import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentsListComponent } from './school-students-list.component';

describe('SchoolStudentsListComponent', () => {
  let component: SchoolStudentsListComponent;
  let fixture: ComponentFixture<SchoolStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolStudentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
