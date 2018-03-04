import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
// import { PostsComponent } from "../posts/posts.component"; // TODO: DELETE
import { HerosComponent } from "../heros/heros.component";
import { HomeComponent } from "../home/home.component";
import { GroupComponent } from "../group/group.component";
import { StatisticsComponent } from "../statistics/statistics.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  // { path: "posts", component: PostsComponent }, // TODO: DELETE
  { path: "heros", component: HerosComponent },
  { path: "group", component: GroupComponent },
  { path: "statistics", component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
