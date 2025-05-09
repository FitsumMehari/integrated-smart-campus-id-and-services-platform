import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolNoticesListComponent } from './school-notices-list.component';

describe('SchoolNoticesListComponent', () => {
  let component: SchoolNoticesListComponent;
  let fixture: ComponentFixture<SchoolNoticesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolNoticesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolNoticesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
