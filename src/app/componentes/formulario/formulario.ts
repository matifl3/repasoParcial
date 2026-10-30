import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { form, FormField, FormRoot, min, required } from '@angular/forms/signals';
import { DispositivoService } from '../../service/dispositivo-service';
import { categories, Dispositivo, DispositivoForm } from '../../model/dispositivo.model';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario implements OnInit{
 private readonly service = inject(DispositivoService)

 protected readonly formVacio: DispositivoForm = {
   name: '',
   price: 0,
   notes: '',
   cupProfile: '',
   category: ''
 }

 protected readonly sigFormVacio = signal({...this.formVacio})
 readonly inDispo = input<Dispositivo>()
 readonly outDispo = output<Dispositivo>()
 protected readonly category = categories
 protected readonly isEditing = computed(()=> this.inDispo() !== undefined)

 ngOnInit(){
  const inDisposi = this.inDispo()
   if(this.isEditing() && inDisposi){
      this.sigFormVacio.set(inDisposi)
   }
 }

 protected readonly formulario = form(
  this.sigFormVacio,
  (campos) => {
    required(campos.name, {message:' campo requerido'});
    required(campos.notes, {message:'campos requerido'});
    required(campos.cupProfile, {message: 'campos requeridos'});
    required(campos.price, {message:'campo requerido'});
    min(campos.price,1,{message: 'minimo 1'});
    required(campos.category, {message:'campo requerido'});
  },{
    submission : {
      action: async (fieldTree)=>{
        if(!confirm('desaa continuar'))return
        const valore = fieldTree().value()
        const id = this.inDispo()?.id
        if(this.isEditing() && id){
          const formu = await firstValueFrom(this.service.update(id,valore))
          this.outDispo.emit(formu)
        }else{
          await firstValueFrom(this.service.add(valore))
          this.reset();
        }
      }
    }
  }
 )

 reset(){
  this.formulario().reset();
 }
  
}
