import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateScanComponent } from './gate-scan.component';

describe('GateScanComponent', () => {
  let component: GateScanComponent;
  let fixture: ComponentFixture<GateScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GateScanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
