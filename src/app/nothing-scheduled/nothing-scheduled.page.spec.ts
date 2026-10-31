import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NothingScheduledPage } from './nothing-scheduled.page';

describe('NothingScheduledPage', () => {
  let component: NothingScheduledPage;
  let fixture: ComponentFixture<NothingScheduledPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NothingScheduledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
