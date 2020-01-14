import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {


  transform(items: any[], terms: string, aaa:any ): any[] {

    
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {

      return it.pricelist && it.pricelist.toLowerCase().includes(terms) || it.brand && it.brand.toLowerCase().includes(terms) ||
      it.type && it.type.toLowerCase().includes(terms) || it.hd_capacity && it.hd_capacity.toLowerCase().includes(terms) ||
      it.led_size  && it.led_size .toLowerCase().includes(terms) || it.keyboard_color && it.keyboard_color.toLowerCase().includes(terms) ||
      it.battery_oem_price && it.battery_oem_price.toLowerCase().includes(terms) || it.battery_original_price && it.battery_original_price.toLowerCase().includes(terms) ;

    });
    
  }
}
