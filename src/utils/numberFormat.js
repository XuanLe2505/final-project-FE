import numeral from "numeral";

export default function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0.00" : "$0,0.00");
}

export function fData(number) {
  return numeral(number).format("0.0 b");
}