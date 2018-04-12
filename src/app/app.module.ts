import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { UserComponent } from '../app/user/user.component'
import { ListComponent } from '../app/list/list.component'
import { HttpClientModule } from '@angular/common/http';
import { ConnectorService } from '../services/connector/connector.service'
//import { FormsModule } from '@angular/forms';

import { Http, Headers, Response, RequestOptions ,HttpModule } from '@angular/http'

const appRoutes: Routes = [
  { path: 'lista/:page', component: ListComponent },
  { path: 'revista',      component: UserComponent },
  { path: 'lista', redirectTo: '/lista/1',
    pathMatch: 'full'},
  { path: '', redirectTo: '/revista',
    pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ConnectorService
  ],
  bootstrap: [AppComponent,UserComponent,ListComponent]
})
export class AppModule { }
