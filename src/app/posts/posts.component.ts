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

  addPost(content, title, authorName) {
    debugger;
    // TODO: Use the proper author name
    const data = {
      title,
      authorName,
      content,
      date: new Date()
    };

    this.postsService.createPost(data).then(post => {
      this.posts.push(post);
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
