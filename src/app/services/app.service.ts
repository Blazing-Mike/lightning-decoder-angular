import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

lnRequestBlank!: string;
baseURL = "https://sandboxapi.bitnob.co/api/v1/"
  constructor(private http: HttpClient) {
    console.log('dddd');
    console.log(this.lnRequestBlank); 
    
  }

checkInputType(lnRequestBlank:string) {
    if (lnRequestBlank.includes('@')) {
      return JSON.stringify({ lnAddress: this.lnRequestBlank})
    } else if(lnRequestBlank.startsWith('LNURL') && lnRequestBlank.includes('LNURL')) {
      return JSON.stringify({encodedLnUrl: this.lnRequestBlank})
    } else if(lnRequestBlank.startsWith('ln')) {
      return JSON.stringify({ request: this.lnRequestBlank})
    }
    return JSON.stringify({ request: this.lnRequestBlank})
  }

  constructApiURL(lnRequestBlank:string) {
    if (lnRequestBlank.includes('@')) {
      return "lnurl/decodelnaddress"
    } else if(lnRequestBlank.startsWith('LNURL') && lnRequestBlank.includes('LNURL')) {
      return "lnurl/decodelnurl"
    } else if(lnRequestBlank.startsWith('ln')) {
      return "wallets/ln/decodepaymentrequest"
    }
  }

  checkInputTypeandConstructApiURL(lnRequestBlank:string) {
    if (lnRequestBlank.includes('@')) {
      return `${this.baseURL+"lnurl/decodelnaddress"}, ${JSON.stringify({ lnAddress: this.lnRequestBlank})}`;
    } else if(lnRequestBlank.startsWith('LNURL') && lnRequestBlank.includes('LNURL')) {
      return `${this.baseURL+"lnurl/decodelnaddress"}, ${JSON.stringify({ encodedLnUrl: this.lnRequestBlank})}`;
    } else if(lnRequestBlank.startsWith('ln')) {
      return `${this.baseURL+"lnurl/decodelnaddress"}, ${JSON.stringify({ request: this.lnRequestBlank})}`;
    }
  }

  getData() {
    const httpOptions = {
      headers : new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer sk.9683282.a9e5417b0b61f6c61cfbfb9bd1b5466d'
      }),

    };

    return this.http.post(`${this.baseURL}${this.constructApiURL(this.lnRequestBlank)}`, this.checkInputType(this.lnRequestBlank), httpOptions);
    console.log(this.checkInputTypeandConstructApiURL(this.lnRequestBlank));
    
  }

  UpdateRequest(lnRequestBlank:string) {
    this.lnRequestBlank = lnRequestBlank.trim();
  }


}
