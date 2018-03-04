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
  isEditing;
  currentEditIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {
    this.gotoPosts = this.gotoPosts.bind(this);
    this.addComment = this.addComment.bind(this);
    this.onEditToggle = this.onEditToggle.bind(this);
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

  onEditToggle(idx) {
    if (this.isEditing) {
      this.commentsService.updateComment(this.post.comments[idx]).then(() => {
        this.isEditing = false;
        this.currentEditIndex = -1;
      });
    } else {
      this.isEditing = true;
      this.currentEditIndex = idx;
    }
  }

  onCommentRemove(id) {
    this.commentsService.removeComment(id).then(() => {
      this.post.comments = this.post.comments.filter(p => p._id !== id);
    });
  }
}
