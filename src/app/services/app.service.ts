import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  lnRequestBlank!: string;
  baseURL = 'https://sandboxapi.bitnob.co/api/v1/';
  constructor(private http: HttpClient) {
    console.log('serivce is working');
  }

  getData(url: string, data: any) {
    return this.http.post(`${this.baseURL}${url}`, data);
  }
  
}