import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent }    from './posts.component';
import { PostCommentsComponent }  from './post-comments/post-comments.component';
import { StatisticsComponent } from './statistics/statistics.component';

const postsRoutes: Routes = [
  { path: 'posts',  component: PostsComponent },
  { path: 'post/:id', component: PostCommentsComponent },
  { path: "statistics", component: StatisticsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(postsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostsRoutingModule {}
