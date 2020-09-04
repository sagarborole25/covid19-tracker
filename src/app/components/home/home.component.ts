import { GlobalDataSummary } from './../../models/global-data';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  globalData: GlobalDataSummary [];

  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  };
  constructor(private dataService: DataServiceService) { }


  initChart() {
    const datatable = [];
    datatable.push(['Country', 'Cases']);

    this.globalData.forEach(result => {
      if (result.confirmed > 500000) {
        datatable.push([result.country, result.confirmed]);
      }
    });

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      // firstRowIsData: true,
      options: { height : 500 },
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      options: { height : 500 }
    };
  }

  ngOnInit() {

      this.dataService.getGlobalCovid19Data()
          .subscribe(
            {
              next : (result) => {
                // console.log(result);
                this.globalData = result;
                result.forEach(cs => {
                  if (!Number.isNaN(cs.active)) {
                  this.totalActive += cs.active,
                  this.totalConfirmed += cs.confirmed,
                  this.totalDeaths += cs.deaths,
                  this.totalRecovered += cs.recovered;
                  }
                });
                this.initChart();
              }
            }
          );
    }

      updateChart(casetype: HTMLInputElement) {
        console.log(casetype.value);
      }

}
