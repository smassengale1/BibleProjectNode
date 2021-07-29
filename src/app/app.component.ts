import { Component } from '@angular/core';
import {ApiService} from "./shared/api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BibleProjectNode';

  constructor(private router: Router) {
    this.router.navigate(['admin']);
  }

}
