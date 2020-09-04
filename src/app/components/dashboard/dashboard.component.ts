import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()
  totalConfirmed;
  @Input()
  totalActive;
  @Input()
  totalDeaths;
  @Input()
  totalRecovered;

  constructor() { }

  ngOnInit() {
  }

}
