import { Component, AfterViewInit } from "@angular/core";
import { MapService } from "../map.service";
import { CommonModule } from "@angular/common";
import { NgIf } from "@angular/common";

declare var google: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements AfterViewInit {
  mapLoaded = false;

  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    this.mapService.load(() => {
      this.mapLoaded = true;
      this.mapService.onMapsReady();
    });
  }
}
