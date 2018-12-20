import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public history: {}[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.historySubject.subscribe((history) => {
      if (history)
        this.history.push(history)
      console.log(this.history);
    });
  }

}
