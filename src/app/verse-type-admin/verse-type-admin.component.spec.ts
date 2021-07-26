import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseTypeAdminComponent } from './verse-type-admin.component';

describe('VerseTypeAdminComponent', () => {
  let component: VerseTypeAdminComponent;
  let fixture: ComponentFixture<VerseTypeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerseTypeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseTypeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
