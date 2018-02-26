import { Injectable, AfterViewInit, OnInit } from "@angular/core";
declare var google: any;

@Injectable()
export class MapService {
  map;
  constructor() {
    this.addMarker = this.addMarker.bind(this);
  }

  onMapsReady() {
    const brussels = new google.maps.LatLng(50.82, 4.35);
    const mapOptions = {
      zoom: 9,
      center: brussels
    };

    // Set the map class member
    this.map = new google.maps.Map(document.getElementById("gmap"), mapOptions);

    this.loadMarkers();
  }

  loadMarkers() {
    // NOTE: Mock markers for now ...

    const markers = [
      new google.maps.Marker({
        position: new google.maps.LatLng(50.82, 4.35)
      })
    ];

    markers.forEach(this.addMarker);
  }

  addMarker(marker) {
    marker.setMap(this.map);
  }

  // Load Google's script
  load() {
    // CB for map
    (<any>window).googleMapsReady = this.onMapsReady.bind(this);

    // Script definition
    const script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAiZcfFX7cnndPlETmxWHHd6A7t2Mc_LO4&callback=googleMapsReady";
  }
}
