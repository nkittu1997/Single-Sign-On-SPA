import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginOptions, OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { ConnectableObservable, Observable, Subscription } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { authCodeFlowConfig, authCodeFlowConfig2 } from './sso.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { templateSourceUrl } from '@angular/compiler';
import { interval } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'rpapp1';
  idname = "";
  stat = "unchanged";
  sessionCheckUrl = "";
  rawList: any;
  stateval = "";
  mySubscription : Subscription;
  val1="";
  idtoken1 :any;

  constructor(private oauthService:OAuthService, private http:HttpClient){   
    this.mySubscription = interval(10000).subscribe(x=>{this.checkLoginState();this.performStateChecks()});    
  }

  ngOnInit(): void {
    this.initLoginproc();
  }

  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


  configureSingleSignOn1(){
    this.oauthService.configure(authCodeFlowConfig2);
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  login(){
    this.oauthService.initCodeFlow();
  }

  logout(){
    this.oauthService.logOut();

  }

  get token(){
    let idtoken:any = this.oauthService.getIdToken();
    //this.idtoken1 = idtoken;
    this.idtoken1 = JSON.parse(JSON.stringify(this.getDecodedAccessToken(idtoken)));
    console.log(this.idtoken1);
    let claims:any = this.oauthService.getIdentityClaims();
    let details:any = JSON.parse(JSON.stringify(claims));
    try{
      this.idname = details.sub;
    }
    catch{
      
    }
    return idtoken;
  }

  async checkLoginState(){
    this.http.get('', { withCredentials: true })
      .subscribe(data => {
        this.rawList = data;
        this.stateval = this.rawList.state;
      });
  }

  performStateChecks(){   
    if(this.stateval === 'error'){
      this.logout();
    }
  }

  initLoginproc(){
    this.http.get('', { withCredentials: true })
    .subscribe(data => {
      this.rawList = data;
      this.stateval = this.rawList.state;
      console.log(this.stateval);
      if(this.stateval === 'error'){
        console.log("Error");
        this.configureSingleSignOn();
      }
      else{
        console.log("Unchanged");
        this.configureSingleSignOn1();
      }
    });

  }

  getDecodedAccessToken(idtoken1: string): any {
    try {
      return jwt_decode(idtoken1);
    } catch(Error) {
      return null;
    }
  }
  
}

