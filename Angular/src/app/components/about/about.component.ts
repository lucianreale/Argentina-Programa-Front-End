import { Component } from '@angular/core';
import { PortfolioService } from "../../services/portfolio.service"

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor (private datosPortfolio:PortfolioService){

  }

  ngOnInit(){
    this.datosPortfolio.obtenerDatos()
  }
}
