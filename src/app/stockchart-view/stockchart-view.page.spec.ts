import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockchartViewPage } from './stockchart-view.page';

describe('StockchartViewPage', () => {
  let component: StockchartViewPage;
  let fixture: ComponentFixture<StockchartViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockchartViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
