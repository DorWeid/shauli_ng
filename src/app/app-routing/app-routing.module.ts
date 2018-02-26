import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { PostsComponent } from "../posts/posts.component";
import { HomeComponent } from "../home/home.component";
import { GroupComponent } from "../group/group.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "posts", component: PostsComponent },
  { path: "group", component: GroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
