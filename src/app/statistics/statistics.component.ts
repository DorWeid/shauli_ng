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
    this.d3Service.prepareSimpleBarChart();
  }

  ngAfterViewInit() {
    this.d3Service.load(this.prepareCharts);
  }
}
