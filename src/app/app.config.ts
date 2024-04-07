import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), 
    provideAnimationsAsync(), provideNativeDateAdapter(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(
      {"projectId":"da-rof-afdf4","appId":"1:392007291732:web:a8d8e92dac78d5493aaec1",
      "databaseURL":"https://da-rof-afdf4-default-rtdb.europe-west1.firebasedatabase.app",
      "storageBucket":"da-rof-afdf4.appspot.com","apiKey":"AIzaSyBirUr34zvfXXJRGnak31E9_CtRGBGESLo",
      "authDomain":"da-rof-afdf4.firebaseapp.com","messagingSenderId":"392007291732"}))),
       importProvidersFrom(provideFirestore(() => getFirestore()))
      ]
  // "locationId":"europe-west",

};
