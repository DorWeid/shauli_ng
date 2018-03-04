import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PostsService } from '../posts.service';
import { CommentsService } from '../comments.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {
    this.gotoPosts = this.gotoPosts.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.postsService.getPost(id).then(post => {
      this.post = post;
    });
  }

  gotoPosts() {
    this.router.navigate(['/posts']);
  }

  addComment(title, authorName, authorSiteURL, content) {
    const data = {
      postId: this.post._id,
      title,
      authorName,
      authorSiteURL,
      content
    };

    this.commentsService.createComment(data).then(comment => {
      this.post.comments.push(comment);
    });
  }
}
