export const categories = [ 'cafe','moka','late']

export interface Dispositivo {
    id : string | number;
    name : string;
    price: number;
    notes: string;
    cupProfile : string;
    category : string}

export type DispositivoForm = Omit<Dispositivo,'id'>