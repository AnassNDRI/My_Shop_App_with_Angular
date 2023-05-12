import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productCategoryColorePipe'
})
export class ProductCategoryColorePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
