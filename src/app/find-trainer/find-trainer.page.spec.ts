import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindTrainerPage } from './find-trainer.page';

describe('FindTrainerPage', () => {
  let component: FindTrainerPage;
  let fixture: ComponentFixture<FindTrainerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
