import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";


const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "update/:id",
    component: UpdateComponent
  },
  {
    // DEFAULT PATHING
    path: "",
    redirectTo: "/",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
      BrowserModule,
      HttpClientModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
