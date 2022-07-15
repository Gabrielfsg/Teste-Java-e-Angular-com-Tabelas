import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {
  }

  public formataValor(valor: number) {
    let valorRetorno = '';
    if (!valor.toString().includes('.')) {
      valorRetorno = valor.toString() + ',00';
    } else {
      valorRetorno = Number(valor).toFixed(2).toString().replace('.', ',');
    }
    return valorRetorno;
  }

}
