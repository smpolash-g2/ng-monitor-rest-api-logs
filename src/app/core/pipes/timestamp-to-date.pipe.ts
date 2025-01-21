import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate',
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value) {
      return '';
    }
    const date = new Date(value * 1000); // Convert timestamp to milliseconds
    return (
      this.leftPad(date.getDate(), 2) +
      '/' +
      this.leftPad(date.getMonth() + 1, 2) +
      '/' +
      date.getFullYear() +
      ' ' +
      this.leftPad(date.getHours(), 2) +
      ':' +
      this.leftPad(date.getMinutes(), 2)
    );
  }

  leftPad(number: number, targetLength: number): string {
    let output = number + '';
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output;
  }
}
