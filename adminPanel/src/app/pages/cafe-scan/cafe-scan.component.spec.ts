import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeScanComponent } from './cafe-scan.component';

describe('CafeScanComponent', () => {
  let component: CafeScanComponent;
  let fixture: ComponentFixture<CafeScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeScanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
