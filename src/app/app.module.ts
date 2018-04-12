import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { UserComponent } from '../app/user/user.component'
import { ListComponent } from '../app/list/list.component'

const appRoutes: Routes = [
  { path: 'lista/:page', component: ListComponent },
  { path: 'usuario',      component: UserComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent,UserComponent,ListComponent]
})
export class AppModule { }
