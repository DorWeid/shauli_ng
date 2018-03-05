import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

import { HeroNameFilterPipe } from './pipes/hero-name-filter.pipe';
import { HeroHpFilterPipe } from './pipes/hero-hp-filter.pipe';
import { HeroRoleFilterPipe } from './pipes/hero-role-filter.pipe';

import { HerosComponent } from './heros.component';

import { HerosService } from "./heros.service";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    FormsModule,
  ],
  declarations: [
    HerosComponent,
    HeroNameFilterPipe,
    HeroHpFilterPipe,
    HeroRoleFilterPipe,
  ],
  providers: [ HerosService ]
})
export class HerosModule { }
