import { Component, OnInit, ViewChild } from '@angular/core';
import { HerosService } from '../heros.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heros = [];
  roles = ['', 'Attack', 'Defender', 'Tank', 'Support'];
  selectedRole;
  name;
  hp;

  constructor(private herosService: HerosService) {
    this.getHeroes = this.getHeroes.bind(this);
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heros = this.herosService.getHeroes().then((heros: any) => {
      this.heros = heros || [];
    });
  }
}
