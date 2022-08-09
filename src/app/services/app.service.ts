import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
lnRequestBlank!: string;
  constructor(private http: HttpClient) {
    console.log('dddd');
    
  }

  getData() {
    const httpOptions = {
      headers : new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer sk.9683282.a9e5417b0b61f6c61cfbfb9bd1b5466d'
      }),

    };

    return this.http.post("https://sandboxapi.bitnob.co/api/v1/lnurl/decodelnaddress", JSON.stringify({ lnAddress: this.lnRequestBlank}), httpOptions);
  }

  UpdateRequest(lnRequestBlank:string) {
    this.lnRequestBlank = lnRequestBlank.trim();
  }


}
