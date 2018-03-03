import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroNameFilter'
})
export class HeroNameFilterPipe implements PipeTransform {

  transform(heros: any, args?: any): any {
    if (args == undefined || args == "") {
      return heros;
    }

    return heros.filter(hero => hero.name.toLowerCase().indexOf(args.toLowerCase()) !== -1);
  }
}
