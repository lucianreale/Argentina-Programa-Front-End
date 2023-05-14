import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../../services/portfolio.service"
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  miPortfolio:any;
  //prueba de carga sincronica
  public async loadData() {
    const source$ = this.datosPortfolio.getData();
    this.miPortfolio = await lastValueFrom(source$);
  }

  constructor (private datosPortfolio:PortfolioService){
    //this.loadData()
  }

  ngOnInit(): void{
    this.datosPortfolio.getData().subscribe(data=>{
      this.miPortfolio=data
    })
  }
}
