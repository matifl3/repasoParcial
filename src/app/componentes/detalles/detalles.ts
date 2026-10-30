import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DispositivoService } from '../../service/dispositivo-service';
import { Dispositivo } from '../../model/dispositivo.model';
import { firstValueFrom } from 'rxjs';
import { Formulario } from '../formulario/formulario';

@Component({
  imports: [Formulario],
  selector: 'app-detalles',
  styleUrl: './detalles.css',
  templateUrl: './detalles.html',
})
export class Detalles implements OnInit{
  private readonly service = inject(DispositivoService)
  private readonly rutaActiva = inject(ActivatedRoute)
  protected readonly router = inject(Router)

  private readonly id = this.rutaActiva.snapshot.paramMap.get('id')

  protected readonly producto = signal<Dispositivo | null>(null)
  protected readonly editando = signal(false)
  protected readonly panel = signal<'notes' | 'cupProfile'>('notes')
  protected readonly cargando = signal(true)
  protected readonly error = signal<string | null>(null)
  
  async ngOnInit() {
    if (!this.id) {
      this.router.navigate(['/catalogo'])
      return
    }

    try {
      const dispo = await firstValueFrom(this.service.getById(this.id))
      this.producto.set(dispo)
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'No se pudo cargar el detalle.')
    } finally {
      this.cargando.set(false)
    }
  }

  async eliminar() {
    if (!confirm('¿Desea borrar este producto?') || !this.id) return
    await firstValueFrom(this.service.delete(this.id))
    this.router.navigate(['/catalogo'])
  }

  alEditar(dispo: Dispositivo) {
    this.producto.set(dispo)
    this.editando.set(false)
  }
}
