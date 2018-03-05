import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked,
  ElementRef
} from "@angular/core";
import { D3Service } from "../../d3.service";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"]
})
export class StatisticsComponent implements AfterViewInit {
  postsStats;

  constructor(private d3Service: D3Service, private postsService: PostsService) {
    this.prepareCharts = this.prepareCharts.bind(this);
  }

  prepareCharts() {
    this.d3Service.prepareBarChart(this.postsStats);
  }

  ngAfterViewInit() {
    this.postsService.getPostsStats().then((stats: any) => {
      this.postsStats = stats.map(s => ({hero: s.hero.name, posts: s.count}));
      this.d3Service.load(this.prepareCharts);
    });
  }
}
