import { Component, OnInit } from "@angular/core";
import { FBService } from "../fb.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  constructor(private fbService: FBService) {}

  ngOnInit() {
    this.fbService.getFeed();
  }
}
