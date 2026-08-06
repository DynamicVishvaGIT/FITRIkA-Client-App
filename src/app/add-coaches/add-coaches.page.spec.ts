import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCoachesPage } from './add-coaches.page';

describe('AddCoachesPage', () => {
  let component: AddCoachesPage;
  let fixture: ComponentFixture<AddCoachesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoachesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
