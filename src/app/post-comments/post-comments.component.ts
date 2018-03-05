import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PostsService } from '../posts.service';
import { CommentsService } from '../comments.service';
import 'rxjs/add/operator/switchMap';
import * as alertify from 'alertify.js';

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

  addComment(titleRef, authorNameRef, authorSiteURLRef, contentRef) {
    const title = titleRef.value
    const authorName = authorNameRef.value
    const authorSiteURL = authorSiteURLRef.value
    const content = contentRef.value

    const data = {
      postId: this.post._id,
      title,
      authorName,
      authorSiteURL,
      content
    };

    if (!authorName) {
      alertify.error("Please enter author name");
      return;
    }
    if (!title) {
      alertify.error("Please enter title!");
      return;
    }
    if (!content) {
      alertify.error("Please enter content");
      return;
    }

    this.commentsService.createComment(data).then(comment => {
      alertify.success('Comment was added successfully')
      this.post.comments.push(comment);
      titleRef.value = ''
      authorNameRef.value = ''
      authorSiteURLRef.value = ''
      contentRef.value = ''
    })
    .catch(e => {
      alertify.error(e.error)
    })
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
