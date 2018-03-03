import { Injectable } from "@angular/core";
declare var d3: any;

@Injectable()
export class D3Service {
  constructor() {
    this.load = this.load.bind(this);
    this.prepareSimpleBarChart = this.prepareSimpleBarChart.bind(this);
  }

  prepareSimpleBarChart(data) {
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

  preparePieChart(data) {
    let svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal([
      "#98abc5",
      "#8a89a6",
      "#7b6888",
      "#6b486b",
      "#a05d56",
      "#d0743c",
      "#ff8c00"
    ]);

    var pie = d3
      .pie()
      .sort(null)
      .value(function(d) {
        return d.population;
      });

    var path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    var label = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    var arc = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", function(d) {
        return color(d.data.age);
      });

    arc
      .append("text")
      .attr("transform", function(d) {
        return "translate(" + label.centroid(d) + ")";
      })
      .attr("dy", "0.35em")
      .text(function(d) {
        return d.data.age;
      });
  }

  load(cb) {
    // Script definition
    const script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "https://d3js.org/d3.v5.min.js";
    script.onload = cb;
  }
}
