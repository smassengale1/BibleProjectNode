import { Component } from '@angular/core';
import {ApiService} from "./shared/api/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BibleProjectNode';

  constructor(private apiService: ApiService) {
  }

  getHealthCheck(): void {
    this.apiService.getHealthCheck();
  }
}
