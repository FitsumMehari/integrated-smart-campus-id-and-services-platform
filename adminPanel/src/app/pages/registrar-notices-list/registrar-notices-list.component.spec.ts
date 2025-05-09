import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarNoticesListComponent } from './registrar-notices-list.component';

describe('RegistrarNoticesListComponent', () => {
  let component: RegistrarNoticesListComponent;
  let fixture: ComponentFixture<RegistrarNoticesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarNoticesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarNoticesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
