import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  public getHealthCheck(): void{
    console.log("Getting health check of Express Server");
    this.http.get('http://localhost:8081/').subscribe(res => {
      console.log(res);
    })
  }
}
