import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  constructor(private dataservice: DataServiceService) { }
  // declaration of array object.
  countries: string[] = [];
  data: GlobalDataSummary[];

  ngOnInit() {
    this.dataservice.getGlobalCovid19Data()
    .subscribe({
      next : (result) => {
        // console.log(result);
        this.data = result;
        result.forEach(element => {
          this.countries.push(element.country);
        });

      }
    });
  }
  updateValues(country: string){
    console.log(country);
    this.data.forEach((result) => {
      if (country === result.country) {
        this.totalRecovered = result.recovered;
        this.totalConfirmed = result.confirmed;
        this.totalActive = result.active;
        this.totalDeaths = result.deaths;
      }
    });
  }

}
