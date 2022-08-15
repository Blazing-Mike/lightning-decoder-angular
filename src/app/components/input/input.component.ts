import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import {ClipboardModule} from '@angular/cdk/clipboard';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
lnrequest!: any;
lnRequestBlank !: any;
requestDetail: any;
url: string = '';
chainAddress:string = this.lnrequest?.data.chain_address;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  private constructApiURL(lnRequestBlank:string) : void{
    if (lnRequestBlank.includes('@')) {
      this.url="lnurl/decodelnaddress",
      this.requestDetail = { lnAddress: this.lnRequestBlank}
      return
    } 
     if(lnRequestBlank.startsWith('lnurl') && lnRequestBlank.includes('lnurl')) {
      this.url="lnurl/decodelnurl",
      this.requestDetail = { encodedLnUrl: this.lnRequestBlank}
      return
    } 
     if(lnRequestBlank.startsWith('ln')) {
      this.url="wallets/ln/decodepaymentrequest",
      this.requestDetail = { request: this.lnRequestBlank}
      return
    }

  }

  onSubmit() {
    if(!this.lnRequestBlank) {
      alert('No data found');
      console.log('please enter an input');
      return
    }
    this.constructApiURL(this.lnRequestBlank);
    this.appService.getData(this.url, this.requestDetail).subscribe(
      (lnrequest) => { 
          console.log(lnrequest);
          this.lnrequest = lnrequest;
          this.lnRequestBlank = "";

      }
    )
  }
}
