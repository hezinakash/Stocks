import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Interval': string;
  '5. Output Size': string;
  '6. Time Zone': string;
}

export interface StockDetails {
  '1. open': number;
  '2. high': number;
  '3. low': number;
  '4. close': number;
  '5. volume': number;
}

export interface Intraday {
  'Meta Data': MetaData;
  'Time Series (60min)': any;
}

const LAST_HOURS = 6;
const ONE_HOUR = 60 * 60 * 1000;
const TIME_SERIES = 'Time Series (60min)';
const META_DATA = 'Meta Data';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StockHistoryModule {

  timeSeriesMap: Map<string, StockDetails>;

  constructor(intraday: Intraday) {

    this.timeSeriesMap = new Map<string, StockDetails>();
    this.fillMap(intraday);
    console.log(this.timeSeriesMap);

  }

  fillMap(intraday: Intraday) {
    const lastDateStr = intraday[META_DATA]['3. Last Refreshed'];
    const lastDate = new Date(lastDateStr);

    for (let hour = LAST_HOURS; hour > 0; hour--) {
        const timeStemp = new Date(lastDate.getTime() - hour * ONE_HOUR);
        const timeByFormat = this.getTimeByFormat(timeStemp);
        this.timeSeriesMap.set(timeByFormat, intraday[TIME_SERIES][timeByFormat]);
    }
  }

  getTimeByFormat(date: Date) {
    // tslint:disable-next-line:max-line-length
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  }
}