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
  //editedExperience?:Experience
  editedExperience = {} as Experience
  experienceList:Experience[]=[]
  experienceError:String=''
  index:Number=0
  submitBtnText:String=''
  submitBtnClass=''
  submitBtnDisabled:boolean=false
  exitBtnDisabled:boolean=false
  userId?:BigInt
  experienceForm= this.formbuilder.group({
    id:[BigInt],
    userid:[BigInt],
    position:['',Validators.required],
    company:['',Validators.required],
    img:[''],
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

  constructor(private formbuilder: FormBuilder, private portfolioService:PortfolioService){
  }

  toggleEdit(){
    this.edit=!this.edit
  }

  setForm(experience:Experience){
    this.experienceForm.controls.position.setValue(experience.position || "")
    this.experienceForm.controls.company.setValue(experience.company || "")
    this.experienceForm.controls.img.setValue(experience.img || "")
    this.experienceForm.controls.description.setValue(experience.description || "")
    this.experienceForm.controls.start.setValue(experience.start || "")
    this.experienceForm.controls.end.setValue(experience.end || "")
  }

  setFormSaveExperience(){
    this.experienceForm.reset()
    this.submitBtnText='Guardar'
    this.submitBtnClass='btn btn-success'
    this.toggleEdit()
  }

  setFormEditExperience(i: number){
    this.submitBtnText='Editar'
    this.submitBtnClass='btn btn-success'
    this.toggleEdit()
    this.setForm(this.experienceList[i])
    this.editedExperience.id=this.experienceList[i].id
  }

  setFormDeleteExperience(i: number){
    this.submitBtnText='Borrar'
    this.submitBtnClass='btn btn-danger'
    this.toggleEdit()
    this.setForm(this.experienceList[i])
    this.editedExperience.id=this.experienceList[i].id
  }

  crudExperience(){
    let newExperience = {} as Experience
    this.experienceForm.markAllAsTouched()
    if (this.experienceForm.valid){
      this.submitBtnDisabled=!this.submitBtnDisabled
      this.exitBtnDisabled=!this.exitBtnDisabled
      this.editedExperience.userid=this.userId
      this.editedExperience.position=this.experienceForm.value.position!
      this.editedExperience.company=this.experienceForm.value.company!
      this.editedExperience.img=this.experienceForm.value.img || ''
      this.editedExperience.description=this.experienceForm.value.description!
      this.editedExperience.start=this.experienceForm.value.start!
      this.editedExperience.end=this.experienceForm.value.end!
      switch (this.submitBtnText) {
        case 'Guardar':
          this.submitBtnText="Cargando..."
          newExperience.userid=this.userId
          newExperience.position=this.experienceForm.value.position!
          newExperience.company=this.experienceForm.value.company!
          newExperience.img=this.experienceForm.value.img || ''
          newExperience.description=this.experienceForm.value.description!
          newExperience.start=this.experienceForm.value.start!
          newExperience.end=this.experienceForm.value.end!
          this.saveExperience(newExperience);
          break;
        case 'Editar':
          this.submitBtnText="Cargando..."  
          this.editExperience(this.editedExperience);
          break;
        case 'Borrar':
          this.submitBtnText="Cargando..."
          this.deleteExperience(this.editedExperience);
          break;
      }
    }
    else {
      console.log("Algo no se cargo en el Form.")
      return
    }
  }

  saveExperience(data:Experience){
    console.log("save experience")
    console.log(data)
    this.portfolioService.saveExperience(this.editedExperience).subscribe({
      next: () => {
      },
      error: (errorData) =>{
        console.log(errorData)
        this.experienceError=errorData
        this.exitBtnDisabled=!this.exitBtnDisabled
      },
      complete: () =>{
        this.portfolioService.getExperience(this.userId!).subscribe(data=>{this.experienceList=data})
        this.experienceForm.reset()
        this.toggleEdit()
        this.submitBtnDisabled=!this.submitBtnDisabled
        this.exitBtnDisabled=!this.exitBtnDisabled
        this.submitBtnText=''
      } 
    })
  }

  editExperience(data:Experience){
    const indexElemento = this.experienceList.findIndex(el => el.id == data.id )
    this.portfolioService.updateExperience(this.editedExperience).subscribe({
      next: () => {
      },
      error: (errorData) =>{
        console.log(errorData)
        this.experienceError=errorData
        this.exitBtnDisabled=!this.exitBtnDisabled
      },
      complete: () =>{
        this.experienceList[indexElemento]=data
        this.experienceForm.reset()
        this.toggleEdit()
        this.submitBtnDisabled=!this.submitBtnDisabled
        this.exitBtnDisabled=!this.exitBtnDisabled
        this.submitBtnText=''
      } 
    })

  }
  
  deleteExperience(data:Experience){
    this.portfolioService.deleteExperience(this.editedExperience).subscribe({
      next: () => {
      },
      error: (errorData) =>{
        console.log(errorData)
        this.experienceError=errorData
        this.exitBtnDisabled=!this.exitBtnDisabled
      },
      complete: () =>{
        this.experienceList=this.experienceList.filter((item) => item.id !== data.id)
        this.experienceForm.reset()
        this.toggleEdit()
        this.submitBtnDisabled=!this.submitBtnDisabled
        this.exitBtnDisabled=!this.exitBtnDisabled
        this.submitBtnText=''
      } 
    })
  }

  ngOnInit(){
    this.portfolioService.getUser().subscribe(user => this.userId = user[0].id)
    this.portfolioService.getExperience(this.userId!).subscribe(data=>{
      this.experienceList=data
    })
  }
}
