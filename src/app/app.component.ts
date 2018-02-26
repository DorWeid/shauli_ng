import { Component } from "@angular/core";
require("dotenv").config();

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Shauli's Overwatch Blog!";
  constructor() {}
}
