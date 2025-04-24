import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeAdminsListComponent } from './cafe-admins-list.component';

describe('CafeAdminsListComponent', () => {
  let component: CafeAdminsListComponent;
  let fixture: ComponentFixture<CafeAdminsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeAdminsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeAdminsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
