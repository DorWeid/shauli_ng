import { Injectable } from "@angular/core";
declare var d3: any;

@Injectable()
export class D3Service {
  constructor() {
    this.load = this.load.bind(this);
    this.prepareSimpleBarChart = this.prepareSimpleBarChart.bind(this);
    this.prepareBarChart = this.prepareBarChart.bind(this);
  }

  prepareSimpleBarChart(data) {

    d3
      .select(".chart")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function(d) {
        return d.posts * 50 + "px";
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
      .style("class", function(d) {
        return "bar";
      })
      .style("border-radius", function(d) {
        return "10px 10px 10px 10px";
      })
      .style("text-align", function(d) {
        return "center";
      })
      .text(function(d) {
        return ` ${d.hero} - ${d.posts} posts`;
      });
  }

  prepareBarChart(data) {
    var svg = d3.select("svg");
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d.hero; }));
    y.domain([0, d3.max(data, function (d) { return d.posts; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(d3.max(data, function (d) { return d.posts; })))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .style("fill", d => {
          return "steelblue";
        })
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.hero); })
        .attr("y", function (d) { return y(d.posts); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.posts); });;
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
        return d.heros;
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
        return color(d.data.role);
      });

    arc
      .append("text")
      .attr("transform", function(d) {
        return "translate(" + label.centroid(d) + ")";
      })
      .attr("dy", "0.35em")
      .text(function(d) {
        return d.data.role;
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
