import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Verse, VerseFilter, VerseType} from "../models/verse.model";
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class VerseService {
  VERSES: Verse[] = [];
  VERSE_TYPES: VerseType[] = [];



  constructor(private http: HttpClient,
              private api: ApiService) {

    this.getVerseTypes().subscribe(res => {

      if (res.includes(VerseType.completed)) {
        res.splice(res.indexOf(VerseType.completed), 1);
      }

      this.VERSE_TYPES = res;
    });

  }


  public updateVerseXref(verse: Verse): Observable<any> {
    return this.http.put(this.api.url + '/verse/type/', verse);
  }

  public getVerseTypes(): Observable<VerseType[]> {
    return this.http.get<VerseType[]>(this.api.url+ '/verse/types',)
  }


  public applyFilter(filter: VerseFilter ) {
    const params = new HttpParams()
      .set('verseTypes', filter.verseTypes ? filter.verseTypes.toLocaleString() : '')
      .set('limit', filter.limit ? filter.limit : '')
      .set('testament', filter.testament ? filter.testament : '')
      .set('completed', filter.completed !== null ? filter.completed : '');

    return this.http.get<Verse[]>(this.api.url+ '/verse', {params})
  }


  // Helper methods

  isVerseFilterNull(filter: VerseFilter): boolean {
    let isNull = true;
    Object.values(filter).some(key => {
      if (key !== null && key.toLocaleString() !== '') {
        isNull = false;
      }
    });

    return isNull;
  }






}
