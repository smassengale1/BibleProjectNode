import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Verse, VerseType} from "../../shared/models/verse.model";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn, Validators
} from "@angular/forms";
import {VerseService} from "../../shared/services/verse.service";


@Component({
  selector: 'app-verse-dialog',
  templateUrl: './verse-dialog.component.html',
  styleUrls: ['./verse-dialog.component.scss']
})
export class VerseDialogComponent {
  loading = false;
  verseTypeKeys: string[] = this.verseService.VERSE_TYPES;
  wereChanges: boolean = false;

  verseType: string[] = [];
  errors: string[] = [];

  form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {[key: string]: Verse},
              private formBuilder: FormBuilder,
              public verseService: VerseService,
              public dialogRef: MatDialogRef<Verse>) {

    this.dialogRef.disableClose = true;
    this.form = this.formBuilder.group({
      verseControl: new FormControl({value: this.data.verse.text, disabled: true}, Validators.required),
      verseTypes: new FormArray([])
    })

    this.createVerseTypeCheckBoxes();
  }


  // Dynamically creates form control for checkboxes
  public createVerseTypeCheckBoxes(): void {
    this.verseService.VERSE_TYPES.forEach((type) => {
      this.typeFormArray.push(new FormControl(this.data.verse.verseTypes.includes(type)));
    });
  }

  get typeFormArray() {
    return this.form.controls.verseTypes as FormArray;
  }


  public submit() {
    this.loading = true;
    this.data.verse.verseTypes = this.values;
    this.verseService.updateVerseXref(this.data.verse)
      .subscribe(res => {
          if (this.data.pinned) {
            this.navigate('forward');
          } else {
            this.close();
          }

          this.wereChanges = true;
        },
        (err) => {
        alert(`(${err.error.code}): ${err.error.message}\n\n ** Need to enhance **`);

        this.loading = false;
      });
  }

  get values(): string[]  {
    return this.form.value.verseTypes
      .map((checked: boolean, index: number) => checked ? this.verseService.VERSE_TYPES[index] : null)
      .filter((type: string | any) => type != null);
  }


  isTypeFormValid(index: number): void {
    const selectedLength = this.form.value.verseTypes.filter((type: boolean) => type).length;
    const noneIndex = this.form.value.verseTypes.length - 1;

    // none is selected and more values
    if (this.form.value.verseTypes[noneIndex] && selectedLength > 1) {
      const error = "Type 'None' OR Type 'Others' must be selected - not both"
      if (!this.errors.includes(error)) {
        this.errors.push(error)
      }
    } else {
      this.errors.pop()
    }

  }

  isFormValid() {
    const noneSelected = this.values.length == 0;
    const isErrors = this.errors.length > 0;
    const formNotValid = !this.form.valid;

    return noneSelected || isErrors || formNotValid;
  }

  navigate(direction: string):void {
    const current_verse = this.data.verse;

    let verse: Verse | null;
    switch(direction) {
      case 'forward': verse = this.getNextVerse(current_verse); break;
      case 'back':  verse = this.getPreviousVerse(current_verse); break;
      default: verse = null;
    }


    if (verse != null) {
      this.loading = true;
      this.data.verse = verse;

      setTimeout(() => {
        this.resetForm();
        this.loading = false;
      }, 300);
    }

  }

  getNextVerse(verse: Verse): Verse | null {
    const index = this.verseService.VERSES.indexOf(verse);

    if ((index + 1) < this.verseService.VERSES.length) {
      return this.verseService.VERSES[index + 1];
    }

    return null;
  }

  getPreviousVerse(verse: Verse): Verse | null {
    const index = this.verseService.VERSES.indexOf(verse);

    if ((index - 1) >= 0) {
      return this.verseService.VERSES[index - 1];
    }

    return null;
  }

  resetForm(): void {
    this.form.controls.verseControl.setValue(this.data.verse.text);

    this.typeFormArray.controls.forEach((typeControl: AbstractControl, index: number) => {
      if (this.data.verse.verseTypes.includes(this.verseService.VERSE_TYPES[index])) {
        typeControl.setValue(true);
      } else {
        typeControl.setValue(false);
      }
    });
  }

  close(): void {
    this.dialogRef.close({result: this.wereChanges})
  }
}


