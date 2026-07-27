import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailScreenPage } from './task-detail-screen.page';

describe('TaskDetailScreenPage', () => {
  let component: TaskDetailScreenPage;
  let fixture: ComponentFixture<TaskDetailScreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
