import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private dashBoardService: DashboardService, private route: Router) { }

  ngOnInit() {
  }

  public logOut() {
    this.dashBoardService.logOut().subscribe((res) => {
      if (res)
        this.route.navigateByUrl('/signIn');
    });
  }

}
