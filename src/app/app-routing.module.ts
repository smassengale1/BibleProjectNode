import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VerseTypeAdminComponent} from "./verse-type-admin/verse-type-admin.component";

const routes: Routes = [
  { path: 'admin', component: VerseTypeAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
