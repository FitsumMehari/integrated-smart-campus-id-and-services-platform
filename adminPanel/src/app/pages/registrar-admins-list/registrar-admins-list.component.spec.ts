import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAdminsListComponent } from './registrar-admins-list.component';

describe('RegistrarAdminsListComponent', () => {
  let component: RegistrarAdminsListComponent;
  let fixture: ComponentFixture<RegistrarAdminsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarAdminsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAdminsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
