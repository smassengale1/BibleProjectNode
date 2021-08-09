import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Verse, VerseFilter} from "../../shared/models/verse.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VerseService} from "../../shared/services/verse.service";
import {MatSelect, MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-verse-filter-dialog',
  templateUrl: './verse-filter-dialog.component.html',
  styleUrls: ['./verse-filter-dialog.component.scss']
})
export class VerseFilterDialogComponent {
  verseTypeKeys: string[] = this.verseService.VERSE_TYPES;
  TESTAMENTS: string[] = ['new', 'old']
  form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { active_filter: VerseFilter },
              public dialogRef: MatDialogRef<Verse>,
              private formBuilder: FormBuilder,
              private verseService: VerseService) {

    dialogRef.disableClose = true;

    this.form = this.formBuilder.group({
      testament: new FormControl(this.data.active_filter.testament),
      book: new FormControl({value: null, disabled: true}),
      chapter: new FormControl({value: null, disabled: true}),
      verseTypes: new FormArray([]),
      limit: new FormControl(this.data.active_filter.limit),
      completed: new FormControl(this.data.active_filter.completed),
    })

    this.createVerseTypeCheckBoxes();
  }


  applyFilter(): void {
    this.close(this.formValues);
  }

  get formValues() {
    return {
      testament: this.testament,
      verseTypes: this.verseTypes,
      limit: this.limit,
      completed: this.completed
    };
  }


  /**
   * should be able filter by
   *  verse types (multiple)
   *  chapter (mat select with typing capabilities)
   *  book  (mat select with typing capabilities)
   *  testament (new / old)
   *
   *  define a limit (default 100)
   *
   * for now will just filter by
   *  testament
   *  type
   *  limit
   */

  // Dynamically creates form control for checkboxes
  public createVerseTypeCheckBoxes(): void {
    this.verseService.VERSE_TYPES.forEach((type) => {

      // if filter is apply fix here
      this.typeFormArray.push(new FormControl(this.data.active_filter.verseTypes.includes(type)));
    });
  }

  get typeFormArray() {
    return this.form.controls.verseTypes as FormArray;
  }

  get testament(): 'new' | 'old' {
    return this.form.controls.testament.value;
  }

  get limit(): number {
    return this.form.controls.limit.value;
  }

  get completed(): boolean {
    return this.form.controls.completed.value;
  }

  get verseTypes(): string[] {
    return this.form.value.verseTypes
      .map((checked: boolean, index: number) => checked ? this.verseService.VERSE_TYPES[index] : null)
      .filter((type: string | any) => type != null);
  }

  checkForm(buttonClicked: string): void {
    if (this.completed != null) {
      const bothFalse = buttonClicked === 'false' && this.completed.toString() == 'false';
      const bothTrue = buttonClicked == 'true' && this.completed.toString() == 'true';

      if (bothFalse || bothTrue) {
        setTimeout(() => this.form.controls.completed.reset(), 50);
      }
    }
  }

  get isFilterNull(): boolean {
    return this.verseService.isVerseFilterNull(this.data.active_filter);
  }

  close(filter: VerseFilter | null): void {
    this.dialogRef.close({filter: filter})
  }

}


