import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  weather = { temp: "Loading..." };

  constructor(private weatherService: WeatherService) {
    this.setWeather = this.setWeather.bind(this);
  }

  ngOnInit() {
    this.weatherService.getWeather().then(this.setWeather);
  }

  setWeather(response) {
    this.weather.temp = response.main.temp;
  }
}
