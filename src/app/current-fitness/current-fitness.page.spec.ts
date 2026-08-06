import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentFitnessPage } from './current-fitness.page';

describe('CurrentFitnessPage', () => {
  let component: CurrentFitnessPage;
  let fixture: ComponentFixture<CurrentFitnessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFitnessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
