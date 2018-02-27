import { Component, OnInit, ElementRef } from "@angular/core";

declare var d3: any;

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"]
})
export class StatisticsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const data = [1, 2, 3];
    debugger;
    d3
      .select(".chart")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function(d) {
        return d + "px";
      })
      .text(function(d) {
        return d;
      });
  }
}
