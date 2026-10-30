import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Dispositivo } from '../../model/dispositivo.model';
import { DispositivoService } from '../../service/dispositivo-service';
import { Detalles } from './detalles';

describe('Detalles', () => {
  let component: Detalles;
  let fixture: ComponentFixture<Detalles>;
  const dispositivo: Dispositivo = {
    id: 1,
    name: 'Dispositivo de prueba',
    category: 'cafe',
    price: 100,
    notes: 'Descripcion',
    cupProfile: 'Perfil',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detalles],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => '1'}}}},
        {provide: Router, useValue: {navigate: () => Promise.resolve(true)}},
        {provide: DispositivoService, useValue: {getById: () => of(dispositivo)}},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Detalles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
