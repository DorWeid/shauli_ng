import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class CommentsService {
  private url = "/api/comment";

  constructor(private http: HttpClient) {
    this.createComment = this.createComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  createComment(data) {
    return this.http
      .post(this.url, data)
      .pipe(
        map((res: any) => {
          return res.comment;
        })
      )
      .toPromise()
  }

  removeComment(id) {
    return this.http.delete(`${this.url}/${id}`).toPromise();
  }

  updateComment(post) {
    return this.http
      .put(`${this.url}/${post._id}`, post, httpOptions)
      .toPromise();
  }
}
