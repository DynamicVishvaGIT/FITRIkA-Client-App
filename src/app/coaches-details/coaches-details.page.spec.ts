import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachesDetailsPage } from './coaches-details.page';

describe('CoachesDetailsPage', () => {
  let component: CoachesDetailsPage;
  let fixture: ComponentFixture<CoachesDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
