import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPad',
  standalone: true,
})
export class ZeroPadPipe implements PipeTransform {
  transform(value: number | string, totalLength: number = 3): string {
    const numStr = value.toString();
    return numStr.padStart(totalLength, '0');
  }
}
