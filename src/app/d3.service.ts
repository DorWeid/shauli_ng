import { Injectable } from "@angular/core";
declare var d3: any;

@Injectable()
export class D3Service {
  constructor() {
    this.load = this.load.bind(this);
    this.prepareSimpleBarChart = this.prepareSimpleBarChart.bind(this);
  }

  prepareSimpleBarChart() {
    var data = [30, 86, 168, 281, 303, 365];

    d3
      .select(".chart")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function(d) {
        return d * 3 + "px";
      })
      .style("margin", d => {
        return "10px";
      })
      .style("background-color", function(d) {
        return "blue";
      })
      .style("color", function(d) {
        return "white";
      })
      .style("border-radius", function(d) {
        return "10px 10px 10px 10px";
      })
      .style("text-align", function(d) {
        return "center";
      })
      .text(function(d) {
        return `${d} posts`;
      });
  }

  // Load Google's script
  load(cb) {
    // Script definition
    const script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "https://d3js.org/d3.v5.min.js";
    script.onload = cb;
  }
}
