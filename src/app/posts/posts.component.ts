import { Component, OnInit } from "@angular/core";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts = [];
  heroes = [
    {
      id: 1,
      name: "avner"
    },
    {
      id: 2,
      name: "dor"
    },
    {
      id: 3,
      name: "princess liza"
    }
  ];
  isEditing = false;
  currentEditIndex = -1;
  selectedHero;

  constructor(private postsService: PostsService) {
    this.onEditToggle = this.onEditToggle.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  ngOnInit() {
    this.postsService.getPosts().then((posts: any) => {
      this.posts = posts;
    });

    this.postsService.loadIOLib();
  }

  onEditToggle(idx) {
    if (this.isEditing) {
      this.postsService.updatePost(this.posts[idx]).then(() => {
        this.isEditing = false;
        this.currentEditIndex = -1;
      });
    } else {
      this.isEditing = true;
      this.currentEditIndex = idx;
    }
  }

  onPostRemove(id) {
    this.postsService.removePost(id).then(() => {
      this.posts = this.posts.filter(p => p._id !== id);
    });
  }

  addPost(content, title, authorName) {
    // TODO: Use the proper author name
    const data = {
      title,
      authorName,
      content,
      heroId: this.selectedHero,
      date: new Date()
    };

    this.postsService.createPost(data).then(post => {
      this.posts.push(post);
    });
  }
}
