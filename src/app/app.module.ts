import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyAj1qQ8hRxOtfeEdVF1r2bY63BkCxsFU8U',
  authDomain: 'fbionic21.firebaseapp.com',
  databaseURL: 'https://fbionic21.firebaseio.com',
  projectId: 'fbionic21',
  storageBucket: 'fbionic21.appspot.com',
  messagingSenderId: '487652028654'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
