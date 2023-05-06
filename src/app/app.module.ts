import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsalGuard,MsalInterceptor,MsalModule,MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType,PublicClientApplication } from '@azure/msal-browser';

import { msalConfig,protectedResources } from './auth-config';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WebapiComponent } from './webapi/webapi.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    WebapiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    HttpClientModule,

    // Initiate the MSAL library with the MSAL configuration object
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      {
        // The routing guard configuration. 
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: protectedResources.todoListApi.scopes
        }
      },
      {
        // MSAL interceptor configuration.
        // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes]
        ])
      }),

      
// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
    }
    
  },
  
  {
    interactionType: InteractionType.Popup,
    protectedResourceMap: new Map([
      [protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes]
    ])
  }),
    BrowserAnimationsModule
    /* Changes end here. */
  ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
providers: [
  /* Changes start here. */
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  MsalGuard
  /* Changes end here. */
],
bootstrap: [
  AppComponent,
  /* Changes start here. */
  MsalRedirectComponent
  /* Changes end here. */
]
})
export class AppModule { }
