import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporthistoryPage } from './reporthistory.page';

describe('ReporthistoryPage', () => {
  let component: ReporthistoryPage;
  let fixture: ComponentFixture<ReporthistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReporthistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
