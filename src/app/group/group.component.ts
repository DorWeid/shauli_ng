import { Component, OnInit } from "@angular/core";
import { FBService } from "../fb.service";
declare var window: any;
@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  constructor(private fbService: FBService) {}

  ngOnInit() {
    window.FB.XFBML.parse();
  }
}
