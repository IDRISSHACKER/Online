import { replace } from 'lodash';
import numeral from 'numeral';
import { isEmpty } from './isEmpty';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '0,0' : '0,0.00');
}

export function fFcfa(number) {
  return  `${fNumber(number)} FCFA`;
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}

export function sumData(table, key){

  if (!isEmpty(table)){
    let total = 0;

    table.forEach((tab)=>total+=tab+`.${key}`)

    return total

  }else{

    return 0
  }

}

export function toPercent(data, constant){

    return (constant*100)/data

}

export function sizeDatas(datas){

  let size = 0

  datas.forEach((data)=>size+=1)

  return size
}