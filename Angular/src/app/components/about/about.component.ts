import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../../services/portfolio.service"
import { lastValueFrom } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  miPortfolio:any
  miPortfolioEdited:any
  education:any
  edit:Boolean=false
  aboutError:String=""
  aboutForm= this.formbuilder.group({
    about:['',[Validators.required]],    
  })
  //prueba de carga sincronica
  /*public async loadData() {
    const source$ = this.datosPortfolio.getData();
    this.miPortfolio = await lastValueFrom(source$);
  }*/

  constructor (private formbuilder: FormBuilder, private portfolioService: PortfolioService){
    //this.loadData()
  }

  toggleEdit(){
    this.edit=!this.edit
    this.aboutForm.controls.about.setValue(this.miPortfolio.about)
  }
  
  get about(){
    return this.aboutForm.controls.about
  }

  saveAbout(){
    this.miPortfolioEdited = {...this.miPortfolio, "about": this.aboutForm.value.about} 
    this.aboutForm.markAllAsTouched()
    if (this.aboutForm.valid){
      this.portfolioService.saveAbout(this.miPortfolioEdited).subscribe({
        next: () => {
        },
        error: (errorData) =>{
          console.log(errorData)
          this.aboutError=errorData
        },
        complete: () =>{
          this.miPortfolio=this.miPortfolioEdited  
          this.aboutForm.reset()
          this.toggleEdit()
        } 
      })
    }
  }

  ngOnInit(){
    /*this.datosPortfolio.getData().subscribe(data=>{
      this.miPortfolio=data
    })*/
    this.portfolioService.getUser().subscribe(user => this.miPortfolio = user[0])
    this.portfolioService.getEducation(this.miPortfolio.id).subscribe(education => {
      this.education = education
    })
  }
}
