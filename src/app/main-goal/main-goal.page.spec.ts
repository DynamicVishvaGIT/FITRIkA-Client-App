import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainGoalPage } from './main-goal.page';

describe('MainGoalPage', () => {
  let component: MainGoalPage;
  let fixture: ComponentFixture<MainGoalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
