import { Injectable, AfterViewInit, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
declare var google: any;

@Injectable()
export class MapService {
  map;
  geocoder;
  private url = "/api/map";

  constructor(private http: HttpClient) {
    this.addMarker = this.addMarker.bind(this);
    this.onMapsReady = this.onMapsReady.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
    this.geocodeAddress = this.geocodeAddress.bind(this);
  }

  onMapsReady(adresses) {
    const brussels = new google.maps.LatLng(50.82, 4.35);
    const mapOptions = {
      zoom: 2,
      center: brussels
    };

    // Set the map class member
    this.map = new google.maps.Map(document.getElementById("gmap"), mapOptions);
    this.geocoder = new google.maps.Geocoder();

    adresses.forEach(a => this.geocodeAddress(a, this.geocoder, this.map, this.infowindow));
  }

  loadMarkers() {
    return this.http
      .get(this.url)
      .pipe(
        map((res: any) => {
          return res.maps;
        })
      )
      .toPromise();
  }

  geocodeAddress(address, geocoder, resultsMap, infowindow) {
    geocoder.geocode({'address': address.address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        let infowindow = new google.maps.InfoWindow({
          content: address.name
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        marker.setMap(resultsMap);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  addMarker(marker) {
    marker.setMap(this.map);
  }

  // Load Google's script
  load(onReadyCB) {
    // CB for map
    (<any>window).googleMapsReady = onReadyCB;

    // Script definition
    const script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAiZcfFX7cnndPlETmxWHHd6A7t2Mc_LO4&callback=googleMapsReady";
  }
}
