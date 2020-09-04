import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  // tslint:disable-next-line: max-line-length
  private covidDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-22-2020.csv`;

  constructor(private http: HttpClient) { }

  getGlobalCovid19Data() {
    // as data is come in the form of csv or text that is why we need to mentioned response type as 'text';
    return this.http.get(this.covidDataUrl, { responseType : 'text' }).pipe(
      map(
        result => {
          let rows = result.split('\n');
          // remove 1st row of  header
          rows = rows.splice(1 , rows.length);
          const raw = {};

          rows.forEach(row => {

              const cols = row.split(/,(?=\S)/);
              // console.log(cols);

              const cs = {
                country : cols[3],
                confirmed : +cols[7],
                deaths : +cols[8],
                recovered : +cols[9],
                active : +cols[10]
              };

              const temp: GlobalDataSummary = raw[cs.country];
              if (temp) {
                temp.active += cs.active;
                temp.confirmed += cs.confirmed;
                temp.recovered += cs.recovered;
                temp.deaths += cs.deaths;
                raw[cs.country] = temp;
              } else {
                raw[cs.country] = cs;
              }

          });
          // console.log(raw)
          return Object.values(raw) as GlobalDataSummary[];
        }
      )
    );
  }

}
