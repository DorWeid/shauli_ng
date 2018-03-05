import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { PostsComponent }    from './posts.component';
import { PostCommentsComponent }  from '../post-comments/post-comments.component';

import { PostsService } from '../posts.service';

import { PostsRoutingModule } from './posts-routing.module';

import { MatExpansionModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    PostsRoutingModule
  ],
  declarations: [
    PostsComponent,
    PostCommentsComponent
  ],
  providers: [ PostsService ]
})
export class PostsModule {}
