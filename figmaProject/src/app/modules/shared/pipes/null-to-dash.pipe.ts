import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'nullToDash',
})
export class NullToDashPipe implements PipeTransform {
  transform(value: any): any {
    return value !== '' ? value : '-'
  }
}
