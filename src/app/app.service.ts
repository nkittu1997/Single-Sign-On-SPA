import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AppService{
    constructor(private httpClient: HttpClient) { }

    getRawData(): Observable<any> {
        const api = 'https://ppssa.ed.gov/mga/sps/authsvc?PolicyId=urn:ibm:security:authentication:asf:checksession';
        return this.httpClient.get(api,{ responseType: 'text' });    
      }
}