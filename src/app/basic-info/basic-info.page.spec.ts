import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicInfoPage } from './basic-info.page';

describe('BasicInfoPage', () => {
  let component: BasicInfoPage;
  let fixture: ComponentFixture<BasicInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
