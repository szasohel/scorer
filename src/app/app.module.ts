import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TossComponent } from './score/toss/toss.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from 'angularfire2/database';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ScorecardListComponent } from './scorecard-list/scorecard-list.component';
import { ScorecardComponent } from './score/scorecard/scorecard.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerDetailsComponent,
    HomeComponent,
    SignInComponent,
    ScorecardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent]
})
export class AppModule {}
