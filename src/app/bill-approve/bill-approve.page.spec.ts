import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillApprovePage } from './bill-approve.page';

describe('BillApprovePage', () => {
  let component: BillApprovePage;
  let fixture: ComponentFixture<BillApprovePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BillApprovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
