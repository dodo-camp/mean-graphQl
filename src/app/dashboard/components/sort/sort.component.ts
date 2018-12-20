import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortComponent implements OnInit {
  @Input() group?: FormGroup;
  public search: {}[] = [
    {
      value: "story",
      name: "Stories"
    },
    {
      value: "comment",
      name: "Comments"
    }
  ];

  constructor () {}

  ngOnInit() {
  }

}
