import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experienceList:any
    constructor(private datosPortfolio:PortfolioService){

  }

  ngOnInit(){
    this.datosPortfolio.getData().subscribe(data=>{
      this.experienceList=data.experience
      console.log('experience')
      console.log(this.experienceList)
    })
  }
}
