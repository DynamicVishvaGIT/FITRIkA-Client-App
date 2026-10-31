import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyProspectsPage } from './my-prospects.page';

describe('MyProspectsPage', () => {
  let component: MyProspectsPage;
  let fixture: ComponentFixture<MyProspectsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProspectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
