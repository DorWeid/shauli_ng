import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroHpFilter'
})
export class HeroHpFilterPipe implements PipeTransform {

  transform(heros: any, args?: any): any {
    if (args == undefined || args == "") {
      return heros;
    }

    return heros.filter(hero => hero.hp.toString().indexOf(args.toString()) !== -1);
  }

}
