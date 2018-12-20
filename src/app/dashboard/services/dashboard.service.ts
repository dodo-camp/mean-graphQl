import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';

import { Query } from './query';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getResults({ query, tags, page }): Observable<any> {
    return this.http.get(`http://hn.algolia.com/api/v1/search?query=${query}&tags=${tags}&page=${page}`);
  }

  public logOut() {
    return this.apollo.watchQuery<Query>({
      query: gql`
      query logOut {
        logOut {
          success
        }
      }
    `
    }).valueChanges.pipe(
      map(res => res.data.logOut.success)
    )
  }

}
