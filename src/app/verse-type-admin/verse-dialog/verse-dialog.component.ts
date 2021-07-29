import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Verse} from "../../shared/models/verse.model";

@Component({
  selector: 'app-verse-dialog',
  templateUrl: './verse-dialog.component.html',
  styleUrls: ['./verse-dialog.component.scss']
})
export class VerseDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public verse: Verse) {}


  ngOnInit(): void {
    console.log(this.verse);
  }


}
