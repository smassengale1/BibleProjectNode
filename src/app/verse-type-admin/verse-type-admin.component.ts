import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Verse, VerseFilter, VerseType} from "../shared/models/verse.model";
import {VerseService} from "../shared/services/verse.service";
import {ApiService} from "../shared/api/api.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {VerseDialogComponent} from "./verse-dialog/verse-dialog.component";
import {fromEvent, merge} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {VerseFilterDialogComponent} from "./verse-filter-dialog/verse-filter-dialog.component";

const DEFAULT_FILTER: VerseFilter = {
  completed: false,
  limit: 1000,
  testament: 'new',
  verseTypes: [],
}

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
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator | any ;
  loading = false;

  filter: VerseFilter = DEFAULT_FILTER;



  // once a verse is updated, the next verse is grabbed
  pinVerses: FormControl = new FormControl(false);

  verses: Verse[] | null = null;
  columnsToDisplay = ['reference', 'id', 'chapterId', 'bookId', 'tags', 'expand'];
  dataSource: MatTableDataSource<Verse> = new MatTableDataSource<Verse>();
  expandedElement: Verse | any;


  constructor(public verseService: VerseService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchVerses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  fetchVerses(): void  {
    this.loading = true;
    this.verseService.applyFilter(this.filter).subscribe(res => {
      this.dataSource.data = res;
      this.verseService.VERSES = res;
      this.loading = false;
    });
  }

  openVerseDialog(verse: Verse) {
    let dialog = this.dialog.open(VerseDialogComponent, {
      data : { verse: verse, pinned: this.pinVerses.value}
    });

    dialog.afterClosed().subscribe(res => {
      if (res.wereChanges) {
        this.fetchVerses();
      }
    })
  }

  openFilterDialog() {
    let dialog = this.dialog.open(VerseFilterDialogComponent, {
      data : {active_filter: this.filter}
    });

    dialog.afterClosed().subscribe(res => {
      if (res.filter) {
        this.filter = res.filter;
        this.fetchVerses()

      }
    })
  }

  searchVerses(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

