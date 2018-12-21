import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';

import { Query } from './query';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private history: any[] = [];
  public historySubject: BehaviorSubject<any[]> = new BehaviorSubject(null);
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

  public setHistory(history: any, username: string) {
    let date = { date: new Date() };
    let historyWithDate = { ...history, ...date };
    this.history.push(historyWithDate);
    this._removeDuplicate();
    this.historySubject.next(this.history);
    localStorage.setItem('history', JSON.stringify({ [username]: this.history }));
  }

  protected _removeDuplicate() {
    const unique = this.history
      .map(e => e["date"])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => this.history[e]).map(e => this.history[e]);
    this.history = unique;
  }

}
