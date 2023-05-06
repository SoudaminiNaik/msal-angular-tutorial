import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
export const b2cPolicies = {
     names: {
         signUpSignIn: "b2c_1_susi_reset_v2",
         editProfile: "b2c_1_edit_profile_v2"
     },
     authorities: {
         signUpSignIn: {
             authority: "https://accounts.google.com/o/oauth2/auth",
         },
         editProfile: {
             authority: "https://your-tenant-name.b2clogin.com/your-tenant-name.onmicrosoft.com/b2c_1_edit_profile_v2"
         }
     },
     authorityDomain: "your-tenant-name.b2clogin.com"
 };
 
 
export const msalConfig: Configuration = {
     auth: {
         clientId: "501711392564-j1hami9dat7atpl5ic0p9pt1rj2hdsas.apps.googleusercontent.com",
         authority: "https://login:microsoftonline.com/7269cfc9-f839-4437-9ded-f6d4bdec41d2",
         knownAuthorities: [b2cPolicies.authorityDomain],
         redirectUri: "https://eclaimsuat.europassistance.in/tata_sso-wrapper.html", 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }

export const protectedResources = {
  todoListApi: {
    endpoint: " https://login.microsoftonline.com/19d5f71f-6c9a-4e7f-b629-2b0c38f2b167/v2.0/.well-known/openid-configuration",
    scopes: ["User.Read"],
  },
}
export const loginRequest = {
  scopes: []
};