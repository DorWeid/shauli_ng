import { Component, OnInit } from "@angular/core";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts = [];
  isEditing = false;

  constructor(private postsService: PostsService) {
    this.onEditToggle = this.onEditToggle.bind(this);
  }

  ngOnInit() {
    this.postsService.getPosts().then((posts: any) => {
      this.posts = posts;
    });
  }

  onEditToggle() {
    if (this.isEditing) {
      this.postsService.updatePost(this.posts[0]).then(() => {
        this.isEditing = false;
      });
    } else {
      this.isEditing = true;
    }
  }

  onPostRemove(id) {
    this.postsService.removePost(id).then(() => {
      this.posts = this.posts.filter(p => p._id !== id);
    });
  }

  addPost(content, title) {
    // TODO: Use the proper author name
    const data = {
      title,
      authorName: "dor",
      content,
      date: new Date()
    };

    this.postsService.createPost(data).then(post => {
      this.posts.push(post);
    });
  }
}
