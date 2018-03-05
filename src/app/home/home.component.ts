import { Component, AfterViewInit, OnInit } from "@angular/core";
import { MapService } from "../map.service";

declare var google: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mapLoaded = false;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.loadMarkers().then(adresses => {
      this.mapService.load(() => {
        this.mapLoaded = true;
        this.mapService.onMapsReady(adresses);
      });
    });

    // Canvas
    const size = 500;
    var c: any = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.strokeText("Latest News", 20, 40);
  }
}
