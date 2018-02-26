import { Component, AfterViewInit } from "@angular/core";
import { MapService } from "../map.service";

declare var google: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements AfterViewInit {
  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    this.mapService.load();
  }
}
