import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent }    from './posts.component';
import { PostCommentsComponent }  from '../post-comments/post-comments.component';

const postsRoutes: Routes = [
  { path: 'posts',  component: PostsComponent },
  { path: 'post/:id', component: PostCommentsComponent }
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
