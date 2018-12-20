import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';

import { Query } from './query';

@Injectable()
export class LoginAuth implements CanActivate {

    constructor(private router: Router, private apollo: Apollo) { }

    canActivate() {
        return this.apollo.watchQuery<Query>({
            query: gql`
            query loginAuth {
                loginAuth {
                    success
                    username
              }
            }
          `
        }).valueChanges.pipe(
            map(res => {
                if (!res.data.loginAuth.success) {
                    this.router.navigate(['dashboard', `${res.data.loginAuth.username}`]);
                    return false;
                }
                else {
                    return true;
                }
            })
        )
    }
}