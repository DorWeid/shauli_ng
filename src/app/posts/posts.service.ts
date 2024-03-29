import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

declare var io: any;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class PostsService {
  private url = "/api/post";
  socket;

  constructor(private http: HttpClient) {
    this.getPosts = this.getPosts.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.getFilteredPosts = this.getFilteredPosts.bind(this);
    this.getPostsStats = this.getPostsStats.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  getPosts() {
    return this.http
      .get(this.url)
      .pipe(
        map((posts: any) => {
          return posts.posts;
        })
      )
      .toPromise();
  }

  getPost(postId) {
    return this.http
      .get(`${this.url}/id/${postId}`)
      .pipe(
        map((response: any) => {
          return response.post;
        })
      )
      .toPromise();
  }

  getPostsStats() {
    return this.http
      .get(`${this.url}/stats`)
      .pipe(
        map((data: any) => {
          return data.stats;
        })
      )
      .toPromise();
  }

  getFilteredPosts(role, authorName, heroId) {
    return this.http
      .get(`${this.url}?role=${role}&authorName=${authorName}&hero=${heroId}`)
      .pipe(
        map((posts: any) => {
          return posts.posts;
        })
      )
      .toPromise();
  }

  removePost(id) {
    return this.http.delete(`${this.url}/${id}`).toPromise();
  }

  updatePost(post) {
    return this.http
      .put(`${this.url}/${post._id}`, post, httpOptions)
      .toPromise();
  }

  createPost(data) {
    // const socket = io();
    return this.http
      .post(this.url, data)
      .pipe(
        map((res: any) => {
          return res.post;
        })
      )
      .toPromise()
      .then(post => {
        this.socket.emit("postCreated", post);
        return post;
      });
  }

  loadIOLib() {
    // Script definition
    const script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "http://localhost:3000/socket.io/socket.io.js";
    script.onload = this.registerToPostSocket.bind(this);
  }

  registerToPostSocket() {
    this.socket = io.connect("http://localhost:3000");

    this.socket.on("postCreated", (newPost: any) => {
      window.alert(
        `A new Post has been added, refresh page! \n Post Title: ${
          newPost.title
        }`
      );
    });
  }
}
