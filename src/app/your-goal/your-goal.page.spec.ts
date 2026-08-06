import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourGoalPage } from './your-goal.page';

describe('YourGoalPage', () => {
  let component: YourGoalPage;
  let fixture: ComponentFixture<YourGoalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YourGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
