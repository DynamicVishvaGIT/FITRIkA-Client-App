import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindYourTrainerPage } from './find-your-trainer.page';

describe('FindYourTrainerPage', () => {
  let component: FindYourTrainerPage;
  let fixture: ComponentFixture<FindYourTrainerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindYourTrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
