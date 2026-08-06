import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DietPreferencePage } from './diet-preference.page';

describe('DietPreferencePage', () => {
  let component: DietPreferencePage;
  let fixture: ComponentFixture<DietPreferencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPreferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
