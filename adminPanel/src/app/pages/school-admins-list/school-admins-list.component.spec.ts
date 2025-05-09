import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminsListComponent } from './school-admins-list.component';

describe('SchoolAdminsListComponent', () => {
  let component: SchoolAdminsListComponent;
  let fixture: ComponentFixture<SchoolAdminsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolAdminsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolAdminsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
