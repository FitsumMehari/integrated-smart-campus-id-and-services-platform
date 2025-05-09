import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMessagesListComponent } from './registrar-messages-list.component';

describe('RegistrarMessagesListComponent', () => {
  let component: RegistrarMessagesListComponent;
  let fixture: ComponentFixture<RegistrarMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarMessagesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
