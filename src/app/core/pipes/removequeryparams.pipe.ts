import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeQueryParams'
})
export class RemoveQueryParamsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.split('?')[0];
  }
}
