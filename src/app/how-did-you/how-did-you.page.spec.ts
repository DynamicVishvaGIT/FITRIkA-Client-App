import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowDidYouPage } from './how-did-you.page';

describe('HowDidYouPage', () => {
  let component: HowDidYouPage;
  let fixture: ComponentFixture<HowDidYouPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HowDidYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
