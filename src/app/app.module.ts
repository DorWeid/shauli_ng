import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
// import { NgIf } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatCardModule } from '@angular/material';
// import { MatButtonModule } from '@angular/material';
// import { MatFormFieldModule } from '@angular/material';
// import { MatInputModule } from '@angular/material';
// import { MatSelectModule } from '@angular/material';
// import { MatExpansionModule } from '@angular/material';
// import { MatSortModule } from '@angular/material/sort';

import { FacebookModule } from "ngx-facebook";

import { AppComponent } from "./app.component";
import { WeatherComponent } from "./weather/weather.component";
// import { PostsComponent } from "./posts/posts.component";
import { HomeComponent } from "./home/home.component";

import { WeatherService } from "./weather.service";
import { FBService } from "./fb.service";
import { MapService } from "./map.service";
import { D3Service } from "./d3.service";
// import { PostsService } from "./posts.service";
// import { HerosService } from "./heros.service";
import { CommentsService } from "./comments.service";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { GroupComponent } from "./group/group.component";
import { StatisticsComponent } from "./statistics/statistics.component";
// import { HerosComponent } from './heros/heros.component';

// import { HeroNameFilterPipe } from './pipes/hero-name-filter.pipe';
// import { HeroHpFilterPipe } from './pipes/hero-hp-filter.pipe';
// import { HeroRoleFilterPipe } from './pipes/hero-role-filter.pipe';
// import { PostCommentsComponent } from './post-comments/post-comments.component';

import { PostsModule } from './posts/posts.module';
import { HerosModule } from './heros/heros.module';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    HomeComponent,
    // PostsComponent,
    GroupComponent,
    StatisticsComponent,
    // HerosComponent,
    // HeroNameFilterPipe,
    // HeroHpFilterPipe,
    // HeroRoleFilterPipe,
    // PostCommentsComponent,
  ],
  imports: [
    // MatCardModule,
    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSelectModule,
    // MatExpansionModule,
    // MatSortModule,
    BrowserModule,
    FacebookModule.forRoot(),
    // FormsModule,
    HttpClientModule,
    CommonModule,
    PostsModule,
    HerosModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [WeatherService, FBService, MapService, D3Service, //PostsService, HerosService
              CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
