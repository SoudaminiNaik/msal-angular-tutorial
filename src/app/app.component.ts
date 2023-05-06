import { Component,OnInit,Inject } from '@angular/core';
import { MsalService,MsalBroadcastService,MSAL_GUARD_CONFIG,MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus,RedirectRequest,PopupRequest,InteractionType,AuthenticationResult } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter,takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'msal-angular-tutorial';
  loginDisplay = false;

  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
   private broadcastService: MsalBroadcastService, private authService: MsalService) { }

  ngOnInit() {

    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
  }

  // login() {
  //   alert("Hello")
  //   if (this.msalGuardConfig.authRequest){
  //     alert("If")
  //     this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
  //   } else {
  //     alert("Else")
  //     this.authService.loginRedirect();
  //   }
  // }

  // logout() { 
  //   this.authService.logoutRedirect({
  //     postLogoutRedirectUri: 'http://localhost:4200'
  //   });
  // }
  
  // login() {
  //   alert("Hello"+JSON.stringify(this.msalGuardConfig.authRequest))
  //   if (this.msalGuardConfig.authRequest){
  //     this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest);
  //   } else {
  //     this.authService.loginPopup();
  //   }
  // }
  
  // //authRequestConfig.domainHint = "facebook.com";
  // logout() { 
  //   this.authService.logoutPopup({
  //     mainWindowRedirectUri: '/',
  //   });
  // }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
        } else {
          this.authService.loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
  /* Changes end here. */
}
