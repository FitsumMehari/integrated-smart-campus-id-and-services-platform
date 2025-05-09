import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarStudentsListComponent } from './registrar-students-list.component';

describe('RegistrarStudentsListComponent', () => {
  let component: RegistrarStudentsListComponent;
  let fixture: ComponentFixture<RegistrarStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarStudentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
