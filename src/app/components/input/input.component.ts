import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../services/app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  checkIfLnInvoice = false ;
lnrequest!: any;
lnRequestBlank !: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}
  onSubmit() {
    this.appService.UpdateRequest(this.lnRequestBlank);
    this.appService.getData().subscribe(
      (lnrequest) => {
        console.log(lnrequest);
        this.lnrequest = lnrequest;
        this.lnRequestBlank = "";

      }
    )
  }
}
