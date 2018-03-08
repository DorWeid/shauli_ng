import { Component, OnInit } from "@angular/core";
import { FBService } from "../fb.service";
import { TwitterService } from "../twitter.service";
declare var window: any;
@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  constructor(
    private fbService: FBService,
    private twitterService: TwitterService
  ) {}

  ngOnInit() {
    window.FB.XFBML.parse();
  }
}
