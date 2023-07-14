import { Component } from '@angular/core';
import { Experience } from 'src/app/interface/Experience';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  edit:boolean=false
  experienceList:Experience[]=[]
  experienceError:String=''
  experienceForm= this.formbuilder.group({
    id:[0],
    userid:[0],
    position:['',Validators.required],
    company:['',Validators.required],
    img:['',Validators.required],
    description:['',Validators.required],
    start:['',Validators.required],
    end:['',Validators.required]
  })

  get id(){
    return this.experienceForm.controls.id
  }
  get userid(){
    return this.experienceForm.controls.id
  }
  get position(){
    return this.experienceForm.controls.position
  }
  get company(){
    return this.experienceForm.controls.company
  }
  get img(){
    return this.experienceForm.controls.img
  }
  get description(){
    return this.experienceForm.controls.description
  }
  get start(){
    return this.experienceForm.controls.start
  }
  get end(){
    return this.experienceForm.controls.end
  }

  constructor(private formbuilder: FormBuilder, private datosPortfolio:PortfolioService){
  }

  toggleEdit(){
    this.edit=!this.edit
    //this.aboutForm.controls.about.setValue(this.miPortfolio.about)
  }

  saveExperience(){
    console.log('save experience')
  }

  ngOnInit(){
    this.datosPortfolio.getData().subscribe(data=>{
      this.experienceList=data.experience
    })
  }
}
