import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class PostsService {
  private url = "/api/post"; // URL to web api

  constructor(private http: HttpClient) {
    this.getPosts = this.getPosts.bind(this);
    this.updatePost = this.updatePost.bind(this);
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

  removePost(id) {
    return this.http.delete(`${this.url}/${id}`).toPromise();
  }

  updatePost(post) {
    return this.http
      .put(`${this.url}/${post._id}`, post, httpOptions)
      .toPromise();
  }

  createPost(data) {
    return this.http
      .post(this.url, data)
      .pipe(
        map((res: any) => {
          return res.post;
        })
      )
      .toPromise();
  }
}
