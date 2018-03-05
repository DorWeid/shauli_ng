import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from "./app.component";
import { WeatherComponent } from "./weather/weather.component";
import { HomeComponent } from "./home/home.component";
import { GroupComponent } from "./group/group.component";

import { WeatherService } from "./weather.service";
import { FBService } from "./fb.service";
import { MapService } from "./map.service";
import { D3Service } from "./d3.service";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { PostsModule } from './posts/posts.module';
import { HerosModule } from './heros/heros.module';
import { FacebookModule } from "ngx-facebook";

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    HomeComponent,
    GroupComponent,
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    HttpClientModule,
    CommonModule,
    PostsModule,
    HerosModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    WeatherService,
    FBService,
    MapService,
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
