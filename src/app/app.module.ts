import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { NgIf } from "@angular/common";

import { AppComponent } from "./app.component";
import { WeatherComponent } from "./weather/weather.component";
import { PostsComponent } from "./posts/posts.component";
import { HomeComponent } from "./home/home.component";

import { WeatherService } from "./weather.service";
import { FBService } from "./fb.service";
import { MapService } from "./map.service";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { GroupComponent } from "./group/group.component";
import { StatisticsComponent } from "./statistics/statistics.component";
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    PostsComponent,
    HomeComponent,
    GroupComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [WeatherService, FBService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule {}
