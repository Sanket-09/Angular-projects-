import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'fullGender',
})
export class FullGenderPipe implements PipeTransform {
  transform(value: any): any {
    if (value == 'M') return 'Male'
    else if (value == 'F') return 'Female'
  }
}
