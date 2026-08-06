import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachesDetailedPage } from './coaches-detailed.page';

describe('CoachesDetailedPage', () => {
  let component: CoachesDetailedPage;
  let fixture: ComponentFixture<CoachesDetailedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesDetailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
