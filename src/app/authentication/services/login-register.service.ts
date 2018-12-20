import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';

import { Query } from './graphQl/query';
import { ResponseQ, RequestQ } from './model/query.interface';
import { RequestM } from './model/mutation.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private apollo: Apollo) {}

  userSignIn(payload: RequestQ): Observable<ResponseQ> {
    return this.apollo.watchQuery<Query>({
      query: gql`
      query signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
          success
          message
          username
        }
      }
    `,
      variables: {
        username: payload.username,
        password: payload.password
      },
      errorPolicy: 'all'
    }).valueChanges.pipe(
      map(res => res.data.signIn)
    )
  }

  userRegister(payload: RequestM): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation signUp($username: String!, $password: String!, $email: String!) {
        signUp(username: $username, password: $password, email: $email) {
          success
          message
        }
      }
    `,
      variables: {
        username: payload.username,
        password: payload.password,
        email: payload.email
      },
      errorPolicy: 'all'
    });
  }
}
