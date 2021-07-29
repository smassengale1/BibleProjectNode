import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseDialogComponent } from './verse-dialog.component';

describe('VerseDialogComponent', () => {
  let component: VerseDialogComponent;
  let fixture: ComponentFixture<VerseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
