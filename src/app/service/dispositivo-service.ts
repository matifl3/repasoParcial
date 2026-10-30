import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dispositivo, DispositivoForm } from '../model/dispositivo.model';

@Injectable({providedIn: 'root'})
export class DispositivoService {
    private readonly http = inject(HttpClient)
    private readonly url = 'http://localhost:3000/dispositivo'

    getAll(){
        return this.http.get<Dispositivo[]>(this.url)
    }
    getById(id : string|number){
        return this.http.get<Dispositivo>(`${this.url}/${id}`)
    }
    add(dispo : DispositivoForm){
        return this.http.post<Dispositivo>(this.url,dispo)
    }
    delete(id : string|number){
        return this.http.delete<void>(`${this.url}/${id}`)
    }
    update(id:string|number , dispo : DispositivoForm){
        return this.http.put<Dispositivo>(`${this.url}/${id}`,dispo)
    }

}
