import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: '', //PAS

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '',


  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  dummyClientSecret: '',

  loginUrl : '',

  logoutUrl : '',

  responseType: 'code',

  skipIssuerCheck : true,

  requireHttps : false, 

  strictDiscoveryDocumentValidation: false,

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid',

  showDebugInformation: true,
};


export const authCodeFlowConfig2: AuthConfig = {
  // Url of the Identity Provider
  issuer: '', //PAS

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '',


  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  dummyClientSecret: '',

  loginUrl : '',

  logoutUrl : '',

  responseType: 'code',

  skipIssuerCheck : true,

  requireHttps : false, 

  strictDiscoveryDocumentValidation: false,

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid',

  showDebugInformation: true,

  customQueryParams : {'prompt':'none'},

  postLogoutRedirectUri : window.location.origin + '/index.html'
};
