import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowDidPage } from './how-did.page';

describe('HowDidPage', () => {
  let component: HowDidPage;
  let fixture: ComponentFixture<HowDidPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HowDidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
