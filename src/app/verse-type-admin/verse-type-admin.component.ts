import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Verse, VerseType} from "../shared/models/verse.model";
import {VerseService} from "../shared/services/verse-type.service";
import {ApiService} from "../shared/api/api.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {VerseDialogComponent} from "./verse-dialog/verse-dialog.component";
import {fromEvent, merge} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-verse-type-admin',
  templateUrl: './verse-type-admin.component.html',
  styleUrls: ['./verse-type-admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VerseTypeAdminComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | any ;

  verses: Verse[] | null = null;
  columnsToDisplay = ['reference', 'id', 'chapterId', 'bookId', 'tags', 'expand'];
  dataSource: MatTableDataSource<Verse> = new MatTableDataSource<Verse>();
  expandedElement: Verse | any;


  constructor(private verseService: VerseService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.verseService.getVersesToXref().subscribe(res => {
      this.dataSource.data = res;
      this.verses = res;

    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openVerseDialog(verse: Verse) {
    this.dialog.open(VerseDialogComponent, {
      data : { verse: verse }
    });
  }


}

