import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DietDetailsPage } from './diet-details.page';

describe('DietDetailsPage', () => {
  let component: DietDetailsPage;
  let fixture: ComponentFixture<DietDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DietDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
