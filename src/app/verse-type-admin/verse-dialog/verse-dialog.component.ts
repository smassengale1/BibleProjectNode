import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Verse, VerseType, VerseTypeKeys} from "../../shared/models/verse.model";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-verse-dialog',
  templateUrl: './verse-dialog.component.html',
  styleUrls: ['./verse-dialog.component.scss']
})
export class VerseDialogComponent implements OnInit {

  verseTypeKeys: String[] = VerseTypeKeys;
  verseType: String[] = [];

  form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {[key: string]: Verse},
              private formBuilder: FormBuilder) {
    // this.verseControl = new FormControl({value: this.data.verse.text, disabled: true});

    this.form = this.formBuilder.group({
      verseControl: new FormControl({value: this.data.verse.text, disabled: true}),
      verseTypes: new FormArray([])
    })

    this.createVerseTypeCheckBoxes();
  }

  public createVerseTypeCheckBoxes(): void {
    this.verseTypeKeys.forEach((type) => {
      this.typeFormArray.push(new FormControl(this.data.verse.verseTypes.includes(type)));
    });
  }

  get typeFormArray() {
    return this.form.controls.verseTypes as FormArray;
  }


  ngOnInit(): void {

  }

  public submit() {
    console.log(this.values);
  }

  get values(): String[] {
    return this.form.value.verseTypes
      .map((checked: boolean, index: number) => checked ? this.verseTypeKeys[index] : null)
      .filter((type: String | any) => type != null);
  }
}
