import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sideNavExcess',
})
export class SideNavExcessPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value > 99 ? '99+' : value
  }
}
