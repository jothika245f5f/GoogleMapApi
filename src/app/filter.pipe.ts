import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue: any) {
    if (!searchValue) return value;
    return value.filter((v:any) => 
    v.dealsName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 )


  }

}
