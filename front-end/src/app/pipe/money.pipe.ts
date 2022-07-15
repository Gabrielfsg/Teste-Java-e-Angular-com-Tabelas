import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(valor: number): string {
    let valorRetorno = '';
    if (!valor.toString().includes('.')) {
      valorRetorno = valor.toString() + ',00';
    } else {
      valorRetorno = Number(valor).toFixed(2).toString().replace('.', ',');
    }
    return valorRetorno;
  }

}
