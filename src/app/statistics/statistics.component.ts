import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked,
  ElementRef
} from "@angular/core";
import { D3Service } from "../d3.service";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"]
})
export class StatisticsComponent implements AfterViewInit {
  constructor(private d3Service: D3Service) {
    this.prepareCharts = this.prepareCharts.bind(this);
  }

  prepareCharts() {
    this.d3Service.prepareSimpleBarChart([30, 86, 168, 281, 303, 365]);
    this.d3Service.preparePieChart([
      { age: "5", population: 1000 },
      { age: "6", population: 200 },
      { age: "7", population: 3000 },
      { age: "8", population: 400 },
      { age: "9", population: 500 }
    ]);
  }

  ngAfterViewInit() {
    this.d3Service.load(this.prepareCharts);
  }
}
