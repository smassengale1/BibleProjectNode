import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseFilterDialogComponent } from './verse-filter-dialog.component';

describe('VerseFilterDialogComponent', () => {
  let component: VerseFilterDialogComponent;
  let fixture: ComponentFixture<VerseFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerseFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
