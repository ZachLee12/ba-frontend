import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityComponent } from './municipality.component';

describe('MunicipalityComponent', () => {
  let component: MunicipalityComponent;
  let fixture: ComponentFixture<MunicipalityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MunicipalityComponent]
    });
    fixture = TestBed.createComponent(MunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
