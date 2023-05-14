import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  proyectList:any
  constructor(private datosPortfolio:PortfolioService){
  }

  ngOnInit(): void{
    this.datosPortfolio.getData().subscribe(data=>{
      this.proyectList=data.proyects
    })
  }
}
