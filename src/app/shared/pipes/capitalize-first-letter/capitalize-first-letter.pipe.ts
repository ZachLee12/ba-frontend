import { Pipe, PipeTransform } from '@angular/core';


// A general pipe that capitalizes the first letter of a string in view templates.
@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value[0].toUpperCase() + value.substring(1);
  }

}
