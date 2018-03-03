import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

declare var io: any;

@Injectable()
export class HerosService {
  private url = "/api/hero";

  constructor(private http: HttpClient) {
    this.getHeroes = this.getHeroes.bind(this);
  }

  getHeroes() {
    return this.http
      .get(this.url)
      .pipe(
        map((heros: any) => {
          return heros.Heros;
        })
      )
      .toPromise();
  }
}
