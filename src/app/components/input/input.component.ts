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
isInvoice: boolean = false;
isLnaddress: boolean = false;
isEmpty: boolean = false;
url: string = '';
chainAddress:string = this.lnrequest?.data.chain_address;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  private constructApiURL(lnRequestBlank:string) : void{
    if (lnRequestBlank.includes('@')) {
      this.url="lnurl/decodelnaddress",
      this.requestDetail = { lnAddress: this.lnRequestBlank}
      this.isLnaddress = true;
      this.isInvoice = false;

      return
    }
     if(lnRequestBlank.startsWith('lnurl') && lnRequestBlank.includes('lnurl')) {
      this.url="lnurl/decodelnurl",
      this.requestDetail = { encodedLnUrl: this.lnRequestBlank}
      this.isLnaddress = true;
      this.isInvoice = false;
      return
    }
     if(lnRequestBlank.startsWith('ln')) {
      this.url="wallets/ln/decodepaymentrequest",
      this.requestDetail = { request: this.lnRequestBlank}
      this.isInvoice = true;
      this.isLnaddress = false;
      return
    }

  }

  onSubmit() {
    if(!this.lnRequestBlank) {
      this.isEmpty = true;
      console.log('please enter an input');
      return
    }
    this.constructApiURL(this.lnRequestBlank);
    this.appService.getData(this.url, this.requestDetail).subscribe(
      (lnrequest) => {
          console.log(lnrequest);
          this.lnrequest = lnrequest;
          this.lnRequestBlank = "";
          this.isEmpty = false;

      }
    )
  }
}
