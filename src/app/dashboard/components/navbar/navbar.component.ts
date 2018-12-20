import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  @Input() group?: FormGroup;
  @Input() username?: string;
  public loading: boolean = false;
  constructor(private dashBoardService: DashboardService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public logOut() {
    this.loading = true;
    this.dashBoardService.logOut().subscribe((res) => {
      if (res) {
        this.loading = false;
        this.route.navigate(["signIn"])
      }
    });
  }

  public historyPage() {
    this.route.navigate(['./history'], { relativeTo: this.activeRoute })
  }

}
