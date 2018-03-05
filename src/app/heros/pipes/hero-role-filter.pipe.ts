import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroRoleFilter'
})
export class HeroRoleFilterPipe implements PipeTransform {

  transform(heros: any, args?: any): any {
    if (args == undefined || args == "") {
      return heros;
    }

    return heros.filter(hero => hero.role === args);
  }

}
