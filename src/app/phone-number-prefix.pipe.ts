import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberPrefix'
})
export class PhoneNumberPrefixPipe implements PipeTransform {

  transform(value: string, countryCode: string = '+91 '): string {
    // if (typeof value !== 'string') {
    //   return '';
    // }
    // if (value.startsWith(countryCode)) {
    //   return value;
    // }

    return countryCode + value;
  }


}
