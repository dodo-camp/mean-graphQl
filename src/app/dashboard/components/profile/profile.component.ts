import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public group: FormGroup;
  public result: any[];
  public totlaItems: number;
  public username: string;
  public loading: boolean = false;
  private currentTag: string;
  private formValueChange$: Subscription;
  private activeRoutes$: Subscription;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router, private dashBoardService: DashboardService) {
    this._setUsername();
    this._createFormGroup();
  }

  ngOnInit() {
    this._formValueChange();
    this._getQueryParams();
  }

  ngOnDestroy() {
    if (this.formValueChange$)
      this.formValueChange$.unsubscribe();
    if (this.activeRoutes$)
      this.activeRoutes$.unsubscribe();
  }

  protected _getQueryParams() {
    this.activeRoutes$ = this.activatedRoute.queryParams.subscribe((params) => {
      this._checkForParams(params);
      this._searchHackerNews();
    });
  }

  protected _checkForParams(params: any) {
    if (Object.keys(params).length) {
      Object.keys(params).forEach((param) => {
        this.group.controls[param].setValue(params[param]);
      });
    }
    else {
      this.group.controls["tags"].setValue("story");
      this.group.controls["page"].setValue("0");
    }
  }

  protected _formValueChange() {
    this.formValueChange$ = this.group.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((res) => {
      if (Object.keys(res).length)
        this._setQueryParams();
      return;
    });
  }

  protected _setQueryParams() {
    let queries = {};
    Object.keys(this.group.value).forEach((key) => {
      if (this.group.value[key])
        queries[key] = this.group.value[key];
      if (key == "tags")
        this._setPageToZero(queries[key]);
    });
    this.dashBoardService.setHistory(queries,this.username);
    this.route.navigate([], {
      queryParams: queries,
      relativeTo: this.activatedRoute
    });
  }

  protected _setPageToZero(tag) {
    if (this.currentTag != tag) {
      this.currentTag = tag;
      this.group.get("page").setValue("0");
    }
    else return;
  }

  protected _searchHackerNews() {
    this.loading = true;
    this.dashBoardService.getResults(this.group.value).subscribe(this._setResults.bind(this), this._handleError.bind(this));
  }

  protected _setResults(res: any) {
    this.result = res.hits;
    this.totlaItems = res.ngPages * res.hitsPerPage;
    this.loading = false;
    window.scroll(0, 0);
  }

  protected _handleError(err) {
    console.log(err);
  }

  protected _createFormGroup() {
    this.group = this.fb.group({
      query: new FormControl(''),
      tags: new FormControl(''),
      page: new FormControl('')
    });
  }

  public _setUsername() {
    this.activatedRoute.params.subscribe((params) => {
      this.username = params.username;
    });
  }

  public changePage(event) {
    let page = (parseInt(event) - 1).toString();
    this.group.get("page").setValue(page, { emitEvent: true });
  }

  public currentPage() {
    return parseInt(this.group.controls["page"].value) + 1;
  }

}
