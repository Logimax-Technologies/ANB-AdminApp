import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleschartViewPage } from './saleschart-view.page';

describe('SaleschartViewPage', () => {
  let component: SaleschartViewPage;
  let fixture: ComponentFixture<SaleschartViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SaleschartViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
