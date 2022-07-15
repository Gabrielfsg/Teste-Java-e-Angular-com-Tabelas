import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  public currencyMask(rawNum: string): string {
    rawNum = rawNum.replace(/[^\d,]/g, '');
    if (!rawNum) return rawNum;
    if (rawNum === '') return rawNum;
    if (rawNum.length === 1) return `0,0${rawNum}`;
    rawNum = rawNum.replace(/[,,]/g, ',');

    if (isNaN(Number(rawNum[rawNum.length - 1])))
      return rawNum.substr(0, rawNum.length - 1);

    if (rawNum.split(',')[1]?.length > 2) {
      return `${
        Number(rawNum.split(',')[0]) !== 0 ? Number(rawNum.split(',')[0]) : ''
      }${Number(rawNum.split(',')[1][0])},${rawNum.split(',')[1][1]}${
        rawNum.split(',')[1][2]
      }`;
    }
    if (!rawNum.split(',')[1]) return '0,00';
    if (rawNum.split(',')[1].length < 2) {
      return `${Number(
        rawNum.split(',')[0].substr(0, rawNum.split(',')[0].length - 1)
      )},${Number(rawNum.split(',')[0][rawNum.split(',')[0].length - 1])}${
        rawNum.split(',')[1][0]
      }`;
    }
    return Number(rawNum.replace(',', '.'))
      .toFixed(2)
      .replace('.', ',')
      .replace('NaN', '');
  }
}
