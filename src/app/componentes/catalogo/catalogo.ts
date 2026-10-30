import { Component, computed, inject, signal } from '@angular/core';
import { DispositivoService } from '../../service/dispositivo-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { categories, Dispositivo } from '../../model/dispositivo.model';
import { catchError, of } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  private readonly service = inject(DispositivoService)
  protected readonly ruta = inject(Router)
  protected readonly error = signal<string | null>(null)
  private readonly allDipos = toSignal(
    this.service.getAll().pipe(
      catchError((error: unknown) => {
        this.error.set(error instanceof Error ? error.message : 'No se pudo cargar el catálogo.')
        return of([] as Dispositivo[])
      })
    ),
    {initialValue: [] as Dispositivo[]}
  )

  protected readonly orden = signal('')
  protected readonly filtroCategoria = signal('')
  protected readonly categoria = categories

  protected readonly filter = computed(()=>{
    const orden = this.orden()
    const categoriaFiltre = this.filtroCategoria()

    const filtrado = this.allDipos().filter((p)=> categoriaFiltre=== '' || p.category === categoriaFiltre)

    switch(orden){
      case 'asc': return [...filtrado].sort((a,c)=> a.price - c.price)
      case 'desc': return [...filtrado].sort((a,c)=> c.price - a.price)
      default : return [...filtrado]
    }
  })

  limpiarForm(){
    this.orden.set('')
    this.filtroCategoria.set('')
  }
  }


















/*
  private readonly service = inject(DispositivoService) // define servicio
  protected readonly alldipso = toSignal(this.service.getAll(), {initialValue:[]}) //define varivle con todos los dispositivos
  protected readonly ruta = signal(Router) // define la ruta

  protected readonly categoria = categories // define la categorias
  protected readonly filtroCategoria = signal('') // define en nulo filtor por categoria
  protected readonly orden = signal('') // define el orden

  limpiarFiltros (){//resetea a 0 los filtro
    this.filtroCategoria.set('')
    this.orden.set('')
  }

  protected readonly productosFiltrar = computed(()=>{  // computed igual categoria y orden a los ya definidos arriva 
    const categoria = this.filtroCategoria()
    const orden = this.orden()

    const filtrados = this.alldipso().filter((p)=> categoria === '' || categoria === p.category)  //guarda como se filtran los dipsositivos y contempla los vacio o cualquier otro

    switch(orden){
      case 'asc': // como ordena las listas
        return [...filtrados].sort((a,c)=>a.price - c.price)
      case 'desc' : return [...filtrados].sort((a,c)=> c.price - a.price)
      default: return [...filtrados]
    }
  })*/