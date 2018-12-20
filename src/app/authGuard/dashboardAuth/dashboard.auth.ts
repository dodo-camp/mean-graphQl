import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';

import { Query } from './query';

@Injectable()
export class DashBoardAuth implements CanActivate {
    private username: string;
    constructor(private router: Router, private apollo: Apollo) { }

    canActivate() {
        return this.apollo.watchQuery<Query>({
            query: gql`
            query dashboardAuth {
                dashboardAuth {
                    success
                    username
              }
            }
          `
        }).valueChanges.pipe(
            map(res => {
                if (res.data.dashboardAuth.success)
                    return true;
                else {
                    this.router.navigateByUrl('/signIn');
                    return false;
                }
            })
        )
    }
}