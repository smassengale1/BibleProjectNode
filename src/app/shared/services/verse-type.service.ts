import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Verse, VerseType} from "../models/verse.model";
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class VerseService {
  constructor(private http: HttpClient,
              private api: ApiService) {
  }


  public getVersesToXref(): Observable<Verse[]> {
    return this.http.get<Verse[]>(this.api.url + '/verse/type/unxrefed');
  }

}
