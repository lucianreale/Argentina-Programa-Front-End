import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../../services/portfolio.service"
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  miPortfolio:any
  education:any
  //prueba de carga sincronica
  /*public async loadData() {
    const source$ = this.datosPortfolio.getData();
    this.miPortfolio = await lastValueFrom(source$);
  }*/

  constructor (private portfolioService: PortfolioService){
    //this.loadData()
  }

  ngOnInit(){
    /*this.datosPortfolio.getData().subscribe(data=>{
      this.miPortfolio=data
    })*/
    this.portfolioService.getUser().subscribe(user => this.miPortfolio = user[0])
    this.portfolioService.getEducation(this.miPortfolio.id).subscribe(education => {
      this.education = education
      console.log(education)
    })
  }
}
