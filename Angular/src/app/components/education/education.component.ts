import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  educationList:any
    constructor(private datosPortfolio:PortfolioService){

  }

  ngOnInit(): void{
    this.datosPortfolio.getData().subscribe(data=>{
      this.educationList=data.education
    })
  }
}
