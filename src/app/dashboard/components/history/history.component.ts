import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  public histories: Array<{}> = new Array();
  private historyObservable$: Subscription;
  private username: string;

  constructor(private dashboardService: DashboardService, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((param) => {
      this.username = param.username;
    })
  }

  ngOnInit() {
    this.historyObservable$ = this.dashboardService.historySubject.subscribe((histories) => {
      if (histories) {
        this._sliceHistory(histories)
      }
      else {
        if (JSON.parse(localStorage.getItem("history"))[this.username]) {
          this._sliceHistory(JSON.parse(localStorage.getItem("history"))[this.username]);
        }
      }
    });
  }

  protected _sliceHistory(histories) {
    this.histories = histories;
    this.histories.reverse();
    this.histories = this.histories.slice(0, 5);
  }

  ngOnDestroy() {
    if (this.historyObservable$)
      this.historyObservable$.unsubscribe();
  }

}
