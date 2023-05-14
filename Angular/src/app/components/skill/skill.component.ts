import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
  skillList:any
    constructor(private datosPortfolio:PortfolioService){

  }

  ngOnInit(): void{
    this.datosPortfolio.getData().subscribe(data=>{
      this.skillList=data.skills
    })
  }
}
