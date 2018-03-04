import { Component, OnInit, ViewChild } from '@angular/core';
import { HerosService } from '../heros.service';
import { D3Service } from "../d3.service";
import { Sort } from '@angular/material';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heros = [];
  sortedHeros = [];
  roles = ['', 'Attack', 'Defender', 'Tank', 'Support'];
  rolesChart = [
    { role: "Support", heros: 0 },
    { role: "Tank", heros: 0 },
    { role: "Attack", heros: 0 },
    { role: "Defender", heros: 0 },
  ];
  selectedRole;
  name;
  hp;

  constructor(private herosService: HerosService, private d3Service: D3Service) {
    this.getHeroes = this.getHeroes.bind(this);
    this.prepareRolesChart = this.prepareRolesChart.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.herosService.getHeroes().then((heros: any) => {
      this.heros = heros;
      this.sortedHeros = this.heros.slice();
      this.d3Service.load(this.prepareRolesChart);
    });
  }

  prepareRolesChart() {
    // Count roles of heros
    this.heros.forEach(hero => {
      let role = this.rolesChart.find(r => r.role === hero.role);
      if (role) {
        role.heros++;
      }
    });

    // Not include roles with no heros
    this.rolesChart = this.rolesChart.filter(r => r.heros != 0);

    this.d3Service.preparePieChart(this.rolesChart);
  }

  sortData(sort: Sort) {
    const data = this.heros.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedHeros = data;
      return;
    }

    this.sortedHeros = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'role': return compare(a.role, b.role, isAsc);
        case 'attackStyle': return compare(a.attackStyle, b.attackStyle, isAsc);
        case 'hp': return compare(+a.hp, +b.hp, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
